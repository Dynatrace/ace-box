## acebox requires public IP address
resource "google_compute_address" "acebox" {
  name = "${var.name_prefix}-ipv4-addr-${random_id.uuid.hex}"
}

## Allow access to acebox via HTTPS
resource "google_compute_firewall" "acebox-https" {
  name    = "${var.name_prefix}-allow-https-${random_id.uuid.hex}"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["443", "16443"]
  }

  target_tags   = ["${var.name_prefix}-${random_id.uuid.hex}"]
  source_ranges = ["0.0.0.0/0"]
}

## Allow access to acebox via HTTPS
resource "google_compute_firewall" "acebox-http" {
  name    = "${var.name_prefix}-allow-http-${random_id.uuid.hex}"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  target_tags   = ["${var.name_prefix}-${random_id.uuid.hex}"]
  source_ranges = ["0.0.0.0/0"]
}

# SSH key
module "ssh_key" {
  source = "../modules/ssh"
}

## Create acebox host
resource "google_compute_instance" "acebox" {
  name         = "${var.name_prefix}-${random_id.uuid.hex}"
  machine_type = var.acebox_size
  zone         = var.gcloud_zone

  boot_disk {
    initialize_params {
      image = var.acebox_os
      size  = var.disk_size
    }
  }

  network_interface {
    network = "default"

    access_config {
      nat_ip = google_compute_address.acebox.address
    }
  }

  metadata = {
    sshKeys = "${var.acebox_user}:${module.ssh_key.public_key_openssh}"
  }

  tags = ["${var.name_prefix}-${random_id.uuid.hex}"]
}

locals {
  ingress_domain = local.is_custom_domain ? local.custom_domain : "${google_compute_instance.acebox.network_interface.0.access_config.0.nat_ip}.nip.io"
}

# Provision ACE-Box
module "provisioner" {
  source = "../modules/ace-box-provisioner"

  host             = google_compute_instance.acebox.network_interface.0.access_config.0.nat_ip
  user             = var.acebox_user
  private_key      = module.ssh_key.private_key_pem
  ingress_domain   = local.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  dt_paas_token    = var.dt_paas_token
  ca_tenant        = var.ca_tenant
  ca_api_token     = var.ca_api_token
  use_case         = var.use_case
}
