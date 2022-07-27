locals {
  key_name = terraform.workspace == "default" ? "key" : "key-${terraform.workspace}"
}

resource "tls_private_key" "acebox_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "acebox_pem" {
  filename        = "${path.root}/${local.key_name}"
  content         = tls_private_key.acebox_key.private_key_pem
  file_permission = 400
}
