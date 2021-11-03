variable "gcloud_project" {
  description = "Google Cloud Project where resources will be created"
}

variable "gcloud_zone" {
  description = "Google Cloud Zone where resources will be created"
}

variable "gcloud_cred_file" {
  description = "Path to GCloud credential file"
}

variable "name_prefix" {
  description = "Prefix to distinguish the instance"
  default     = "ace-box-cloud"
}

variable "acebox_size" {
  description = "Size (machine type) of the ace-box instance"
  default     = "n2-standard-8"
}

variable "acebox_user" {
  description = "Initial user when ace-box is created"
  default     = "ace"
}

variable "acebox_os" {
  description = "Ubuntu version to use"
  default     = "ubuntu-minimal-1804-lts"
}

variable "private_ssh_key" {
  description = "Path of where to store private key on current module directory"
  default     = "./key"
}

variable "custom_domain" {
  description = "Set to overwrite custom domain"
  default     = "nip.io"
}

variable "managed_zone_name" {
  description = "Name of GCP managed zone"
  default     = ""
}

variable "disk_size" {
  description = "Size of disk that will be available to ace-box instance"
  default     = "60"
}

variable "dt_tenant" {

}

variable "dt_api_token" {

}

variable "dt_paas_token" {

}
