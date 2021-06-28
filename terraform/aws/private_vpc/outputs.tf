output "acebox_dashboard" {
  value = (var.custom_domain != "" ? "http://dashboard.${var.custom_domain}" : "http://dashboard.${aws_instance.acebox.private_ip}.nip.io")
}

output "acebox_ip" {
  value = "connect using ssh -i ${path.module}/key ${var.acebox_user}@${aws_instance.acebox.private_ip}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}