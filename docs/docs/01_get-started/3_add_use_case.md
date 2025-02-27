---
sidebar_position: 3
---

# 3. Enable an Use Case

Deploy set of curated roles, composing an use case.

## What is an use case?

A use case in software refers to a detailed description of how users interact with a system to achieve a specific goal. It outlines the steps involved in completing a task and helps to illustrate the functional requirements of the software.

Discover Dynatrace use cases in our [documentation](https://docs.dynatrace.com/docs/discover-dynatrace/use-cases)

## Setup your first use case

### Access your ACE-Box instance

1. Within your `terraform/<your_cloud_provider>` folder, run the following command to retrieve the output of the ACE-Box:

```bash
terraform output
```

As the output, you should see something similar to this:

```bash
acebox_dashboard = "http://dashboard.34.172.176.13.nip.io"
acebox_ip = "connect using: ssh -i ./key ace@34.172.176.13"
comment = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
dashboard_password = <sensitive>
```

2. Within your `terraform/<your_cloud_provider>` folder, you should have a SSH key generated that will allow you to SSH into the VM. Following the previous example, you could access with the following command:

```bash
ssh -i ./key ace@<IP_PLACEHOLDER>
```

### Enable use case

3. Check if the ACE-CLI has been successfully installed with the following command:

```bash
ace --help
```

4. Use the ACE-CLI to install the use case:

```bash
ace enable https://github.com/dynatrace-ace/basic-dt-demo.git
```

> Note: you can also define the use case in your `terraform.tfvars` to automatically deploy it after the ACE-Box gets deployed. More info [here](../02_use-cases/1_dynatrace_basic_observability.md)

5. Check the provisioning output, it should as follows, without `failed` steps:

```bash
PLAY RECAP **********************************************************************************************
localhost                  : ok=28   changed=4    unreachable=0    failed=0    skipped=10   rescued=0    ignored=2
```

Well done, your ACE-Box now has a Use Case embedded on it!