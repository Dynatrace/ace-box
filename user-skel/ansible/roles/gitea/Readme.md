# Gitea

This currated role can be used to install Gitea (a git based code hosting solution) on a Kubernetes cluster.
It also has embedded tasks to create an organization and repository on Gitea.

For the details, please check this link: https://gitea.io/en-us/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```

### Deploying Gitea

The main task deploys Gitea on a Kubernetes cluster with the default variables set.
Once the deployment is completed, it creates the service endpoint and an admin secret, then sources the following variables:

- `gitea_internal_endpoint`
- `gitea_username`
- `gitea_password`
- `gitea_access_token`

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
This task creates Gitea admin secret and sources the following variables:
- `gitea_domain`
- `gitea_username`
- `gitea_password`
- `gitea_access_token`

```yaml
- include_role:
    name: gitea
    tasks_from: create-secret
```

#### "source-secret" 
This task fetches the admin secret and sources the following variables:
- `gitea_username`
- `gitea_password`
- `gitea_access_token`

```yaml
- include_role:
    name: gitea
    tasks_from: source-secret
```

#### "source-endpoints" 
This task fetches the internal service endpoint and sources the following variables:
- `gitea_internal_endpoint`

```yaml
- include_role:
    name: gitea
    tasks_from: source-endpoints
```

#### "create-organization" 
This task creates an organization on Gitea with the name defined under "gitea_org" variable

```yaml
- include_role:
    name: gitea
    tasks_from: create-organization
  vars:
    gitea_org: "<gitea org name>" # specify a Gitea organization name to be created
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
```

#### "uninstall" 
This task uninstalls Gitea via helm

```yaml
- include_role:
    name: gitea
    tasks_from: uninstall
```
