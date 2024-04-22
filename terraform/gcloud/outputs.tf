output "acebox_dashboard" {
  value = "${local.ingress_protocol}://dashboard.${local.ingress_domain}"
}

output "dashboard_password" {
  value     = local.dashboard_password
  sensitive = true
}

output "acebox_ip" {
  value = "connect using: ssh -i ${module.ssh_key.private_key_filename} ${var.acebox_user}@${local.public_vm_ip}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}
