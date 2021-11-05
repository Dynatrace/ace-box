locals {
  host = var.host
  type = "ssh"
  user = var.user
  private_key = var.private_key
  user_skel_path = "${path.module}/../../../user-skel/"
  config_file_config = var.config_file_config
  ingress_domain = var.ingress_domain
  ingress_protocol = var.ingress_protocol
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
    destination = "~"
  }

  provisioner "file" {
    content = local.config_file_config
    destination = "~/ace-box.conf.yml"
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
      "export ACE_INGRESS_DOMAIN=${local.ingress_domain}",
      "export ACE_INGRESS_PROTOCOL=${local.ingress_protocol}",
      "export ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
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
      "ace install all",
    ]
  }
}
