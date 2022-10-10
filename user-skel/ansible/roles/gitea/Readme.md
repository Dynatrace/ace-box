# gitea

This currated role can be used to install gitea (a git based code hosting solution) on a kubernetes cluster.
It also has embedded tasks to create an organization and repository on gitea.

## Using the role

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

"create-secret" task creates a secret that includes gitea username and password

```yaml
- include_role:
    name: gitea
    tasks_from: create-secret
```

"source-secret" task fetches the username, password information from a secret created during gitea installation

```yaml
- include_role:
    name: gitea
    tasks_from: source-secret
```

"source-endpoints" task fetches the internal endpoint for the gitea service

```yaml
- include_role:
    name: gitea
    tasks_from: source-endpoints
```

"create-organization" task creates an organization on gitea

```yaml
- include_role:
    name: gitea
    tasks_from: create-organization
```

"create-repository" task creates a repository under an organization

```yaml
- include_role:
    name: gitea
    tasks_from: create-repository
```

"uninstall" task uninstalls gitea via helm

```yaml
- include_role:
    name: gitea
    tasks_from: uninstall
```