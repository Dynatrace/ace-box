---
sidebar_position: 1
---

# 1. Configure

Prepare Terraform, cloud provider, and authentication.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Pre-requisites
- Terraform CLI (0.14.9+) installed
- Dynatrace tenant

## Clone Repository

1. Clone the [ACE-Box repository](https://github.com/Dynatrace/ace-box):

    ```bash
    git clone https://github.com/Dynatrace/ace-box.git
    ```

## Configure Cloud Provider

2. Choose your preferred cloud provider. The ACE-Box will be deployed on a standard compute resource (VM).

<Tabs>
  <TabItem value="AWS" label="AWS" default>

  ### AWS Requirements
  - AWS Account
  - AWS CLI (AWS SDK) installed
  - AWS Account credentials (usually set up and sourced by AWS SDK)

  ### AWS Deployment

  3. Navigate to the AWS folder:

      ```bash
      cd terraform/aws/
      ```

  4. Configure the AWS CLI from your terminal. Follow the prompts to input your AWS Access Key ID and Secret Access Key:

      ```bash
      aws configure
      ```

      > **Note:** The configuration process stores your credentials in a file at `~/.aws/credentials` on macOS and Linux, or `%UserProfile%\.aws\credentials` on Windows.

  </TabItem>
  
  <TabItem value="Azure" label="Azure">
    
    ### Azure Requirements

    - Azure Account
    - Azure CLI

    ### Azure Deployment

    3. Navigate to the Azure folder:

        ```bash
        cd terraform/azure
        ```

    4. Sign in to the correct subscription using the Azure CLI:

        ```bash
        az login
        ```

      > **Note:** If you have multiple subscriptions, set the default one using `az account set --subscription YOURSUBSCRIPTION`.

  </TabItem>
  <TabItem value="GCP" label="GCP">
    
    ### GCP Requirements

    - GCP Account

    ### GCP Deployment

    3. Navigate to the GCP folder:

        ```bash
        cd terraform/gcloud
        ```

    4. Ensure you're authenticated to use GCP. The easiest way is through the `gcloud` CLI:

        ```bash
        gcloud auth application-default login
        ```

        > **Note:** More information and alternative options can be found in the [Terraform provider docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#authentication).

  </TabItem>
  <TabItem value="Own VM" label="Own VM">
    
    > **Note:** We recommend deploying the ACE-Box on one of the cloud providers (AWS, Azure, or GCP). Bringing your own Ubuntu VM has not been tested but should be possible.

    ### Own VM Requirements
    - An `Ubuntu 20.04` virtual machine (`Ubuntu 20.04 LTS` "minimal" tested)
    - Repository cloned to VM
    - At least `16GB RAM` and `8-cores CPU`
    - A public IP address
    - Ports 80 and/or 443 exposed
    - A non-root user to run the script actions (e.g., `ace`)

    ### Own VM Deployment
    
    3. Run the initialization script. This will install all necessary dependencies, including the ACE-CLI:

        ```bash
        cd user-skel
        ./init.sh
        ```
    
    4. Prepare the ACE-Box by running the [ACE-CLI](../05_more/1_ACE-CLI.md) and providing the required values when prompted:

        ```bash
        ace prepare
        ```
    
    :::note

    When bringing your `Own VM`, you don't need to deploy anything with Terraform. You can skip the `Initialize Terraform` and `2. Deploy` steps and jump straight to [Enable Use Case](../01_get-started/3_add_use_case.md).
    
    :::

  </TabItem>
</Tabs>

## Initialize Terraform

5. Initialize Terraform using the following command:

    ```bash
    terraform init
    ```

## Configure `terraform.tfvars`

6. In the `terraform/<your_cloud_provider>` folder, create a `terraform.tfvars` file with the following structure (the next step will guide you on how to fill the placeholders):

    ```hcl
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

7. Create the respective Dynatrace tokens with the following scopes for each: [dt_api_token](../05_more/5_dt_tokens_scopes.md#how-to-create-dt_api_token) & [dt_oauth_client_secret](../05_more/5_dt_tokens_scopes.md#how-to-create-dt_oauth_client_secret). Then add them into the placeholders within your `terraform.tfvars`.
 
      > **Note:** It is recommended to set sensitive variables as environment variables. More information can be found in the Terraform documentation here.

8. Configure cloud provider-specific variables if needed, adding them to the `terraform.tfvars`.

<Tabs>
  <TabItem value="AWS" label="AWS" default>
    No extra variables needed for AWS. 🙂
  </TabItem>
  <TabItem value="Azure" label="Azure"> 
    ```hcl
    azure_location          = "" # Azure location where you want to provision the resources
    azure_subscription_id   = "" # Azure subscription ID in which you want to provision the resources
    ```
  </TabItem>
  <TabItem value="GCP" label="GCP">
    ```hcl
    gcloud_project    = "<your-gcloud-project>" # GCP Project you want to use
    gcloud_zone       = "<your-gcloud-zone>" # Zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
    ```
  </TabItem>
</Tabs>

## Configuration Ready!

Well done! The next step is to apply the configuration and deploy the ACE-Box.