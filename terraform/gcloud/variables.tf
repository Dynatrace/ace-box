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

variable "gcloud_project" {
  description = "Google Cloud Project where resources will be created"
}

variable "gcloud_zone" {
  description = "Google Cloud Zone where resources will be created"
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
  default     = "ubuntu-minimal-2004-lts"
}

variable "custom_domain" {
  description = "Set to overwrite custom domain"
  default     = ""
}

variable "managed_zone_name" {
  description = "Name of GCP managed zone"
  default     = ""
}

variable "skip_domain_workspace_alignment" {
  description = "Set to true if your custom domain shall not be aligned with the currently active Terraform workspace. ATTENTION: This will result in conflicts when the same custom domain is used in multiple workspaces!"
  default     = false
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
variable "dt_owner_team" {
  type        = string
  description = "Required when using Dynatrace GCP environments to provision. Check with DT GCP admins for your specific team value"
  default= "pending-team"
  #nullable = false

}
variable "dt_owner_email" {
  type        = string
  description = "Required when using Dynatrace GCP environments in the format:  name_surname-dynatrace_com. (This helps identify who owns the resources)"
  default= "pending-email"
  #nullable = false
}

variable "otel_export_endpoint" {
  type        = string
  description = "Endpoint where to send opentelemetry data from acebox provisioning to. Example https://your-environment-id.live.dynatrace.com/api/v2/otlp"
  default     = ""
}

variable "otel_export_auth_header" {
  type        = string
  description = "Authentication Header for opentelemetry collector. To send to Dynatrace directly, this value needs to be URL encoded (for the value of the key=value pair only!) Example Authorization=Api-Token%20dt0c01.ABCD..."
  default     = ""
}
variable "otel_export_enable" {
  type        = bool
  description = "Enable openetelemetry export"
  default     = false
}
