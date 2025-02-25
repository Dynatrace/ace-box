---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Advanced config

## (Optional) Custom domain support

<Tabs>
  <TabItem value="AWS" label="AWS" default>
  This terraform script supports the use of custom domains via Route53.

  1. Ensure your access key can create dns records in the target Route53 zone.

  2. Add the following values to the `terraform.tfvars` file:

      ```hcl
      aws_region = "" # AWS Region to deploy infrastructure to
      custom_domain = "" # Set to override default domain (ip_address.xip.io)
      route53_zone_name = "" # Name of route53 zone (defaults to public zones)
      ```
 </TabItem>
 <TabItem value="Azure" label="Azure">
  This terraform script supports the use of custom domains via Azure DNS.

  1. Ensure your account can create DNS records in the target Azure DNS zone.

  2. Add the following values to the `terraform.tfvars` file:

    ```hcl
    azure_location    = "" # azure location where you want to provision the resources
    custom_domain     = "acebox.example.com" # Set to override default domain (ip_address.xip.io)
    dns_zone_name     = "example.com" # Name of Azure DNS zone
    ```
  </TabItem>
  <TabItem value="GCP" label="GCP">
    This terraform script supports the use of custom domains via Cloud DNS.

    1. Ensure your service account can create DNS records in the target Cloud DNS managed zone.

    2. Add the following values to the `terraform.tfvars` file:

        ```hcl
        gcloud_project    = "myGCPProject" # GCP Project you want to use
        gcloud_zone       = "europe-west1-b" # zone where you want to provision the resources. Check out https://cloud.google.com/compute/docs/regions-zones#available for available zones
        custom_domain     = "acebox.example.com" # Set to override default domain (ip_address.xip.io)
        managed_zone_name = "example.com" # Name of Cloud DNS managed zone
        ```
  </TabItem>
</Tabs>

## (Optional) Send OpenTelemetry Traces to Dynatrace

> Note: same for all cloud providers

It is possible to leverage the [Ansible OpenTelemetry callback plugin](https://docs.ansible.com/ansible/latest/collections/community/general/opentelemetry_callback.html) to send Traces to the Dynatraces API.

The following variable need to be set to enable it:

```hcl
otel_export_enable = true
```

> Note: The traces will be sent to the `dt_tenant/api/v2/otlp` endpoint
> Note: The api token specified in the `dt_api_token` variable needs to have the additional `openTelemetryTrace.ingest` scope
