# Automation Certification Environment Provisioning

This repository contains the automation scripts designed for setting up necessary environment required for the certification exam.
It is an external use case based on the [ACE-Box](https://github.com/Dynatrace/ace-box).

## Version and compatibility

Check below table for version and ace-box compatibility information:

| Release | Verified against ace-box version |
| --- | --- |
| 1.0.0 | 1.26.0 |
| 1.0.1 | 1.26.1 |
| 1.1.0 | 1.26.1 |

## Deployed Components

The following components get installed:

| Component | Role | Notes |
| --- | --- | --- |
| microk8s | [microk8s](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/microk8s) | incl. ingress |
| Dynatrace Operator | [dt-operator](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/dt-operator) | |
| EasyTrade | [app-easytrade](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/app-easytrade) | |
| Gitlab | [gitlab](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/gitlab) | |
| Monaco | [monaco](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/monaco-v2) | |
| Ace-Box Dashboard | [dashboard](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/dashboard) | Contains links to all apps |

After provisioning, open the dashboard as per the output and find the links to the demo applications there.

## Resource Requirements

The applications deployed on Kubernetes require **4 CPU Cores** and **16GiB Memory**, according to Dynatrace. Please size your VM accordingly.

## Installation

To deploy an ACE-Box with this external use case enabled, simply provide the following Terraform variables:
 > NOTE: You can create a file with the extension `.tfvars` in the below format.

```
dt_tenant     = "<Dynatrace environment URL, no trailing '/'>"
dt_api_token  = "<Dynatrace API token>"

extra_vars = {
  dt_environment_url_gen3 = "https://<YOUR ENVIRONMENT ID>.live.apps.dynatrace.com" # e.g For live https://<YOUR ENVIRONMENT ID>.apps.dynatrace.com, For dev/sprint "https://<YOUR ENVIRONMENT ID>.<sprint/dev>.apps.dynatracelabs.com"
  dt_oauth_sso_endpoint   = "<Dynatrace OAuth SSO Endpoint>" # e.g. For sprint : "https://sso-sprint.dynatracelabs.com/sso/oauth2/token"
  dt_oauth_client_id      = "<Dynatrace OAuth ClientID>"
  dt_oauth_client_secret  = "<Dynatrace OAuth Client Secret>"
  dt_oauth_account_urn    = "<Dynatrace OAuth Account URN>"
}

use_case      = "https://<your GitHub username>:<your GitHub token>@github.com/dynatrace-ace/ace-box-ext-cert-automation.git"
# if you want to use a git branch, add the branch name at the end in this format:  `.../ace-box-ext-cert-automation.git@<your Git branch name>`
```
#### *Required API Token scopes for `dt_api_token` variable*
Initial API token with scopes below is required to create a new API token with the required scopes for the use case.This token will be used by various roles to manage their own tokens.

- apiTokens.read
- apiTokens.write

#### *Required OAuth scopes for dt_oauth_** *variables*
- settings:objects:read
- settings:objects:write
- app-engine:apps:run (Access to Apps and its actions)
- app-engine:apps:install (Install apps)
- automation:workflows:read (Read access to workflows)
- automation:workflows:write (Write access to workflows)
- automation:workflows:run (Execute permissions for workflows)
- automation:rules:read (Read access to scheduling rules)
- automation:rules:write (Write access to scheduling rules)
- automation:workflows:admin (Admin permission to manage all workflows and executions)

Afterwards run:

```
terraform init
```

Followed by (if you located your variables in a .tfvars file):

```
terraform apply --var-file=<Your Terraform Variables File Name>.tfvars
```

For more detailed installation instructions, please follow the ACE-Box guides for your prefered [cloud provider](https://github.com/Dynatrace/ace-box/tree/dev/terraform).
