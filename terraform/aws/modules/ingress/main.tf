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
  custom_domain_ext = (var.skip_domain_workspace_alignment || terraform.workspace == "default") ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
  primary_ec2_ip    = var.is_private ? var.ec2_private_ip : var.ec2_public_ip
  elastic_ip        = (length(aws_eip.acebox) == 1 ? (var.is_private ? aws_eip.acebox[0].private_ip : aws_eip.acebox[0].public_ip) : "")
  ingress_ip        = var.associate_eip ? local.elastic_ip : local.primary_ec2_ip
}

resource "random_id" "uuid" {
  byte_length = 4
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

#
# ACM 
#
resource "aws_acm_certificate" "wildcard" {
  count             = local.is_custom_domain ? 1 : 0
  domain_name       = "*.${local.custom_domain}"
  validation_method = "DNS"

  tags = {
    Name = "wildcard-cert"
  }
}

resource "aws_route53_record" "wildcard_cert_validation" {
  for_each = local.is_custom_domain ? {
    for dvo in aws_acm_certificate.wildcard[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  } : {}

  zone_id = data.aws_route53_zone.aws_zone[0].zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "wildcard" {
  count                 = local.is_custom_domain ? 1 : 0
  certificate_arn       = aws_acm_certificate.wildcard[count.index].arn
  validation_record_fqdns = [for record in aws_route53_record.wildcard_cert_validation : record.fqdn]
}

#
# ALB
#

module "alb_security_group" {
  count  = local.is_custom_domain ? 1 : 0
  source = "terraform-aws-modules/security-group/aws"

  name        = "alb-sg-${random_id.uuid.hex}"
  description = "Security group for ALB"
  vpc_id      = var.vpc_id

  ingress_cidr_blocks = ["0.0.0.0/0"]
  ingress_rules       = ["all-all"]
  egress_rules        = ["all-all"]
}

resource "aws_lb" "acebox-lb" {
  count             = local.is_custom_domain ? 1 : 0
  name               = "alb-${var.name_prefix}-${random_id.uuid.hex}"
  internal           = false
  load_balancer_type = "application"
  security_groups    = local.is_custom_domain ? [module.alb_security_group[0].security_group_id] : []
  subnets            = var.subnet_ids

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "acebox-tg-http" {
  count             = local.is_custom_domain ? 1 : 0
  name     = "acebox-tg-http-${random_id.uuid.hex}"
  port     = 80
  protocol = "HTTP"
  vpc_id   = var.vpc_id

  health_check {
    protocol            = "HTTP"
    path                = "/healthz"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
  }
}

resource "aws_lb_target_group" "acebox-tg-https" {
  count             = local.is_custom_domain ? 1 : 0
  name     = "acebox-tg-https-${random_id.uuid.hex}"
  port     = 443
  protocol = "HTTPS"
  vpc_id   = var.vpc_id

  health_check {
    protocol            = "HTTPS"
    path                = "/healthz"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
  }
}
resource "aws_lb_target_group_attachment" "acebox-tg-http-attach" {
  count             = local.is_custom_domain ? length(var.aws_instance_ids) : 0
  target_group_arn  = aws_lb_target_group.acebox-tg-http[count.index].arn
  target_id         = element(keys(var.aws_instance_ids), count.index)
  port              = 80
}

resource "aws_lb_target_group_attachment" "acebox-tg-https-attach" {
  count             = local.is_custom_domain ? length(var.aws_instance_ids) : 0
  target_group_arn  = aws_lb_target_group.acebox-tg-https[count.index].arn
  target_id         = element(keys(var.aws_instance_ids), count.index)
  port              = 443
}

resource "aws_lb_listener" "http" {
  count             = local.is_custom_domain ? 1 : 0
  load_balancer_arn = aws_lb.acebox-lb[count.index].arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.acebox-tg-http[count.index].arn
  }
}

resource "aws_lb_listener" "https" {
  count             = local.is_custom_domain ? 1 : 0
  load_balancer_arn = aws_lb.acebox-lb[count.index].arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.wildcard[count.index].arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.acebox-tg-https[count.index].arn
  }
}

resource "aws_route53_record" "ace_box" {
  count = local.is_custom_domain ? 1 : 0

  zone_id = data.aws_route53_zone.aws_zone[0].zone_id
  name    = "*.${local.custom_domain}"
  type    = "A"
  alias {
    name                   = aws_lb.acebox-lb[count.index].dns_name
    zone_id                = aws_lb.acebox-lb[count.index].zone_id
    evaluate_target_health = true
  }
}