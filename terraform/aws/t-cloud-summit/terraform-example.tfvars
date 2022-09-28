# 
# Dynatrace credentials
# 
dt_tenant     = ""
dt_api_token  = ""
dt_paas_token = ""

#
# Custom VPC
#
# Repurpose an existing VPC by providing it's id and 
# the id of a subnet the EC2 instances will be launched in.
#
vpc_id                    = ""
subnet_id                 = ""
bastion_security_group_id = ""
ingress_cidr_blocks       = ["127.0.0.1/32"]

#
# Use case
#
attendee_configs_csv_path = "./attendees-example.csv"
extra_vars                = {}
