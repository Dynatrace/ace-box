# Azure

## Requirements

- Terraform needs to be locally installed.
- An Azure account is needed.
- Azure CLI.

## Instructions for Azure

1. Sign in to the correct subscription using the az cli

    ```bash
    $ az login
    ```

    > Note: if you have multiple subscriptions, you will have to set the default one using `az account set --subscription YOURSUBSCRIPTION`

2. Navigate to the `terraform` azure folder

    ```bash
    $ cd terraform/azure
    ```

3. Initialize terraform

    ```bash
    $ terraform init
    ```

4. Create a `terraform.tfvars` file inside the *terraform* folder
   It needs to contain the following as a minimum:

    ```hcl
    azure_location          = "" # azure location where you want to provision the resources
    azure_subscription_id   = "" # azure subscription id in which subcsription you want to provision the resources
    ```

    Check out `variables.tf` for a complete list of variables

5. Verify the configuration and execution plan by running `terraform plan`

    ```bash
    $ terraform plan
    ```

6. Apply the configuration

    ```bash
    $ terraform apply
    ```


## Custom domain support

This terraform script supports the use of custom domains via Azure DNS.

1. Ensure your account can create DNS records in the target Azure DNS zone.

1. Add the following values to the `terraform.tfvars` file:

    ```hcl
    azure_location    = "" # azure location where you want to provision the resources
    custom_domain     = "acebox.example.com" # Set to override default domain (ip_address.xip.io)
    dns_zone_name     = "example.com" # Name of Azure DNS zone
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
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL. 
`terraform output -json` | Shows Terraform outputs in clear text json. This command might be useful to show the dashboard password. |

