# Copyright 2024 Dynatrace LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

locals {
  is_custom_domain  = var.custom_domain != "" && var.managed_zone_name != ""
  custom_domain_ext = (var.skip_domain_workspace_alignment || terraform.workspace == "default") ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
}

module "ssh_key" {
  source = "../modules/ssh"
}

resource "random_id" "uuid" {
  byte_length = 4
}

resource "google_compute_address" "ace_box" {
  name = "${var.name_prefix}-ipv4-addr-${random_id.uuid.hex}"
  labels = {
    "dt_owner_team" = "${var.dt_owner_team}"
    "dt_owner_email" = "${var.dt_owner_email}" 
  }
}

locals {
  public_vm_ip     = google_compute_address.ace_box.address
  ingress_domain   = local.is_custom_domain ? local.custom_domain : "${local.public_vm_ip}.nip.io"
  ingress_protocol = local.is_custom_domain ? "https" : "http"
}

resource "google_dns_record_set" "ace_box_ssh" {
  count        = local.is_custom_domain ? 1 : 0
  managed_zone = var.managed_zone_name
  name         = "ssh.${local.custom_domain}."
  type         = "A"
  rrdatas      = [local.public_vm_ip]
  ttl          = 300
  
}

resource "google_dns_record_set" "ace_box" {
  count        = local.is_custom_domain ? 1 : 0
  managed_zone = var.managed_zone_name
  name         = "${local.custom_domain}."
  type         = "A"
  rrdatas      = [module.https_lb[0].public_lb_ip]
  ttl          = 300
  
}

resource "google_dns_record_set" "ace_box_wildcard" {
  
  count        = local.is_custom_domain ? 1 : 0
  managed_zone = var.managed_zone_name
  name         = "*.${local.custom_domain}."
  type         = "A"
  rrdatas      = [module.https_lb[0].public_lb_ip]
  ttl          = 300
  
}

resource "google_compute_firewall" "ace_box" {
  name    = "${var.name_prefix}-allow-${random_id.uuid.hex}"
  network = "default"

  allow {
    protocol = "tcp"
    ports = [
      "80",
      "443"
    ]
  }

  target_tags   = ["${var.name_prefix}-${random_id.uuid.hex}"]
  source_ranges = ["0.0.0.0/0"]
}
resource "google_compute_disk" "ace_box_disk" {
  name  = "${var.name_prefix}-${random_id.uuid.hex}-disk"
  image =  var.acebox_os
  size  = var.disk_size
  type  = "pd-ssd"
  zone  = "${var.gcloud_zone}"
    labels = {
    "dt_owner_team" = "${var.dt_owner_team}"
    "dt_owner_email" = "${var.dt_owner_email}" 
  }
}
resource "google_compute_instance_template" "ace_box" {
  name         = "${var.name_prefix}-${random_id.uuid.hex}"
  machine_type = var.acebox_size
  labels = {
    "dt_owner_team" = "${var.dt_owner_team}"
    "dt_owner_email" = "${var.dt_owner_email}" 
  }
  disk {
    source = google_compute_disk.ace_box_disk.name
    auto_delete  = true
    boot         = true
   
    
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip = local.public_vm_ip
    }
  }

  tags = ["${var.name_prefix}-${random_id.uuid.hex}"]

  metadata = {
    sshKeys = "${var.acebox_user}:${module.ssh_key.public_key_openssh}"
  }
}

resource "google_compute_instance_group_manager" "ace_box" {
  name = "${var.name_prefix}-${random_id.uuid.hex}"
  zone = var.gcloud_zone

  named_port {
    name = "http"
    port = 80
  }
  version {
    instance_template = google_compute_instance_template.ace_box.id
    name              = "primary"
  }
  base_instance_name = "ace-box"
  target_size        = 1
}

locals {
  acebox_hostname     = google_compute_instance_group_manager.ace_box.name
}

# 
# HTTPS Loadbalancer
# 
module "https_lb" {
  count  = local.is_custom_domain ? 1 : 0
  source = "./modules/https-lb"

  name_prefix       = var.name_prefix
  random_id         = random_id.uuid.hex
  gcloud_project    = var.gcloud_project
  custom_domain     = local.custom_domain
  managed_zone_name = var.managed_zone_name
  instance_group    = google_compute_instance_group_manager.ace_box.instance_group
  
}

#
# Dashboard Password
#
locals {
  generate_random_password = var.dashboard_password == ""
  dashboard_password       = coalescelist(random_password.dashboard_password[*].result, [var.dashboard_password])[0]
}

resource "random_password" "dashboard_password" {
  count  = local.generate_random_password ? 1 : 0
  length = 12
}

#
# Provisioner
#
module "provisioner" {
  source = "../modules/ace-box-provisioner"

  host               = local.public_vm_ip
  user               = var.acebox_user
  private_key        = module.ssh_key.private_key_pem
  ingress_domain     = local.ingress_domain
  ingress_protocol   = local.ingress_protocol
  dt_tenant          = var.dt_tenant
  dt_api_token       = var.dt_api_token
  use_case           = var.use_case
  extra_vars         = var.extra_vars
  dashboard_user     = var.dashboard_user
  dashboard_password = local.dashboard_password
  otel_export_enable = var.otel_export_enable
}
