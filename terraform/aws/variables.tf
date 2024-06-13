#
# Global variables
#
variable "use_case" {
  type        = string
  description = "Use cases the ACE-Box will be enabled for."
  default     = "https://github.com/dynatrace-ace/ace-box-ext-template.git"
}

variable "extra_vars" {
  type    = map(string)
  default = {}
}

variable "dt_tenant" {
  description = "Dynatrace tenant in format of https://[environment-guid].live.dynatrace.com OR https://[managed-domain]/e/[environment-guid]"
}

variable "dt_api_token" {
  description = "Dynatrace API token in format of 'dt0c01. ...'"
}

variable "dashboard_user" {
  type        = string
  description = "ACE-Box dashboard user."
  default     = "dynatrace"
}

variable "dashboard_password" {
  type        = string
  description = "ACE-Box dashboard password."
  default     = ""
}

#
# AWS default variables
#
variable "aws_region" {
  default = "us-east-1"
}

variable "aws_instance_type" {
  default = "t3.2xlarge"
}

variable "disk_size" {
  description = "Size of disk that will be attached to the ACE-Box instance."
  default     = 60
}

variable "ubuntu_image" {
  default = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created."
  default     = "ubuntu"
}

variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default     = "ace-box-cloud"
}

# 
# AWS ingress variables
#
variable "associate_eip" {
  description = "Whether or not an ElasticIP shall be associated with the ACE-Box."
  default     = false
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

variable "ingress_protocol" {
  description = "Ingress protocol"
  default     = "http"
}

#
# AWS VPC variables
#
variable "vpc_type" {
  type        = string
  description = "VPC to use. Allowed values are DEFAULT (default), NEW or CUSTOM"
  default     = "DEFAULT"

  validation {
    condition     = contains(["DEFAULT", "NEW", "CUSTOM"], var.vpc_type)
    error_message = "Invalid valiue! Please choose one of: DEFAULT (default), NEW or CUSTOM."
  }
}

variable "is_private" {
  default     = false
  description = "Set to true if you only want to assign and communicate with private IPs."
}

variable "custom_vpc_id" {
  default     = ""
  description = "Provide your own VPC id when using vpc_type \"CUSTOM\"."
}

variable "custom_vpc_subnet_ids" {
  type        = list(string)
  default     = []
  description = "Provide list of VPC Subnet ids when using vpc_type \"CUSTOM\"."
}

variable "custom_security_group_ids" {
  description = "Additional security groups that will be added to the instance's network interface."
  type        = list(string)
  default     = []
}

variable "vpc_tags" {
  description = "Tags applied to VPC resources."
  type        = map(string)
  default = {
    Terraform  = "true"
    GithubRepo = "ace-box"
    GithubOrg  = "dynatrace"
  }
}

variable "vpc_private_subnets" {
  description = "Private subnets CIDRs when using vpc_type \"NEW\"."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "vpc_public_subnets" {
  description = "Public subnets CIDRs when using vpc_type \"NEW\"."
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "vpc_enable_nat_gateway" {
  description = "Enable NAT gateway for VPC"
  type        = bool
  default     = false
}
