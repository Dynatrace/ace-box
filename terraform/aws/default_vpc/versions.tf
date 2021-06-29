terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
    
    random = {
      source  = "hashicorp/random"
      version = "3.0.0"
    }
    
  }

  required_version = ">= 0.14.9"
}