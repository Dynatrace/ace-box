# jenkins

This currated role can be used to install jenkins on a kubernetes cluster.

For the details, please check this link: https://www.jenkins.io/doc/book/installing/kubernetes/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Jenkins

The main task deploys jenkins on a kubernetes cluster. It creates a secret that contains username and password as well as an admin and API token.

```yaml
- include_role:
    name: jenkins
```

Depending on a use case it also sources the below entities during the deployment of jenkins:
- the secrets of Gitea, Keptn or Cloud Automation
- Docker container registry URL
- ActiveGate Node ID if exists
- OpenTelemetry collector endpoint if exists
  
NOTE: If the use case is to leverage gitea as a source code repository, gitea has to be installed before jenkins.
Similarly, if the use case is to leverage cloud automation or keptn, they have to be installed before jenkins. 



Variables that can be set are as follows:

```yaml
---
jenkins_helm_chart_version: "4.1.17"
jenkins_namespace: "jenkins"
jenkins_version: "2.346.3-2-lts"
jenkins_username: dynatrace
jenkins_password: dynatrace
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
This task creates the jenkins admin user and password.
```yaml
- include_role:
    name: jenkins
    tasks_from: create-secret
  vars:
    jenkins_username: "<jenkins user name>"
    jenkins_password: "<jenkins password>"
```

#### "create-token" 
This task generates the jenkins admin token and api token.
```yaml
- include_role:
    name: jenkins
    tasks_from: create-token
  vars:
    jenkins_username: "<jenkins user name>"
    jenkins_password: "<jenkins password>"
    jenkins_internal_endpoint: "<jenkins internal endpoint>"
```

#### "source-endpoints" 
This task fetches the internal endpoint (variable name: "jenkins_internal_endpoint") for the jenkins service

```yaml
- include_role:
    name: jenkins
    tasks_from: source-endpoints
```

#### "source-secret" 
This task sources the jenkins admin user (variable name: "jenkins_username"), password (variable name: "jenkins_password") as well as jenkins api token (variable name: "jenkins_api_token") .

```yaml
- include_role:
    name: jenkins
    tasks_from: source-secret
```
