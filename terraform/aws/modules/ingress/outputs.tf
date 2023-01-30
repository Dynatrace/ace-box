output "is_custom_domain" {
  value = local.is_custom_domain
}

output "ingress_ip" {
  value = local.ingress_ip
}

output "ingress_domain" {
  value = local.is_custom_domain ? local.custom_domain : "${local.ingress_ip}.nip.io"
}
