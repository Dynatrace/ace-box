resource "azurerm_dns_a_record" "ace_box" {
  count = var.custom_domain == "" ? 0 : 1

  name                = "*.${var.custom_domain}"
  zone_name           = var.dns_zone_name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = [azurerm_public_ip.acebox_publicip.ip_address]
}