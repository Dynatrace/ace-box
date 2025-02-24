---
sidebar_position: 1
---

# Configure

Initial setup for your cloud provider of preference

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

1. Clone the [ACE-Box repository](https://github.com/Dynatrace/ace-box):
    ```bash
    git clone https://github.com/Dynatrace/ace-box.git
    ```

2. Pick your cloud provider of preference. The ACE-Box will get deployed in a standard compute resource (VM).

> Note: you can also deploy the ACE-Box locally, but we recommend you to use a cloud provider (AWS, Azure or GCP)

<Tabs>
  <TabItem value="AWS" label="AWS" default>

  ## AWS Requirements

  - Terraform CLI (0.14.9+) installed
  - AWS CLI (AWS SDK) installed
  - AWS Account
  - AWS Account credentials (Usually set up and sourced by AWS SDK)
  - Dynatrace tenant with enough monitoring credits.

  ## AWS Deployment

  3. Move to the AWS folder
    ```bash
    cd terraform/aws/
    ```

  4. Configure the AWS CLI from your terminal. Follow the prompts to input your AWS Access Key ID and Secret Access Key.
    ```bash
    aws configure
    ```

    > Note: the configuration process stores your credentials in a file at `~/.aws/credentials` on MacOS and Linux, or `%UserProfile%\.aws\credentials` on Windows.
  
  5. Initialize Terraform

    ```bash
    terraform init
    ```

  6. Still under the `terraform/aws/` folder, create a `terraform.tfvars` file and add at a minimum the required parameters:

    ```conf
    // You can use prod, sprint or dev
    dt_tenant = "https://<tenant_id>.live.dynatrace.com" 
    dt_api_token = "<tenant_api_token>"
    extra_vars = {
      dt_environment_url_gen3 = "https://<tenant_id>.sprint.apps.dynatracelabs.com" // You can use prod, sprint or dev tenants
      dt_oauth_sso_endpoint   = "https://sso-sprint.dynatracelabs.com/sso/oauth2/token" // Respective sso for the stage
      dt_oauth_client_id = "<client_id>" // check scopes below
      dt_oauth_client_secret = "<client_secret>"
      dt_oauth_account_urn = "urn:dtaccount:<id>"
    }
    ```

  > Note: It is recommended to set the sensitive variables as environment variables. More information in the terraform documentation [here](https://developer.hashicorp.com/terraform/language/values/variables#environment-variables)

  7. Create the respective Dynatrace tokens, with the following scopes
    - [API token scopes](#api-token-scopes). Check how to create a Dynatrace API token [here](https://docs.dynatrace.com/docs/dynatrace-api/basics/dynatrace-api-authentication#create-token)
    - [Oauth client scopes](#oauth-client-scopes). Check how to create an Dynatrace Oauth client [here](https://docs.dynatrace.com/docs/manage/identity-access-management/access-tokens-and-oauth-clients/oauth-clients)
  
  8. (Optional) You can add the following additional variables to the terraform.tfvars config file. If you don't add them, they are configured with a default value, there are not mandatory.

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
  |vpc_tags|Tags that will be attached to VPC resources.|-|\{ Terraform  = "true" GithubRepo = "ace-box" GithubOrg  = "dynatrace" \}|
  |vpc_private_subnets|List of CIDR ranges that will be used for private subnets when *vpc_type* is set to *NEW*.|-|["10.0.1.0/24", "10.0.2.0/24"]|
  |vpc_public_subnets|List of CIDR ranges that will be used for public subnets when *vpc_type* is set to *NEW*.|-|["10.0.101.0/24", "10.0.102.0/24"]|
  |vpc_enable_nat_gateway|Whether or not a NAT gateway will be deployed when *vpc_type* is set to *NEW*. This is only required for outbound communication if you deploy the ACE-Box in private subnets of a newly created VPC by setting the variable *is_private* to *true*.|-|false| 

  </TabItem>
  
  <TabItem value="Azure" label="Azure">
    
    ## Azure Requirements

    - Terraform needs to be locally installed.
    - An Azure account is needed.
    - Azure CLI.

    ## Azure Deployment

    3. Sign in to the correct subscription using the az cli

        ```bash
        $ az login
        ```

    > Note: if you have multiple subscriptions, you will have to set the default one using `az account set --subscription YOURSUBSCRIPTION`

    4. Navigate to the `terraform` azure folder

        ```bash
        $ cd terraform/azure
        ```

    5. Initialize terraform

        ```bash
        $ terraform init
        ```

    6. Create a `terraform.tfvars` file inside the *terraform* folder. It needs to contain the following as a minimum:

    ```conf
    // You can use prod, sprint or dev
    dt_tenant = "https://<tenant_id>.live.dynatrace.com" 
    dt_api_token = "<tenant_api_token>"
    extra_vars = {
      dt_environment_url_gen3 = "https://<tenant_id>.sprint.apps.dynatracelabs.com" // You can use prod, sprint or dev tenants
      dt_oauth_sso_endpoint   = "https://sso-sprint.dynatracelabs.com/sso/oauth2/token" // Respective sso for the stage
      dt_oauth_client_id = "<client_id>" // check scopes below
      dt_oauth_client_secret = "<client_secret>"
      dt_oauth_account_urn = "urn:dtaccount:<id>"
    }
    ```

  > Note: It is recommended to set the sensitive variables as environment variables. More information in the terraform documentation [here](https://developer.hashicorp.com/terraform/language/values/variables#environment-variables)

  7. Create the respective Dynatrace tokens, with the following scopes
    - [API token scopes](#api-token-scopes). Check how to create a Dynatrace API token [here](https://docs.dynatrace.com/docs/dynatrace-api/basics/dynatrace-api-authentication#create-token)
    - [Oauth client scopes](#oauth-client-scopes). Check how to create an Dynatrace Oauth client [here](https://docs.dynatrace.com/docs/manage/identity-access-management/access-tokens-and-oauth-clients/oauth-clients)

  8. Add the following variables the the terraform.tfvars
    ```hcl
    azure_location          = "" # azure location where you want to provision the resources
    azure_subscription_id   = "" # azure subscription id in which subcsription you want to provision the resources
    ```

  9. (Optional) Check out `variables.tf` for a complete list of variables


  </TabItem>
  <TabItem value="GCP" label="GCP">
    GCP
  </TabItem>
  <TabItem value="Local" label="Local">
    Local
  </TabItem>
</Tabs>