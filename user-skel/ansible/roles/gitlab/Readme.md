# gitlab

This currated role can be used to install gitlab (an open source code repository and collaborative software development platform) on a kubernetes cluster.
It also has embedded tasks to create an organization and repository on gitlab.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Gitlab

The main task deploys gitlab on a kubernetes cluster with the variables set in "defaults" folder. It creates a secret that includes username and password. 

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
```

### Other Tasks in the Role

#### "source-endpoints" 
This task fetches the internal endpoint for the gitlab service

```yaml
- include_role:
    name: gitlab
    tasks_from: source-endpoints
```

#### "source-endpoints-external" 
This task fetches the external endpoint for the gitlab service

```yaml
- include_role:
    name: gitlab
    tasks_from: source-endpoints-external
```

#### "configure" 
This task sources Keptn, Cloud Automation secrets and Dynatrace Synthetic node ID (if they exists) to set Gitlab variables to be used for the relevant pipelines.

```yaml
- include_role:
    name: gitlab
    tasks_from: configure
```

#### "deploy-gcpe" 
This task deploys gcpe (gitlab-ci-pipelines-exporter) under the gitlab namespace.

Note: gitlab-ci-pipelines-exporter allows you to monitor your GitLab CI pipelines with Prometheus or any monitoring solution supporting the OpenMetrics format.

For the details: https://github.com/mvisonneau/gitlab-ci-pipelines-exporter


```yaml
- include_role:
    name: gitlab
    tasks_from: deploy-gcpe
```

#### "source-secret" 
This task sources the "gitlab-initial-root-password" information from a secret created during gitlab installation. It then generates an oauth token to be used to connect to the Gitlab service.

```yaml
- include_role:
    name: gitlab
    tasks_from: source-secret
```

#### "ensure-group" 
This task creates a group if not exists with the name defined under "gitlab_group_name" variable

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-group
  vars:
    gitlab_group_name: "<gitlab group name>" # specify a gitlab group name to be created
```

#### "ensure-group-var" 
This task creates a group variable in key/value format

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-group-var
  vars:
    gitlab_group_id: "<gitlab group id>" # set a gitlab group ID that was created in "ensure-group" task 
    gitlab_var_key: "<a gitlab variable key>" # specify a gitlab variable key to be created
    gitlab_var_value: "<a gitlab variable value>" # specify a gitlab variable value to be created
```

#### "ensure-project" 
This task creates a project under a group if not exists

```yaml
- include_role:
    name: gitlab
    tasks_from: ensure-project
  vars:
    gitlab_prj: "<gitlab repo name>"
    gitlab_prj_namespace_id: "<gitlab group id>"
```

#### "uninstall" 
This task uninstalls gitlab and gcpe via helm

```yaml
- include_role:
    name: gitlab
    tasks_from: uninstall
```
