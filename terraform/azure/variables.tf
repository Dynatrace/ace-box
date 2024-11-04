# Copyright 2024 Dynatrace LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

variable "azure_subscription_id" {
  description = "Azure Subscription ID for provisioning the Azure resources"
}

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

variable "azure_location" {
  description = "Azure Locationwhere resources will be created"
  default     = "westeurope"
}

variable "azure_instance_size" {
  description = "Azure VM Instance type"
  default     = "Standard_B8ms"
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

variable "ingress_protocol" {
  description = "Ingress protocol"
  default     = "http"
}

variable "use_case" {
  type        = string
  description = "Use cases the ACE-Box will be enabled for."
  default     = "https://github.com/dynatrace-ace/ace-box-ext-template.git"
}

variable "extra_vars" {
  type    = map(string)
  default = {}
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

variable "otel_export_enable" {
  type        = bool
  description = "Enable openetelemetry export to Dynatrace"
  default     = false
}