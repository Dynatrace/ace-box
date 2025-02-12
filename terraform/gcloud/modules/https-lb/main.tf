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

resource "google_compute_global_address" "ace_box" {
  name = "${var.name_prefix}-ipv4-addr-${var.random_id}"
}

resource "google_certificate_manager_dns_authorization" "ace_box" {
  project = var.gcloud_project
  name    = "${var.name_prefix}-dns-authorization-${var.random_id}"
  domain  = var.custom_domain
}

resource "google_dns_record_set" "ace_box_authorization_record" {
  project      = var.gcloud_project
  name         = google_certificate_manager_dns_authorization.ace_box.dns_resource_record[0].name
  type         = "CNAME"
  ttl          = 30
  managed_zone = var.managed_zone_name
  rrdatas      = [google_certificate_manager_dns_authorization.ace_box.dns_resource_record[0].data]
}

resource "google_certificate_manager_certificate" "ace_box_wildcard" {
  project = var.gcloud_project
  name    = "${var.name_prefix}-wildcard-certificate-${var.random_id}"
  scope   = "DEFAULT"

  managed {
    domains = [
      google_certificate_manager_dns_authorization.ace_box.domain,
      "*.${google_certificate_manager_dns_authorization.ace_box.domain}",
    ]
    dns_authorizations = [
      google_certificate_manager_dns_authorization.ace_box.id,
    ]
  }

  depends_on = [
    google_dns_record_set.ace_box_authorization_record
  ]
}

resource "google_certificate_manager_certificate_map" "ace_box" {
  name = "${var.name_prefix}-${var.random_id}"
}

resource "google_certificate_manager_certificate_map_entry" "ace_box_wildcard" {
  name         = "${var.name_prefix}-wildcard-${var.random_id}"
  map          = google_certificate_manager_certificate_map.ace_box.name
  certificates = [google_certificate_manager_certificate.ace_box_wildcard.id]
  hostname     = "*.${var.custom_domain}"
}

resource "google_compute_health_check" "default" {
  name               = "${var.name_prefix}-${var.random_id}"
  check_interval_sec = 5
  healthy_threshold  = 2

  tcp_health_check {
    port = "80"
  }

  timeout_sec         = 5
  unhealthy_threshold = 2
}

resource "google_compute_backend_service" "ace_box" {
  name                            = "${var.name_prefix}-${var.random_id}"
  connection_draining_timeout_sec = 0
  health_checks                   = [google_compute_health_check.default.id]
  load_balancing_scheme           = "EXTERNAL_MANAGED"
  port_name                       = "http"
  protocol                        = "HTTP"
  session_affinity                = "NONE"
  timeout_sec                     = 30

  # 
  # Custom X-Forwarded-... headers are required by certain tools (e.g. GitLab)
  # if they are ran behind a TLS terminating proxy.
  # 
  custom_request_headers = [
    "X-Forwarded-Port: 443",
    "X-Forwarded-Scheme: https",
    "X-Forwarded-Proto: https",
    "X-Forwarded-Ssl: on",
  ]

  backend {
    group           = var.instance_group
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }
}

resource "google_compute_url_map" "ace_box" {
  name            = "${var.name_prefix}-${var.random_id}"
  default_service = google_compute_backend_service.ace_box.id
}

resource "google_compute_target_https_proxy" "ace_box" {
  name            = "${var.name_prefix}-https-${var.random_id}"
  url_map         = google_compute_url_map.ace_box.id
  certificate_map = "//certificatemanager.googleapis.com/${google_certificate_manager_certificate_map.ace_box.id}"
}

resource "google_compute_global_forwarding_rule" "ace_box_https" {
  name                  = "${var.name_prefix}-https-${var.random_id}"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "443-443"
  target                = google_compute_target_https_proxy.ace_box.id
  ip_address            = google_compute_global_address.ace_box.address
}

resource "google_compute_target_http_proxy" "ace_box" {
  name    = "${var.name_prefix}-http-${var.random_id}"
  url_map = google_compute_url_map.ace_box.id
}

resource "google_compute_global_forwarding_rule" "ace_box_http" {
  name                  = "${var.name_prefix}-http-${var.random_id}"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80-80"
  target                = google_compute_target_http_proxy.ace_box.id
  ip_address            = google_compute_global_address.ace_box.address
}
