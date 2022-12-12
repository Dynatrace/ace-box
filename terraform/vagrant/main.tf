resource "local_file" "ace_box_conf" {
  content = templatefile("ace.config.yml.tpl", {
    dt_tenant    = var.dt_tenant
    dt_api_token = var.dt_api_token
    ca_tenant    = var.ca_tenant
    ca_api_token = var.ca_api_token
  })
  filename = "${path.module}/ace.config.yml"
}

resource "vagrant_vm" "ace_box" {
  connection {
    host        = self.ssh_config[0].host
    port        = self.ssh_config[0].port
    type        = self.ssh_config[0].type
    user        = self.ssh_config[0].user
    private_key = self.ssh_config[0].private_key
  }

  depends_on = [
    local_file.ace_box_conf
  ]
}
