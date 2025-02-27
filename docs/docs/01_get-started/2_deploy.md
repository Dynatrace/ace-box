---
sidebar_position: 2
---

# 2. Install

Deploy your ACE-Box instance

## Deploy

After completing the [1. Configure](../01_get-started/1_configure.md) piece, now you are ready to deploy an instance of the ACE-Box

> Note: if you're deploying your ACE-Box following the [Own VM](../01_get-started/1_configure.md#configure-cloud-provider), you can skip this step and move to [Enable Use Case](../01_get-started/3_add_use_case.md). Terraform is needed just for a cloud provider

1. Verify the configuration and execution plan by running `terraform plan`

```bash
terraform plan
```

2. Apply the configuration. This make take a few minutes ☕️

```bash
terraform apply
```

The result of applying terraform should be as follows:

```log
Apply complete! Resources: 13 added, 0 changed, 0 destroyed.

Outputs:

acebox_dashboard = "http://dashboard.IP_PLACEHOLDER.nip.io"
acebox_ip = "connect using: ssh -i ./key ace@IP_PLACEHOLDER"
comment = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
dashboard_password = <sensitive>
```

## ACE-Box ready!

Well done, next step is to build a use case wihin your ACE-Box