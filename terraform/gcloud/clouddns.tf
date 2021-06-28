resource "google_dns_record_set" "ace_box" {
  count = var.custom_domain == "" ? 0 : 1

  managed_zone = var.managed_zone_name
  name         = "*.${var.custom_domain}"
  type         = "A"
  rrdatas      = [google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip]
  ttl          = 600
}