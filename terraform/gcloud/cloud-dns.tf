locals {
  is_custom_domain  = var.custom_domain != "" && var.managed_zone_name != ""
  custom_domain_ext = terraform.workspace == "default" ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
}

resource "google_dns_record_set" "ace_box" {
  count = local.is_custom_domain ? 1 : 0

  managed_zone = var.managed_zone_name
  name         = "*.${local.custom_domain}."
  type         = "A"
  rrdatas      = [google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip]
  ttl          = 300
}
