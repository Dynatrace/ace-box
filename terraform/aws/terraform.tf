terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "> 3.27"
    }

    random = {
      source  = "hashicorp/random"
      version = "3.3.2"
    }

  }

  required_version = ">= 0.14.9"
}

provider "aws" {
  region = var.aws_region
}
