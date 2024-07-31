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

variable "custom_domain" {}

variable "route53_zone_name" {}

variable "route53_private_zone" {}

variable "is_private" {}

variable "ec2_private_ip" {}

variable "ec2_public_ip" {}

variable "network_interface_id" {}

variable "associate_eip" {}
