locals {
  is_custom_domain  = var.custom_domain != "" && var.route53_zone_name != "" && var.route53_private_zone != ""
  custom_domain_ext = terraform.workspace == "default" ? "" : terraform.workspace
  custom_domain     = "${local.custom_domain_ext == "" ? "" : "${local.custom_domain_ext}-"}${var.custom_domain}"
}

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
  records = [aws_instance.acebox.public_ip]
}