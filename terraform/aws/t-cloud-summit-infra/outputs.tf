output "vpc_id" {
  value = module.vpc.vpc_id
}

output "subnet_ids" {
  value = module.vpc.public_subnets
}

output "shh" {
  value = "ssh -i ${module.ssh_key.private_key_filename} ${var.acebox_user}@${aws_instance.acebox.public_ip}"
}

output "bastion_security_group_id" {
  value = module.security_group.security_group_id
}
