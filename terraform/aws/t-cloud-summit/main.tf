# 
# Locals
# 
locals {
  attendee_configs_csv_file = file(var.attendee_configs_csv_path)
  attendee_configs          = csvdecode(local.attendee_configs_csv_file)
  attendee_configs_by_attendees = {
    for k, attendee in local.attendee_configs : attendee.attendee_id => attendee
  }
}


# 
# Randomization
# 
resource "random_id" "instance_id" {
  for_each    = local.attendee_configs_by_attendees
  byte_length = 4
}

resource "random_id" "ace_box" {
  byte_length = 4
}

# 
# SSH key
# 
module "ssh_key" {
  source = "../../modules/ssh"
}

resource "aws_key_pair" "generated_key" {
  key_name   = "ace-box-key-${random_id.ace_box.hex}"
  public_key = module.ssh_key.public_key_openssh
}

module "security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "4.13.0"

  name        = "ace-box-sg-${random_id.ace_box.hex}"
  description = "Security group for ace-box"
  vpc_id      = var.vpc_id

  egress_rules = ["all-all"]

  ingress_cidr_blocks = var.ingress_cidr_blocks
  ingress_rules = [
    "http-80-tcp",
    "https-443-tcp",
    "http-8080-tcp"
  ]

  # Kubernetes API needs to be accessible by Github Actions runner
  ingress_with_cidr_blocks = [{
    from_port   = 16443
    to_port     = 16443
    protocol    = "tcp"
    description = "Kubernetes API"
    cidr_blocks = "0.0.0.0/0"
  }]
}

module "security_group_ssh" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "4.13.0"

  name        = "ace-box-ssh-sg-${random_id.ace_box.hex}"
  description = "Security group for ace-box"
  vpc_id      = var.vpc_id

  egress_rules = ["all-all"]

  computed_ingress_with_source_security_group_id = [{
    rule                     = "ssh-tcp"
    source_security_group_id = var.bastion_security_group_id
  }]
  number_of_computed_ingress_with_source_security_group_id = var.bastion_security_group_id != "" ? 1 : 0
}

# 
# Network interface
# 
resource "aws_network_interface" "acebox" {
  for_each = local.attendee_configs_by_attendees

  subnet_id = var.subnet_id
  security_groups = [
    module.security_group.security_group_id,
    module.security_group_ssh.security_group_id
  ]

  tags = {
    Name = "acebox-${random_id.instance_id[each.key].hex}"
  }
}

# 
# EC2 Instance
# 

resource "aws_instance" "acebox" {
  for_each = local.attendee_configs_by_attendees

  ami           = data.aws_ami.ubuntu.id
  instance_type = var.aws_instance_type
  key_name      = aws_key_pair.generated_key.key_name

  network_interface {
    network_interface_id = aws_network_interface.acebox[each.key].id
    device_index         = 0
  }

  root_block_device {
    volume_size = var.disk_size
  }

  tags = {
    Terraform = "true"
    Name      = "${var.name_prefix}-${random_id.instance_id[each.key].hex}"
  }

  lifecycle {
    ignore_changes = [tags]
  }
}

locals {
  public_ips_by_attendees = {
    for k, attendee in local.attendee_configs_by_attendees : attendee.attendee_id => aws_instance.acebox[k].public_ip
  }
  private_ips_by_attendees = {
    for k, attendee in local.attendee_configs_by_attendees : attendee.attendee_id => aws_instance.acebox[k].private_ip
  }
  public_ips_by_ingress_domains = {
    for k, attendee in local.attendee_configs_by_attendees : attendee.ingress_domain => aws_instance.acebox[k].public_ip
  }
  shh_commands_by_attendees = {
    for k, attendee in local.attendee_configs_by_attendees : attendee.attendee_id => "ssh -i ${module.ssh_key.private_key_filename} ${var.acebox_user}@${aws_instance.acebox[k].public_ip}"
  }
  dashboards_by_attendees = {
    for k, attendee in local.attendee_configs_by_attendees : attendee.attendee_id => "${var.ingress_protocol}://dashboard.${attendee.ingress_domain}"
  }
  records = [
    for k, attendee in local.attendee_configs_by_attendees : "*.${attendee.ingress_domain} 0s A ${aws_instance.acebox[k].public_ip}\n${attendee.ingress_domain} 0s A ${aws_instance.acebox[k].public_ip}"
  ]
  zone_file = <<-EOT
  ${join("\n", local.records)}
  EOT
}

resource "local_file" "zone_file" {
  content  = local.zone_file
  filename = "${path.module}/zone_file.txt"
}

#
# Provision ACE-Box
# 
module "provisioner" {
  for_each = local.attendee_configs_by_attendees
  source   = "../../modules/ace-box-provisioner"

  host             = aws_instance.acebox[each.key].private_ip
  host_public_ip   = aws_instance.acebox[each.key].public_ip
  host_group       = each.value.attendee_id
  user             = var.acebox_user
  private_key      = module.ssh_key.private_key_pem
  ingress_domain   = each.value.ingress_domain
  ingress_protocol = var.ingress_protocol
  dt_tenant        = var.dt_tenant
  dt_api_token     = var.dt_api_token
  dt_paas_token    = var.dt_paas_token
  ca_tenant        = var.ca_tenant
  ca_api_token     = var.ca_api_token
  use_case         = each.value.use_case
  extra_vars       = var.extra_vars
}
