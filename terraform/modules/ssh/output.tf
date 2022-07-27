output "private_key_pem" {
  value = tls_private_key.acebox_key.private_key_pem
}

output "public_key_openssh" {
  value = tls_private_key.acebox_key.public_key_openssh
}

output "private_key_filename" {
  value = local_file.acebox_pem.filename
}
