---
sidebar_position: 2
---

# 2. Deploy

Deploy (or destroy) it

After completing the [1. Configure](../01_get-started/1_configure.md) piece, now you are ready to deploy an instance of the ACE-Box

1. Verify the configuration and execution plan by running `terraform plan`

```bash
terraform plan
```

2. Apply the configuration. This make take a few minutes ☕️

```bash
terraform apply
```

## Other Useful commands

Command  | Result
-------- | -------
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform destroy` | delete your ACE-Box |
`terraform output` | shows terraform outputs, such as the command to connect to the ACE-Box |
`terraform workspace list/new/select/delete` | [workspaces](https://developer.hashicorp.com/terraform/cli/workspaces) will allow you to have multiple ACE-Box instances defined. Use carefully! |