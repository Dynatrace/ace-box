---
sidebar_position: 2
---

# 2. Install

Deploy your ACE-Box instance.

## Deploy

> **Note:** If you're deploying your ACE-Box following the [Own VM](../01_get-started/1_configure.md#configure-cloud-provider) instructions, you can skip this step and move to [Enable Use Case](../01_get-started/3_add_use_case.md). Terraform is only needed for a cloud provider.

1. Verify the configuration and execution plan by running:

    ```bash
    terraform plan
    ```

2. Apply the configuration. This may take a few minutes ☕️:

    ```bash
    terraform apply
    ```

    The result of applying Terraform should be as follows:

    ```log
    Apply complete! Resources: 13 added, 0 changed, 0 destroyed.

    Outputs:

    acebox_dashboard = "http://dashboard.IP_PLACEHOLDER.nip.io"
    acebox_ip = "connect using: ssh -i ./key ace@IP_PLACEHOLDER"
    comment = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
    dashboard_password = <sensitive>
    ```

## ACE-Box Ready!

Well done! The next step is to build a use case within your ACE-Box.