variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default = "ace-box-cloud"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ace"
}

variable "acebox_os_azure" {
  description = "Ubuntu version to use"
  default = {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }
}

variable "ssh_keys" {
  description = "Paths to public and private SSH keys for ace-box user"
  default = {
    private = "./key"
    public  = "./key.pub"
  }
}

variable "azure_location" {
  description = "Azure Locationwhere resources will be created"
  default = "westeurope"
}

variable "azure_instance_size" {
  description = "Azure VM Instance type"
  default = "Standard_A4m_v2"
}

variable "custom_domain" {
  description = "Set to overwrite custom domain"
  default     = ""
}