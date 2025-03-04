---
sidebar_position: 3
---

# 3. Enable Use Case

Build content within your ACE-Box.

## Set Up Your First Use Case

### Access Your ACE-Box Instance

1. Within your `terraform/<your_cloud_provider>` folder, run the following command to retrieve the output of the ACE-Box:

    ```bash
    terraform output
    ```

    You should see an output similar to this:

    ```bash
    acebox_dashboard = "http://dashboard.34.172.176.13.nip.io"
    acebox_ip = "connect using: ssh -i ./key ace@34.172.176.13"
    comment = "More information about dashboard credentials is printed out as part of the last provisioning step. Please scroll up."
    dashboard_password = <sensitive>
    ```

2. Within your `terraform/<your_cloud_provider>` folder, you should have an SSH key generated that will allow you to SSH into the VM. Using the previous example, you can access it with the following command:

    ```bash
    ssh -i ./key ace@<IP_PLACEHOLDER>
    ```

### Enable Use Case

3. Check if the ACE-CLI has been successfully installed with the following command:

    ```bash
    ace --help
    ```

4. Use the ACE-CLI to install the use case:

    ```bash
    ace enable https://github.com/dynatrace-ace/basic-dt-demo.git
    ```

    > **Note:** You can also define the use case in your `terraform.tfvars` to automatically deploy it after the ACE-Box gets deployed.

5. Check the provisioning output. It should look like this, without any `failed` steps:

    ```bash
    PLAY RECAP **********************************************************************************************
    localhost                  : ok=28   changed=4    unreachable=0    failed=0    skipped=10   rescued=0    ignored=2
    ```

## ACE-Box with Use Case Ready!

Well done! Your ACE-Box now has a Use Case embedded in it!