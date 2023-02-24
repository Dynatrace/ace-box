# Jenkins

This currated role can be used to install Jenkins on a Kubernetes cluster.

For the details, please check this link: https://www.jenkins.io/doc/book/installing/kubernetes/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Jenkins

The main task deploys Jenkins on a Kubernetes cluster.

Once the deployment is completed, it creates the service endpoint and admin secret to be sourced into the following variables:
- `jenkins_internal_endpoint`
- `jenkins_username`
- `jenkins_password`
- `jenkins_api_token`

Furthermore, it uses the following attributes to be used as Jenkins variables in the Jenkins pipeline.
> Note: If your use case requires gitea as a source code repository, CA/Keptn and Synthetic-enabled private ActiveGate, they must be deployed beforehand to be used as Jenkins variables.
- `gitea_username` # if git_flavor == "GITEA"
- `gitea_password` # if git_flavor == "GITEA"
- `gitea_access_token` # if git_flavor == "GITEA"
- `ca_endpoint` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `ca_bridge` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `ca_api_token` # depends on the cloud_automation_flavor is "KEPTN" or "CLOUD_AUTOMATION"
- `dt_synthetic_node_id` # Synthetic-enabled private ActiveGate ID if exists
- `docker_registry_url` # which was deployed during K8s installation
- `otel_endpoint` # if Open Telemetry was installed


```yaml
- include_role:
    name: jenkins
```

Variables that can be set are as follows:

```yaml
---
jenkins_helm_chart_version: "4.1.17"
jenkins_namespace: "jenkins"
jenkins_version: "2.346.3-2-lts"
jenkins_username: dynatrace
git_org_demo: "demo"
git_repo_demo: "ace"
git_repo_monaco: "monaco"
jenkins_skip_install: False
```

### Other Tasks in the Role

#### "template-values-file" 
This task templates the helm values file depending on your use case requirements. This task has to be executed before the "jenkins" role stated above.

"include_jenkins_value_file" variable specifies where the Jinja template can be found. 

A link to an example Jinja template: https://github.com/Dynatrace/ace-box/blob/dev/user-skel/ansible/roles/demo-quality-gates-jenkins/templates/demo-default-jobs.yml.j2

```yaml
- set_fact:
    include_jenkins_value_file: "{{ role_path }}/templates/<use case name>-jobs.yml.j2" # rename with your use case name

- include_role:
    name: jenkins
    tasks_from: template-values-file
  # (Optional) Depending on your use case, you can set key-value parameters to be used in a Jinja template
  # Below is an example format, you need to update key and value variable names accordingly.
  vars:
    <git_username>: "<a git tool user name>" # set your git tool´s user name
    <git_token>: "<a git tool token>" # set your git tool´s token
    <git_domain>: "<a git tool endpoint>" # set your git endpoint
    
    <usecase_repo>: "<a git repository name>" # set your git repository to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)
    <usecase_org>: "<a git repository organization/group>" # set your git organization to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)
    <usecase_jenkins_folder>: "<a git repository folder>" # set your git repo folder to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)

```

#### "create-secret" 
This task creates the Jenkins admin user and password.
```yaml
- include_role:
    name: jenkins
    tasks_from: create-secret
  vars:
    jenkins_username: "<jenkins user name>"
    jenkins_password: "<jenkins password>"
```

#### "create-token" 
This task generates the Jenkins api token to be added into a secret, then sources the following variables:
- `jenkins_api_token`
  
```yaml
- include_role:
    name: jenkins
    tasks_from: create-token
```

#### "source-endpoints" 
This task fetches the Jenkins internal endpoint and sources the following variables:
- `jenkins_internal_endpoint`

```yaml
- include_role:
    name: jenkins
    tasks_from: source-endpoints
```

#### "source-secret" 
This task fetches the admin secret and admin token, then sources the following variables:
- `jenkins_username`
- `jenkins_password`
- `jenkins_api_token`

```yaml
- include_role:
    name: jenkins
    tasks_from: source-secret
```
