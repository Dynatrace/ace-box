variable "host" {

}

variable "host_public_ip" {

}

variable "user" {

}

variable "private_key" {

}

variable "ingress_domain" {

}

variable "ingress_protocol" {

}

variable "dt_tenant" {

}

variable "dt_api_token" {

}

variable "dt_paas_token" {

}

variable "ca_tenant" {

}

variable "ca_api_token" {

}

variable "use_case" {

}

variable "host_group" {
  default = "ace-box"
}

variable "extra_vars" {
  type    = map(string)
  default = {}
}
