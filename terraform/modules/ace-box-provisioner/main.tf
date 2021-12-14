locals {
  host             = var.host
  type             = "ssh"
  user             = var.user
  private_key      = var.private_key
  user_skel_path   = "${path.module}/../../../user-skel/"
  ingress_domain   = var.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  dt_paas_token    = var.dt_paas_token
}

resource "null_resource" "provisioner_home_dir" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  provisioner "file" {
    source      = local.user_skel_path
    destination = "."
  }
}

resource "null_resource" "provisioner_init" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  depends_on = [null_resource.provisioner_home_dir]

  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/${local.user}/init.sh",
      "/home/${local.user}/init.sh"
    ]
  }
}

resource "null_resource" "provisioner_ace_prepare" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  depends_on = [null_resource.provisioner_home_dir, null_resource.provisioner_init]

  provisioner "remote-exec" {
    inline = [
      "export ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
      "export ACE_INGRESS_DOMAIN=${local.ingress_domain}",
      "export ACE_INGRESS_PROTOCOL=${local.ingress_protocol}",
      "export ACE_DT_TENANT=${local.dt_tenant}",
      "export ACE_DT_API_TOKEN=${local.dt_api_token}",
      "export ACE_DT_PAAS_TOKEN=${local.dt_paas_token}",
      "ace prepare --force",
    ]
  }
}

resource "null_resource" "provisioner_ace_install" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  depends_on = [null_resource.provisioner_home_dir, null_resource.provisioner_init, null_resource.provisioner_ace_prepare]

  provisioner "remote-exec" {
    inline = [
      "export ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
      "ace install default",
    ]
  }
}
