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
  default = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
}

variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default     = "ace-box-cloud"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ubuntu"
}

variable "associate_public_ip_address" {
  description = "Whether to associate a public IP address with an instance in a VPC"
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

variable "disk_size" {
  description = "Size of disk that will be available to ace-box instance"
  default     = 60
}

variable "dt_tenant" {
  description = "Dynatrace tenant in format of https://[environment-guid].live.dynatrace.com OR https://[managed-domain]/e/[environment-guid]"
}

variable "dt_api_token" {
  description = "Dynatrace API token in format of 'dt0c01. ...'"
}

variable "dt_paas_token" {
  description = "Dynatrace PaaS token in format of 'dt0c01. ...'"
}

variable "ingress_protocol" {
  description = "Ingress protocol"
  default     = "http"
}

variable "ca_tenant" {
  description = "Dynatrace Cloud Automation Endpoint"
  default     = ""
}

variable "ca_api_token" {
  description = "Dynatrace Cloud Automation API token"
  default     = ""
}

variable "use_case" {
  type        = string
  description = "Use cases the ACE-Box will be enabled for."
  default     = "demo_default"
}

variable "extra_vars" {
  type    = map(string)
  default = {}
}
