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
  is_custom_domain  = var.custom_domain != "" && var.route53_zone_name != "" && var.route53_private_zone != ""
  custom_domain_ext = terraform.workspace == "default" ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
  primary_ec2_ip    = var.is_private ? var.ec2_private_ip : var.ec2_public_ip
  elastic_ip        = (length(aws_eip.acebox) == 1 ? (var.is_private ? aws_eip.acebox[0].private_ip : aws_eip.acebox[0].public_ip) : "")
  ingress_ip        = var.associate_eip ? local.elastic_ip : local.primary_ec2_ip
}

#
# ElasticIP
#
resource "aws_eip" "acebox" {
  count  = var.associate_eip ? 1 : 0
  domain = "vpc"
}

resource "aws_eip_association" "eip_assoc" {
  count                = var.associate_eip ? 1 : 0
  network_interface_id = var.network_interface_id
  allocation_id        = aws_eip.acebox[0].id
}

#
# Route53 
#
data "aws_route53_zone" "aws_zone" {
  count = local.is_custom_domain ? 1 : 0

  name         = var.route53_zone_name
  private_zone = var.route53_private_zone
}

resource "aws_route53_record" "ace_box" {
  count = local.is_custom_domain ? 1 : 0

  zone_id = data.aws_route53_zone.aws_zone[0].zone_id
  name    = "*.${local.custom_domain}"
  type    = "A"
  ttl     = "300"
  records = [local.ingress_ip]
}
