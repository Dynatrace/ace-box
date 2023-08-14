locals {
  host               = var.host
  type               = "ssh"
  user               = var.user
  private_key        = var.private_key
  user_skel_path     = "${path.module}/../../../user-skel/"
  ingress_domain     = var.ingress_domain
  ingress_protocol   = var.ingress_protocol
  dt_tenant          = var.dt_tenant
  dt_api_token       = var.dt_api_token
  host_group         = var.host_group
  extra_vars         = var.extra_vars
  dashboard_user     = var.dashboard_user
  dashboard_password = var.dashboard_password
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
    destination = "/home/${local.user}"
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
      "sed -i 's/\r$//' /home/${local.user}/init.sh",
      "chmod +x /home/${local.user}/init.sh",
      "export ACE_BOX_USER=${local.user}",
      "sudo ACE_BOX_USER=$ACE_BOX_USER /home/$ACE_BOX_USER/init.sh"
    ]
  }
}

locals {
  prepare_cmd = [
    "sudo",
    "ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
    "ACE_BOX_USER=${local.user}",
    "ACE_INGRESS_DOMAIN=${local.ingress_domain}",
    "ACE_INGRESS_PROTOCOL=${local.ingress_protocol}",
    "ACE_DT_TENANT=${local.dt_tenant}",
    "ACE_DT_API_TOKEN=${local.dt_api_token}",
    "ACE_HOST_GROUP=${local.host_group}",
    "ACE_DASHBOARD_USER=${local.dashboard_user}",
    "ACE_DASHBOARD_PASSWORD=\"${local.dashboard_password}\"",
    "ace prepare --force"
  ]
  ace_extra_vars = [
    for k, v in var.extra_vars : "--extra-var=${k}=${v}"
  ]
}

resource "null_resource" "provisioner_ace_prepare" {
  triggers = {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
    prepare_cmd = trimspace(join(" ", local.prepare_cmd))
    extra_vars  = trimspace(join(" ", local.ace_extra_vars))
  }

  connection {
    host        = self.triggers.host
    type        = self.triggers.type
    user        = self.triggers.user
    private_key = self.triggers.private_key
  }

  depends_on = [null_resource.provisioner_init]

  provisioner "remote-exec" {
    inline = [
      trimspace(join(" ", [self.triggers.prepare_cmd, self.triggers.extra_vars]))
    ]
  }
}

locals {
  enable_cmd = [
    "sudo",
    "ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
    "ACE_BOX_USER=${local.user}",
    "ace enable ${var.use_case}",
  ]
  destroy_cmd = [
    "sudo",
    "ACE_ANSIBLE_WORKDIR=/home/${local.user}/ansible/",
    "ACE_BOX_USER=${local.user}",
    "ace destroy",
  ]
}

resource "null_resource" "provisioner_ace_enable" {
  triggers = {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
    enable_cmd  = trimspace(join(" ", local.enable_cmd))
  }

  connection {
    host        = self.triggers.host
    type        = self.triggers.type
    user        = self.triggers.user
    private_key = self.triggers.private_key
  }

  depends_on = [null_resource.provisioner_ace_prepare]

  provisioner "remote-exec" {
    inline = [
      self.triggers.enable_cmd
    ]
  }
}

resource "null_resource" "provisioner_ace_destroy" {
  #
  # In order to prevent e.g. dependency cycles, Terraform 
  # does not allow destroy time remote-exec when connection 
  # attributes (e.g. host, user, ...) is owned by a different
  # resource the provisioners is added to.
  #
  # Connections are not available from null_resource.
  # Therefore, we're adding triggers which allow us to
  # reference connection attributes from self.triggers.
  #

  triggers = {
    host        = local.host
    type        = local.type
    user        = local.user
    private_key = local.private_key
    destroy_cmd = trimspace(join(" ", local.destroy_cmd))
  }

  connection {
    host        = self.triggers.host
    type        = self.triggers.type
    user        = self.triggers.user
    private_key = self.triggers.private_key
  }

  depends_on = [null_resource.provisioner_ace_prepare]

  provisioner "remote-exec" {
    when = destroy
    inline = [
      self.triggers.destroy_cmd
    ]
    on_failure = continue
  }

  lifecycle {
    create_before_destroy = true
  }
}
