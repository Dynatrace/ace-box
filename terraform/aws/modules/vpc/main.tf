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

module "custom_vpc" {
  count = var.vpc_type == "NEW" ? 1 : 0

  source = "terraform-aws-modules/vpc/aws"

  name               = "acebox-vpc"
  cidr               = "10.0.0.0/16"
  azs                = data.aws_availability_zones.available.names
  private_subnets    = var.vpc_private_subnets
  public_subnets     = var.vpc_public_subnets
  enable_nat_gateway = var.vpc_enable_nat_gateway
  single_nat_gateway = true

  # tags = var.vpc_tags
}

locals {
  vpc_id = {
    DEFAULT = data.aws_vpc.default.id
    NEW     = length(module.custom_vpc) == 1 ? module.custom_vpc[0].vpc_id : "",
    CUSTOM  = var.custom_vpc_id,
  }[var.vpc_type]
  subnet_ids = {
    DEFAULT = tolist(data.aws_subnets.all.ids)
    NEW     = (length(module.custom_vpc) == 1 ? (var.is_private ? module.custom_vpc[0].private_subnets : module.custom_vpc[0].public_subnets) : []),
    CUSTOM  = var.custom_vpc_subnet_ids,
  }[var.vpc_type]
}
