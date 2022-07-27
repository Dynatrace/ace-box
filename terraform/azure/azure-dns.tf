locals {
  is_custom_domain  = var.custom_domain != "" && var.dns_zone_name != ""
  custom_domain_ext = terraform.workspace == "default" ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
}

resource "azurerm_dns_a_record" "ace_box" {
  count = local.is_custom_domain ? 1 : 0

  name                = "*.${local.custom_domain}"
  zone_name           = var.dns_zone_name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = [azurerm_public_ip.acebox_publicip.ip_address]
}
