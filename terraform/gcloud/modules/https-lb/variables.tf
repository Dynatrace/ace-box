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

variable "name_prefix" {
  type = string
}

variable "random_id" {
  type = string
}

variable "gcloud_project" {
  type = string
}

variable "custom_domain" {
  type = string
}

variable "managed_zone_name" {
  type = string
}

variable "instance_group" {
  type = string
}
