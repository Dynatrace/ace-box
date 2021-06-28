variable "aws_region" {
  default = "us-east-1"
}

variable "vpc_enable_nat_gateway" {
  description = "Enable NAT gateway for VPC"
  type        = bool
  default     = true
}

variable "vpc_private_subnets" {
  description = "Private subnets for VPC"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "vpc_public_subnets" {
  description = "Public subnets for VPC"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "vpc_tags" {
  description = "Tags to apply to resources created by VPC module"
  type        = map(string)
  default = {
    Terraform  = "true"
    GithubRepo  = "ace-box"
    GithubOrg   = "dynatrace"
  }
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