---
sidebar_position: 2
---

# Destroy & useful commands

## Destroy your ACE-Box


```bash
terraform destroy
```

## Other useful commands

view a speculative destroy plan, to see what the effect of destroying would be 

```bash
terraform plan -destroy
```

shows terraform outputs, such as the command to connect to the ACE-Box

```bash
terraform output
```

[workspaces](https://developer.hashicorp.com/terraform/cli/workspaces) will allow you to have multiple ACE-Box instances defined. Use carefully!

```bash
terraform workspace list/new/select/delete
```

Go back to your ACE-Box [management page](../01_get-started/4_manage.md)