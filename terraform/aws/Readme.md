# Using Terraform to spin up a ACE-BOX Cloud 

Since the ACE-BOX uses Ansible underneath for configuration management and deploying services, it is also possible to use Terraform for the provisioning.
At the moment, GCP and Azure are supported with a ready-made Terraform config.

## Requirements

- Terraform CLI (0.14.9+) installed
- AWS CLI (AWS SDK) installed
- AWS Account
- AWS Account credentials (Usually set up and sourced by AWS SDK)
- Dynatrace tenant with enough monitoring credits.

## Deployment

1. Configure the AWS CLI from your terminal. Follow the prompts to input your AWS Access Key ID and Secret Access Key.

    ```bash
    aws configure
    ```

    The configuration process stores your credentials in a file at ~/.aws/credentials on MacOS and Linux, or %UserProfile%\.aws\credentials on Windows.

1. Initialize Terraform

    ```bash
    terraform init
    ```

1. Create a `terraform.tfvars` file inside the *terraform* folder
   and add at a minimum the required parameters from the list below:

    ### Use case variables

    Please see [main readme](../../Readme.md).

    ### Default AWS variables

    |Variable|Description|Required|Default|
    |---|---|---|---|
    |aws_region|AWS region resources will be deployed in.|-|us-east-1|
    |aws_instance_type|Size of EC2 instance. Might be increased for high load use cases.|-|t3.2xlarge|
    |disk_size|Size of disk that will be attached to the ACE-Box instance.|-|60|
    |ubuntu_image|AMI that will be used. Non-Ubuntu images are not supported.|-|ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*|
    |acebox_user|User that will be created. This depends on the AMI that is being used.|- |ubuntu|
    |name_prefix|String the EC2 instance will be prefixed with.|-|ace-box-cloud|

    ### AWS ingress variables

    |Variable|Description|Required|Default|
    |---|---|---|---|
    |associate_eip|Set to true if you want to create and associate an AWS Elastic IP. An Elastic IP might be useful if you require a static IP.|-|false|
    |custom_domain|Custom domain an A-Record will be created in.|-|-|
    |ingress_protocol|Ingress protocol is usually *http*. Set to *https* if you're doing e.g. TLS termination with a custom load balancer in front of the ACE-Box VM.|-|http|
    |route53_zone_name|Name of your Route53 zone. Required if you want to use a custom domain.|-|-|
    |route53_private_zone|Whether or not your Route53 zone is private. Required if you want to use a custom domain.|-|false|

    ### AWS VPC variables

    |Variable|Description|Required|Default|
    |---|---|---|---|
    |vpc_type|Type of the VPC you want to use. Allowed values are: <ul><li>**DEFAULT**: All ACE-Box resources are created in your region's default VPC.</li><li>**NEW**: A new VPC is created for you and all ACE-Box resources are created in the newly created VPC.</li><li>**CUSTOM**: Re-use an existing VPC. This requires variables *custom_vpc_id* and *custom_vpc_subnet_ids* being provided.</li></ul>|-|DEFAULT|
    |is_private|Whether or not you want to make communication private. This means the ACE-Box will be launched in a private VPC subnet (if applicable) and all ingress resources will use the VM's private IP. **Attention**: Only set to true if you're working in a private VPC Subnet and run Terraform from a jump server.|-|false|
    |custom_vpc_id|Provide your own VPC ID if *vpc_type* is set to *CUSTOM*.|-|-|
    |custom_vpc_subnet_ids|Provide your own list of VPC Subnet IDs if *vpc_type* is set to *CUSTOM*.|-|[]|
    |custom_security_group_ids|Provide your own list of Security Group IDs that is additionally added to the network interface.|-|[]|
    |vpc_tags|Tags that will be attached to VPC resources.|-|{ Terraform  = "true" GithubRepo = "ace-box" GithubOrg  = "dynatrace" }|
    |vpc_private_subnets|List of CIDR ranges that will be used for private subnets when *vpc_type* is set to *NEW*.|-|["10.0.1.0/24", "10.0.2.0/24"]|
    |vpc_public_subnets|List of CIDR ranges that will be used for public subnets when *vpc_type* is set to *NEW*.|-|["10.0.101.0/24", "10.0.102.0/24"]|
    |vpc_enable_nat_gateway|Whether or not a NAT gateway will be deployed when *vpc_type* is set to *NEW*. This is only required for outbound communication if you deploy the ACE-Box in private subnets of a newly created VPC by setting the variable *is_private* to *true*.|-|false|

2. Verify the configuration and execution plan by running `terraform plan`

    ```bash
    terraform plan
    ```

3. Apply the configuration

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

## Send OpenTelemetry Traces to Dynatrace

It is possible to leverage the [Ansible OpenTelemetry callback plugin](https://docs.ansible.com/ansible/latest/collections/community/general/opentelemetry_callback.html) to send Traces to the Dynatraces API.

The following variable need to be set to enable it:

```hcl
otel_export_enable = true
```

> Note: The traces will be sent to the `dt_tenant/api/v2/otlp` endpoint
> Note: The api token specified in the `dt_api_token` variable needs to have the additional `openTelemetryTrace.ingest` scope 

## Useful Terraform Commands

Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform output` | Shows Terraform outputs such as the command to connect to the host and the dashboard URL. |
`terraform output -json` | Shows Terraform outputs in clear text json. This command might be useful to show the dashboard password. |
