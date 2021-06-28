variable "aws_region" {
  default = "us-east-1"
}

variable "subnet_id" {
  default = ""
}

variable "security_group_ids" {
  default = []
}

variable "aws_instance_type" {
  default = "t3.2xlarge"
}

variable "ubuntu_image" {
  default = "ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-*"
}

variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default = "ace-box-cloud"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ubuntu"
}

variable "associate_public_ip_address" {
  description = "Whether to associate a public IP address with an instance in a VPC"
  default = false
}

variable "custom_domain" {
  description = "Set to overwrite custom domain"
  default     = ""
}

variable "route53_zone_name" {
  description = "Name of Route53 zone"
  default     = ""
}

variable "route53_private_zone" {
  description = "Whether the Route53 zone is private"
  default     = false
}