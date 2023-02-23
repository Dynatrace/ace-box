# AWX

This currated role can be used to install AWX on a Kubernetes environment.

For the details, please check this link: https://github.com/ansible/awx

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```

### Deploying AWX

The main task deploys awx on a kubernetes cluster with the variables defined in "defaults" folder. It will also create the secrets containing credentials.

```yaml
- include_role:
    name: awx
```

Variables that can be set are as follows:

```yaml
---
awx_namespace: "awx" # namespace where AWX will be deployed in
awx_helm_chart_version: "3.4.2" # version of the AWX helm chart
awx_version: "17.1.0" # AWX version to deploy
awx_ingress_domain: "awx.{{ ingress_domain }}" # domain where AWX will be available
awx_secret_key_secret_name: "awx-secret-key" # secrets that get created using installation time - no need to change
awx_admin_creds_secret_name: "awx-admin-creds" # secrets that get created using installation time - no need to change
awx_admin_user : "dynatrace" # credentials used for AWX admin account
```

### Other Tasks in the Role

#### "create-secret" 
This task creates the secrets needed to operate AWX.
> Note: these secrets get created during installation of AWX. If it is needed to create the secrets separately prior to installation, this task can be leveraged for that.

```yaml
- include_role:
    name: awx
    tasks_from: create-secret
```

#### "source-secrets" 
This task fetches the credentials for AWX ans stores them in the following variables:
- `awx_admin_username`
- `awx_admin_password`

```yaml
- include_role:
    name: awx
    tasks_from: source-secret
```

#### "source-configuration" 
This task fetches configuration details and stores them in the following variables:
- `awx_internal_endpoint`: The internal endpoint for awx in the format of [http://awx-service-ip:8080]. You can leverage this endpoint to reach AWX without having to go via the outside-in
- `awx_external_endpoint`: The externally available endpoint for AWX in the format of [protocol]://awx-domain (e.g.: http://awx.myaceboxdomain.com)
- `awx_namespace`: the namespace that AWX is deployed in

```yaml
- include_role:
    name: awx
    tasks_from: source-configuration
```

#### "uninstall" 
This task uninstalls gitea via helm

```yaml
- include_role:
    name: awx
    tasks_from: uninstall
```
