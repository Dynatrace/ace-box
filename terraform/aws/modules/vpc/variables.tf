variable "vpc_enable_nat_gateway" {
  type = bool
}

variable "vpc_private_subnets" {
  type = list(string)
}

variable "vpc_public_subnets" {
  type = list(string)
}

variable "vpc_tags" {
  type = map(string)
}

variable "vpc_type" {
  type = string
}

variable "is_private" {
  type = bool
}

variable "custom_vpc_id" {
  type = string
}

variable "custom_vpc_subnet_ids" {
  type = list(string)
}
