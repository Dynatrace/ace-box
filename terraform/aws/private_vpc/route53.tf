data "aws_route53_zone" "aws_zone" {
  count = var.route53_zone_name == "" ? 0 : 1

  name         = var.route53_zone_name
  private_zone = var.route53_private_zone
}

resource "aws_route53_record" "ace_box" {
  count = var.route53_zone_name == "" ? 0 : 1

  zone_id = data.aws_route53_zone.aws_zone[0].zone_id
  name    = "*.${var.custom_domain}"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.acebox.private_ip]
}