# gitea

This currated role can be used to install gitea (a git based code hosting solution) on a kubernetes cluster.
It also has embedded tasks to create an organization and repository on gitea.

For the details, please check this link: https://gitea.io/en-us/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```

### Deploying Gitea

The main task deploys gitea on a kubernetes cluster with the variables set in "defaults" folder. It creates a secret that includes username and password. 

```yaml
- include_role:
    name: gitea
```

Variables that can be set are as follows:

```yaml
---
gitea_version: "1.17.2"
gitea_domain: "gitea.{{ ingress_domain }}"
gitea_username: "username"
gitea_password: "password"
gitea_email: "ace@dynatrace.com"
gitea_namespace: "gitea"
gitea_helm_chart_version: "4.1.1"
```

### Other Tasks in the Role

#### "create-secret" 
This task creates a secret that includes gitea username and password

```yaml
- include_role:
    name: gitea
    tasks_from: create-secret
  vars:
    gitea_username: "<gitea user name>"
    gitea_password: "<gitea password>"
    gitea_domain: "<gitea domain>"
    gitea_access_token: "<gitea access token>"
```

#### "source-secret" 
This task fetches the username (variable name: "gitea_username"), password (variable name: "gitea_password") and access token (variable name: "gitea_access_token") information from a secret created during gitea installation

```yaml
- include_role:
    name: gitea
    tasks_from: source-secret
```

#### "source-endpoints" 
This task fetches the internal endpoint (variable name: "gitea_internal_endpoint") for the gitea service.

```yaml
- include_role:
    name: gitea
    tasks_from: source-endpoints
```

#### "create-organization" 
This task creates an organization on gitea with the name defined under "gitea_org" variable

```yaml
- include_role:
    name: gitea
    tasks_from: create-organization
  vars:
    gitea_org: "<gitea org name>" # specify a gitea organization name to be created
    gitea_internal_endpoint: "<gitea internal endpoint>"
    gitea_access_token: "<gitea oauth token>"
```

#### "create-repository" 
This task creates a repository under an organization

```yaml
- include_role:
    name: gitea
    tasks_from: create-repository
  vars:
    gitea_org: "<gitea org name>"
    gitea_repo: "<gitea repository name>"
    gitea_internal_endpoint: "<gitea internal endpoint>"
    gitea_access_token: "<gitea oauth token>"
```

#### "uninstall" 
This task uninstalls gitea via helm

```yaml
- include_role:
    name: gitea
    tasks_from: uninstall
```