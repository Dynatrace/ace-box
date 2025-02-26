---
sidebar_position: 1
---

# 1. Configure

Prepare terraform, cloud provider & authentication

**Notes**

> This product is not officially supported by Dynatrace.

> The ACE-Box has been developed and is being actively maintained by the Innovation Services team at Dynatrace. For queries or logging of problems, please use [GitHub Issues](https://github.com/Dynatrace/ace-box/issues).


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Pre-requisites
- Terraform CLI (0.14.9+) installed
- Dynatrace tenant

## Clone repo

1. Clone the [ACE-Box repository](https://github.com/Dynatrace/ace-box)
    
    ```bash
    git clone https://github.com/Dynatrace/ace-box.git
    ```

## Configure cloud provider

2. Pick the cloud provider of your preference. The ACE-Box will get deployed in a standard compute resource (VM).

<Tabs>
  <TabItem value="AWS" label="AWS" default>

  ### AWS Requirements
  - AWS Account
  - AWS CLI (AWS SDK) installed
  - AWS Account credentials (Usually set up and sourced by AWS SDK)

  ### AWS Deployment

  3. Move to the AWS folder
    
      ```bash
      cd terraform/aws/
      ```

  4. Configure the AWS CLI from your terminal. Follow the prompts to input your AWS Access Key ID and Secret Access Key.
    
      ```bash
      aws configure
      ```

      > Note: the configuration process stores your credentials in a file at `~/.aws/credentials` on MacOS and Linux, or `%UserProfile%\.aws\credentials` on Windows.

  </TabItem>
  
  <TabItem value="Azure" label="Azure">
    
    ### Azure Requirements

    - Azure Account
    - Azure CLI

    ### Azure Deployment

    3. Move to the Azure folder

        ```bash
        $ cd terraform/azure
        ```

    4. Sign in to the correct subscription using the az cli

        ```bash
        $ az login
        ```

      > Note: if you have multiple subscriptions, you will have to set the default one using `az account set --subscription YOURSUBSCRIPTION`

  </TabItem>
  <TabItem value="GCP" label="GCP">
    
    ### GCP Requirements

    - GCP account

    ### GCP Deployment

    3. Move to the GCP folder

        ```bash
        $ cd terraform/gcloud
        ```

    4. Make sure you're authenticated to use GCP. The easiest way is through the `gcloud` CLI:

        ```
        gcloud auth application-default login
        ```

        > Note: More info as well as alternative options can be found in the [Terraform provider docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#authentication)


  </TabItem>
  <TabItem value="Own VM" label="Own VM">
    
    > Note: we recommend you to deploy the ACE-Box in any of the cloud providers (AWS, Azure or GCP). Bringing your own Ubuntu VM has not been tested, but should be possible:

    ### Own VM Requirements
    - An `Ubuntu 20.04` virtual machine (`Ubuntu 20.04 LTS` "minimal" tested)
    - Repository cloned to VM
    - At least `16GB RAM` and `8-cores CPU`
    - A public IP address
    - Port 80 and/or 443 exposed
    - A non-root user to run the script actions needs to be created (e.g. `ace`)

    ### Own VM Deployment
    
    3. Run initialization script. This will install all necessary dependencies including the [ACE-CLI](../05_more/1_ACE-CLI.md).
        ```
        $ cd user-skel
        $ ./init.sh
        ```
    
    4. Prepare the ACE-Box by running the [ACE-CLI](../05_more/1_ACE-CLI.md) and providing required values when prompted:
        ```
        $ ace prepare
        ```
    
    :::note

    When bringing your `Own VM` you don't have to deploy anything with terraform, so you can skip the `Initialize Terraform` and `2. Deploy`, and jump straight to [Enable Use Case](../01_get-started/3_add_use_case.md)
    
    :::

  </TabItem>
</Tabs>

## Initialize Terraform

5. Using the following command

    ```bash
    terraform init
    ```

## Configure `terraform.tfvars`

6. Still under the `terraform/<your_cloud_provider>` folder, create a `terraform.tfvars` with the following structure (next step will guide you on how to fill the placeholders)

    ```conf
    dt_tenant = "https://<tenant_id>.live.dynatrace.com" 
    dt_api_token = "<dt_api_token>"
    extra_vars = {
      dt_environment_url_gen3 = "https://<tenant_id>.apps.dynatrace.com" 
      dt_oauth_sso_endpoint   = "https://sso.dynatrace.com/sso/oauth2/token"
      dt_oauth_client_id = "<client_id>"
      dt_oauth_client_secret = "<client_secret>"
      dt_oauth_account_urn = "urn:dtaccount:<id>"
    }
    ```

  7. Create the respective Dynatrace tokens, with the following scopes. Then add them into the placeholders within your `terraform.tfvars`
      - [dt_api_token](../05_more/5_dt_tokens_scopes.md#how-to-create-dt_api_token). 
      - [dt_oauth_client_secret](../05_more/5_dt_tokens_scopes.md#how-to-create-dt_oauth_client_secret). 
  
      > Note: It is recommended to set the sensitive variables as environment variables. More information in the terraform documentation [here](https://developer.hashicorp.com/terraform/language/values/variables#environment-variables)

  8. Configure cloud provider specific variables in case needed, adding them to the `terraform.tfvars`

<Tabs>
  <TabItem value="AWS" label="AWS" default>
    No extra variables needed for AWS :)
 </TabItem>
 <TabItem value="Azure" label="Azure"> 
    ```hcl
    azure_location          = "" # azure location where you want to provision the resources
    azure_subscription_id   = "" # azure subscription id in which subcsription you want to provision the resources
    ```
  </TabItem>
  <TabItem value="GCP" label="GCP">
    ```hcl
    gcloud_project    = "<your-gcloud-project>" # GCP Project you want to use
    gcloud_zone       = "<your-gcloud-zone>" # zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
    ```
  </TabItem>
</Tabs>

## (Optional) additional variables

Check out `variables.tf` for a complete list of variables. For example, for AWS, you can add the following [AWS additional variables](../05_more/4_aws_variables_breakdown.md) to the `terraform.tfvars` config file. If you don't add them, they are configured with a default value, there are not mandatory. 

## Configuration ready!

Well done, next step is to apply the configuration and deploy the ACE-Box