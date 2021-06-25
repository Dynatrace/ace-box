data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = [var.ubuntu_image]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_network_interface" "acebox_nic" {
  subnet_id       = var.subnet_id
  security_groups = var.security_group_ids

  attachment {
    instance     = aws_instance.acebox.id
    device_index = 1
  }
}

resource "tls_private_key" "acebox_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "acebox_pem" { 
  filename = "${path.module}/key"
  content = tls_private_key.acebox_key.private_key_pem
  file_permission = 400
}

resource "aws_key_pair" "generated_key" {
  key_name   = "ace-box-key-${random_id.uuid.hex}"
  public_key = tls_private_key.acebox_key.public_key_openssh
}

resource "aws_instance" "acebox" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.aws_instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = var.security_group_ids
  associate_public_ip_address = var.associate_public_ip_address
  iam_instance_profile        = aws_iam_instance_profile.acebox_profile.name
  key_name                    = aws_key_pair.generated_key.key_name

  root_block_device {
    volume_size = 40
  }

  tags = {
    Terraform = "true"
    Name      = "${var.name_prefix}-${random_id.uuid.hex}"
  }

  connection {
    host        = self.private_ip
    type        = "ssh"
    user        = var.acebox_user
    private_key = tls_private_key.acebox_key.private_key_pem
  }

  provisioner "remote-exec" {
    inline = ["sudo apt-get update && sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y"]
  }

  provisioner "remote-exec" {
    inline = ["mkdir ~/ace-box/"]
  }

  provisioner "file" {
    source      = "${path.module}/../../../microk8s"
    destination = "~/ace-box/"
  }

  provisioner "file" {
    source      = "${path.module}/../../../install.sh"
    destination = "~/install.sh"
  }

  provisioner "remote-exec" {
    inline = [
        "tr -d '\\015' < /home/${var.acebox_user}/install.sh > /home/${var.acebox_user}/install_fixed.sh",
        "chmod +x /home/${var.acebox_user}/install_fixed.sh",
        "/home/${var.acebox_user}/install_fixed.sh --ip=${self.private_ip} --user=${var.acebox_user} --custom-domain=${var.custom_domain}"
      ]
  }

}
