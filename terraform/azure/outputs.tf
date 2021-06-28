output "acebox_dashboard" {
  value = (var.custom_domain != "" ? "http://dashboard.${var.custom_domain}" : "http://dashboard.${azurerm_public_ip.acebox_publicip.ip_address}..nip.io")
}

output "acebox_ip" {
  value = "connect using: ssh -i ${var.ssh_keys.private} ${var.acebox_user}@${azurerm_public_ip.acebox_publicip.ip_address}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}