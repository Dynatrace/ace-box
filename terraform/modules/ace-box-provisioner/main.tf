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

resource "null_resource" "provisioner_prepare" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  depends_on = [null_resource.provisioner_home_dir]

  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/${local.user}/prepare.sh",
      "/home/${local.user}/prepare.sh --ingress-domain=${local.ingress_domain} --ingress-protocol=${local.ingress_protocol}"
    ]
  }
}

resource "null_resource" "provisioner_install" {
  connection {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
  }

  depends_on = [null_resource.provisioner_home_dir, null_resource.provisioner_prepare]

  provisioner "remote-exec" {
    inline = [
      "chmod +x /home/${local.user}/install.sh",
      "/home/${local.user}/install.sh"
    ]
  }
}
