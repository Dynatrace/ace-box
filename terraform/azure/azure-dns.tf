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
  is_custom_domain  = var.custom_domain != "" && var.dns_zone_name != ""
  custom_domain_ext = terraform.workspace == "default" ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
}

resource "azurerm_dns_a_record" "ace_box" {
  count = local.is_custom_domain ? 1 : 0

  name                = "*.${local.custom_domain}"
  zone_name           = var.dns_zone_name
  resource_group_name = azurerm_resource_group.rg.name
  ttl                 = 300
  records             = [azurerm_public_ip.acebox_publicip.ip_address]
}
