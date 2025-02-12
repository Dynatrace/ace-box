# Gitlab

This currated role can be used to install Gitlab (an open source code repository and collaborative software development platform) on a Kubernetes cluster.
It also has embedded tasks to create an organization and repository on Gitlab.

For the details, please check this link: https://docs.gitlab.com/charts/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```

## Deploying Gitlab

The main task deploys Gitlab on a Kubernetes cluster with the default variables set. 

Once the deployment is completed, it creates the service endpoint, admin secret and a Gitlab group to be sourced into the following variables:
- `gitlab_internal_endpoint`
- `gitlab_username`
- `gitlab_username`
- `gitlab_oauth_token`
- `gitlab_group_id`

Furthermore, it uses the following attributes to be used as Gitlab variables in the Gitlab CI pipeline.
> Note: If your use case requires CA/Keptn and Synthetic-enabled private ActiveGate, they must be deployed beforehand to be used as Gitlab variables.
- `ca_endpoint` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `ca_bridge` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `ca_api_token` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `dt_synthetic_node_id` # Synthetic-enabled private ActiveGate ID if exists

```yaml
- include_role:
    name: gitlab
```

Variables that can be set are as follows:

```yaml
---
gitlab_username: "root"
gitlab_namespace: "gitlab"
gitlab_group_name: "demo"
feature_gitlab: false
gitlab_helm_chart_version: "6.1.2"
gitlab_domain: "gitlab.{{ ingress_domain }}"
gitlab_gcpe_helm_chart_version: "0.2.15"
gitlab_gcpe_tag: "v0.5.3"
gitlab_root_creds_secret_name: "ace-gitlab-initial-root-password"
```

## Other Tasks in the Role

### source-endpoints
This task fetches the internal service endpoint and sources the following variables:
- `gitlab_internal_endpoint`

```yaml
- include_role:
    name: gitlab
    tasks_from: source-endpoints
```

### source-endpoints-external
This task fetches the external endpoint and sources the following variables:
- `gitlab_external_endpoint`
  
```yaml
- include_role:
    name: gitlab
    tasks_from: source-endpoints-external
```

### configure-demo-group
This task creates a default demo group and adds relevant ACE-Box secrets such as Dynatrace environment URL, Dynatrace Synthetic node ID to be used in GitLab pipelines.

```yaml
- include_role:
    name: gitlab
    tasks_from: configure
```

Attention: For ACE-Box versions > 

### deploy-gcpe
This task deploys gcpe (gitlab-ci-pipelines-exporter) under the gitlab namespace.

Note: gitlab-ci-pipelines-exporter allows you to monitor your GitLab CI pipelines with Prometheus or any monitoring solution supporting the OpenMetrics format.

For the details: https://github.com/mvisonneau/gitlab-ci-pipelines-exporter


```yaml
- include_role:
    name: gitlab
    tasks_from: deploy-gcpe
```

### source-secret
This task fetches the admin secret and sources the following variables:
- `gitlab_username`
- `gitlab_password`
- `gitlab_oauth_token`

```yaml
- include_role:
    name: gitlab
    tasks_from: source-secret
```
### ensure-user
This task creates a user in the gitlab instance with the folowing variables:
- `gitlab_user_id`

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-user
  vars:
    gitlab_user_email: "john@dynatrace.test"
    gitlab_user_name: "John Doe"
-   gitlab_user_username: "johndoe"
-   gitlab_user_password: "somethingrandom"
```
Password must be 8 characters or longer and include special characters.

### ensure-group
This task creates a group if not exists and sources the following variables:
- `gitlab_group_name`
- `gitlab_group_id`

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-group
  vars:
    gitlab_group_name: "<gitlab group name>" # specify a Gitlab group name to be created
```

### ensure-group-var
This task creates a group variable in key/value format

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-group-var
  vars:
    gitlab_group_id: "<gitlab group id>" # set a Gitlab group ID that was created in "ensure-group" task 
    gitlab_var_key: "<a gitlab variable key>" # specify a Gitlab variable key to be created
    gitlab_var_value: "<a gitlab variable value>" # specify a Gitlab variable value to be created
```

### ensure-project
This task creates a project under a group if not exists and sources the following variables:
- `gitlab_prj`
- `gitlab_project_id`

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-project
  vars:
    gitlab_prj: "<gitlab repo name>"
    gitlab_prj_namespace_id: "<gitlab group id>"
```

### uninstall
This task uninstalls Gitlab and GCPE via Helm

```yaml
- include_role:
    name: gitlab
    tasks_from: uninstall
```

### ensure-application

Creates a new GitLab OAuth Application if no existing one found. Task persists the `gitlab_application_client_id` fact, which is leveraged to determine whether a new application shall be deployed. As this is a global fact, only one GitLab OAuth Application can currently be deployed per ACE-Box.

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-application
  vars:
    gitlab_application_name: "<name, helps you indentify your application in GitLab>"
    gitlab_application_redirect_uri: "<redirect URL, e.g. '{{ ingress_protocol }}://backstage.{{ ingress_domain }}/api/auth/gitlab/handler/frame'>"
    gitlab_application_scopes: "<application allowed scopes, e.g. 'read_user read_repository write_repository openid profile email'>"
```

Sets facts:
- gitlab_application_client_id
