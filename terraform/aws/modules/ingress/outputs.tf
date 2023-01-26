output "is_custom_domain" {
  value = local.is_custom_domain
}

output "ingress_domain" {
  value = local.is_custom_domain ? local.custom_domain : "${var.ip}.nip.io"
}
