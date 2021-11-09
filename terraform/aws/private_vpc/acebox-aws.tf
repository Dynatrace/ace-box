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
  filename = "${path.module}/${var.private_ssh_key}"
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
    volume_size = var.disk_size
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
}

# Provision ACE-Box
module "provisioner" {
  source = "../../modules/ace-box-provisioner"

  host        = aws_instance.acebox.private_ip
  user        = var.acebox_user
  private_key = tls_private_key.acebox_key.private_key_pem
  config_file_config = templatefile("${path.module}/ace-box.conf.yml.tpl", {
    dt_tenant     = var.dt_tenant
    dt_api_token  = var.dt_api_token
    dt_paas_token = var.dt_paas_token
  })
  ingress_domain   = "${aws_instance.acebox.private_ip}.${var.custom_domain}"
  ingress_protocol = var.ingress_protocol
}
