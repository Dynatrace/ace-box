# AWS

## Requirements

- Terraform CLI (0.14.9+) installed
- AWS CLI installed
- AWS Account
- Access Key that can create resources like ec2 instances and security groups
- Dynatrace tenant with enough monitoring credits.

## Instructions

These instructions apply to deploying an ec2 instance on the default VPC for the specified region.

1. Create a `config.yml` file as per usual (see repo main help for details)
1. Navigate to the AWS terraform directory

    ```bash
    cd terraform/aws/default_vpc
    ```

1. Configure the AWS CLI from your terminal. Follow the prompts to input your AWS Access Key ID and Secret Access Key.

    ```bash
    aws configure
    ```

The configuration process stores your credentials in a file at ~/.aws/credentials on MacOS and Linux, or %UserProfile%\.aws\credentials on Windows.

1. Initialize terraform

    ```bash
    terraform init
    ```

1. Create a `terraform.tfvars` file inside the *terraform* folder
   It needs to contain the following as a minimum:

    ```bash
    aws_region = "" # AWS Region to deploy infrastructure to
    ```

    Check out `variables.tf` for a complete list of variables
    **Note:** Do not change or override the default value of the acebox_user variable.

1. Verify the configuration and execution plan by running `terraform plan`

    ```bash
    terraform plan
    ```

1. Apply the configuration

    ```bash
    terraform apply
    ```

## Custom domain support

This terraform script supports the use of custom domains via Route53.

1. Ensure your access key can create dns records in the target Route53 zone.

1. Add the following values to the `terraform.tfvars` file:

    ```hcl
    aws_region = "" # AWS Region to deploy infrastructure to
    custom_domain = "" # Set to override default domain (ip_address.xip.io)
    route53_zone_name = "" # Name of route53 zone (defaults to public zones)
    ```
