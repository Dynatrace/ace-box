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

# SSH key
module "ssh_key" {
  source = "../../modules/ssh"
}

resource "aws_key_pair" "generated_key" {
  key_name   = "ace-box-key-${random_id.uuid.hex}"
  public_key = module.ssh_key.public_key_openssh
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
    private_key = module.ssh_key.private_key_pem
  }
}

locals {
  ingress_domain = local.is_custom_domain ? local.custom_domain : "${aws_instance.acebox.private_ip}.nip.io"
}

# Provision ACE-Box
module "provisioner" {
  source = "../../modules/ace-box-provisioner"

  host             = aws_instance.acebox.private_ip
  user             = var.acebox_user
  private_key      = module.ssh_key.private_key_pem
  ingress_domain   = local.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  dt_paas_token    = var.dt_paas_token
  ca_tenant        = var.ca_tenant
  ca_api_token     = var.ca_api_token
  use_case         = var.use_case
}
