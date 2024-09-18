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

output "acebox_dashboard" {
  value = "http://dashboard.${module.ingress.ingress_domain}"
}

output "dashboard_password" {
  value     = local.dashboard_password
  sensitive = true
}

output "acebox_ip" {
  value = "connect using: ssh -i ${module.ssh_key.private_key_filename} ${var.acebox_user}@${module.ingress.ingress_ip}"
}

output "comment" {
  value = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
}
