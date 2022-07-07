variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default     = "ace-box-cloud"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ace"
}

variable "acebox_os_azure" {
  description = "Ubuntu version to use"
  default = {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts"
    version   = "latest"
  }
}

variable "private_ssh_key" {
  description = "Path of where to store private key on current module directory"
  default     = "./key"
}

variable "azure_location" {
  description = "Azure Locationwhere resources will be created"
  default     = "westeurope"
}

variable "azure_instance_size" {
  description = "Azure VM Instance type"
  default     = "Standard_A4m_v2"
}

variable "custom_domain" {
  description = "Set to overwrite custom domain"
  default     = ""
}

variable "dns_zone_name" {
  description = "Name of the Azure DNS zone"
  default     = ""
}

variable "disk_size" {
  description = "Size of disk that will be available to ace-box instance"
  default     = "60"
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
