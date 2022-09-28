variable "aws_region" {
  default = "us-east-1"
}

variable "aws_instance_type" {
  default = "t3.medium"
}

variable "ubuntu_image" {
  default = "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"
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

variable "disk_size" {
  description = "Size of disk that will be available to ace-box instance"
  default     = 60
}

variable "ingress_cidr_blocks" {
  description = "Ingress CIDR blocks that will be whitelisted to access bastion host on port 22"
  default     = ["127.0.0.1/32"]
}
