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

locals {
  key_name = terraform.workspace == "default" ? "key" : "key-${terraform.workspace}"
}

resource "tls_private_key" "acebox_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "local_file" "acebox_pem" {
  filename        = "${path.root}/${local.key_name}"
  content         = tls_private_key.acebox_key.private_key_pem
  file_permission = 400
}
