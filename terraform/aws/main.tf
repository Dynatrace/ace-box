#
# Randomization
#
resource "random_id" "uuid" {
  byte_length = 4
}

#
# VPC
#
module "vpc" {
  source = "./modules/vpc"

  vpc_type               = var.vpc_type
  is_private             = var.is_private
  custom_vpc_id          = var.custom_vpc_id
  custom_vpc_subnet_ids  = var.custom_vpc_subnet_ids
  vpc_tags               = var.vpc_tags
  vpc_private_subnets    = var.vpc_private_subnets
  vpc_public_subnets     = var.vpc_public_subnets
  vpc_enable_nat_gateway = var.vpc_enable_nat_gateway
}

#
# Ingress
#
module "ingress" {
  source = "./modules/ingress"

  custom_domain        = var.custom_domain
  route53_zone_name    = var.route53_zone_name
  route53_private_zone = var.route53_private_zone
  is_private           = var.is_private
  ec2_private_ip       = aws_instance.acebox.private_ip
  ec2_public_ip        = aws_instance.acebox.public_ip
  network_interface_id = aws_network_interface.acebox_nic.id
  associate_eip        = var.associate_eip
}

#
# SGs
# 
module "security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name        = "ace-box-sg-${random_id.uuid.hex}"
  description = "Security group for ace-box"
  vpc_id      = module.vpc.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["http-80-tcp", "https-443-tcp", "ssh-tcp"]
  egress_rules        = ["all-all"]
}

#
# SSH key
#
module "ssh_key" {
  source = "../modules/ssh"
}

resource "aws_key_pair" "generated_key" {
  key_name   = "ace-box-key-${random_id.uuid.hex}"
  public_key = module.ssh_key.public_key_openssh
}

#
# EC2
#
resource "aws_network_interface" "acebox_nic" {
  subnet_id       = module.vpc.subnet_ids[0]
  security_groups = compact(concat([module.security_group.security_group_id], var.custom_security_group_ids))

  tags = var.vpc_tags
}

resource "aws_instance" "acebox" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.aws_instance_type
  key_name      = aws_key_pair.generated_key.key_name

  root_block_device {
    volume_size = var.disk_size
  }

  network_interface {
    network_interface_id = aws_network_interface.acebox_nic.id
    device_index         = 0
  }

  tags = {
    Terraform = "true"
    Name      = "${var.name_prefix}-${random_id.uuid.hex}"
  }
}

#
# Provisioner
#
module "provisioner" {
  source = "../modules/ace-box-provisioner"

  host             = module.ingress.ingress_ip
  user             = var.acebox_user
  private_key      = module.ssh_key.private_key_pem
  ingress_domain   = module.ingress.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  ca_tenant        = var.ca_tenant
  ca_api_token     = var.ca_api_token
  use_case         = var.use_case
  extra_vars       = var.extra_vars

  depends_on = [
    aws_instance.acebox
  ]
}