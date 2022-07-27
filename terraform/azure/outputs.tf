output "acebox_dashboard" {
  value = "http://dashboard.${local.ingress_domain}"
}

output "acebox_ip" {
  value = "connect using: ssh -i ${module.ssh_key.private_key_filename}} ${var.acebox_user}@${azurerm_public_ip.acebox_publicip.ip_address}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}