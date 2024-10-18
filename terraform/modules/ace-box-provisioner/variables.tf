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

variable "host" {

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

variable "use_case" {

}

variable "host_group" {
  default = "ace-box"
}

variable "extra_vars" {
  type    = map(string)
  default = {}
}

variable "dashboard_user" {

}

variable "dashboard_password" {

}

variable "otel_export_enable" {

}