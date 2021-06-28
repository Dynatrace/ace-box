data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = data.aws_vpc.default.id
}

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

module "security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ace-box-sg-${random_id.uuid.hex}"
  description = "Security group for ace-box"
  vpc_id      = data.aws_vpc.default.id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "ssh-tcp"]
  egress_rules        = ["all-all"]
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
  subnet_id                   = tolist(data.aws_subnet_ids.all.ids)[0]
  vpc_security_group_ids      = [module.security_group.security_group_id]
  associate_public_ip_address = true
  key_name                    = aws_key_pair.generated_key.key_name

  root_block_device {
    volume_size = 40
  }

  tags = {
    Terraform = "true"
    Name      = "${var.name_prefix}-${random_id.uuid.hex}"
  }

  connection {
    host        = self.public_ip
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

}

resource "null_resource" "provisioner" {

  connection {
    host        = aws_instance.acebox.public_ip
    type        = "ssh"
    user        = var.acebox_user
    private_key = tls_private_key.acebox_key.private_key_pem
  }

  depends_on = [aws_route53_record.ace_box, aws_instance.acebox]

  provisioner "remote-exec" {
    inline = [
        "tr -d '\\015' < /home/${var.acebox_user}/install.sh > /home/${var.acebox_user}/install_fixed.sh",
        "chmod +x /home/${var.acebox_user}/install_fixed.sh",
        "/home/${var.acebox_user}/install_fixed.sh --ip=${aws_instance.acebox.public_ip} --user=${var.acebox_user} --custom-domain=${var.custom_domain}"
      ]
  }

}