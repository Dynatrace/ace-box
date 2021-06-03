output "acebox_dashboard" {
  value = "http://dashboard.${google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip}.nip.io using dynatrace:dynatrace to log in"
}

output "acebox_ip" {
  value = "connect using ssh -i [location of key file] ${var.acebox_user}@${google_compute_instance.acebox.network_interface[0].access_config[0].nat_ip}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}