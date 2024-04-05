output "public_lb_ip" {
  value = google_compute_global_address.ace_box.address
}
