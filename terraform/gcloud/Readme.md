# GCP

## Requirements

Terraform needs to be locally installed.
A GCP account is needed.

## Instructions for GCP

1. Make sure you're authenticated to use GCP. The easiest way is through the `gcloud` CLI:

    ```
    gcloud auth application-default login
    ```

    More info as well as alternative options can be found in the [Terraform provider docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs/guides/provider_reference#authentication)

2. Navigate to the `terraform/gcloud` folder

    ```bash
    $ cd terraform/gcloud
    ```

3. Initialize terraform

    ```bash
    $ terraform init
    ```

4. Create a `terraform.tfvars` file inside the *terraform/gcloud* folder
   It needs to contain the following as a minimum:

    ```hcl
    gcloud_project    = "myGCPProject" # GCP Project you want to use
    gcloud_zone       = "europe-west1-b" # zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
    ```

    Check out `variables.tf` for a complete list of variables

5. Verify the configuration by running `terraform plan`

    ```bash
    $ terraform plan
    ```

6. Apply the configuration

    ```bash
    $ terraform apply
    ```

## Send OpenTelemetry Traces to Dynatrace

It is possible to leverage the [Ansible OpenTelemetry callback plugin](https://docs.ansible.com/ansible/latest/collections/community/general/opentelemetry_callback.html) to send Traces to the Dynatraces API.

The following variable need to be set to enable it:

```hcl
otel_export_enable = true
```

> Note: The traces will be sent to the `dt_tenant/api/v2/otlp` endpoint
> Note: The api token specified in the `dt_api_token` variable needs to have the additional `openTelemetryTrace.ingest` scope 

## Custom domain support

This terraform script supports the use of custom domains via Cloud DNS.

1. Ensure your service account can create DNS records in the target Cloud DNS managed zone.

1. Add the following values to the `terraform.tfvars` file:

    ```hcl
    gcloud_project    = "myGCPProject" # GCP Project you want to use
    gcloud_zone       = "europe-west1-b" # zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
    custom_domain     = "acebox.example.com" # Set to override default domain (ip_address.xip.io)
    managed_zone_name = "example.com" # Name of Cloud DNS managed zone
    ```

## Useful Terraform Commands


Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL.|
`terraform output -json` | Shows Terraform outputs in clear text json. This command might be useful to show the dashboard password. |

