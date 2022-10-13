# jenkins

This currated role can be used to install jenkins on a kubernetes cluster.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Jenkins

The main task deploys jenkins on a kubernetes cluster. It creates a secret that contains username and password as well as an admin and API token.

Depending on a use case it also sources the below entities during the deployment of jenkins;
    - the secrets of Gitea, Keptn or Cloud Automation
    - Docker container registry URL
    - ActiveGate Node ID if exists
    - OpenTelemetry collector endpoint if exists
  
NOTE: If the use case is to leverage gitea as a source code repository, gitea has to be installed before jenkins.
Similarly, if the use case is to leverage cloud automation or keptn, they have to be installed before jenkins. 

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
jenkins_password: dynatrace
git_org_demo: "demo"
git_repo_demo: "ace"
git_repo_monaco: "monaco"
jenkins_skip_install: False
```

### Other Tasks in the Role

#### "template-values-file" 
This task templates the helm values file depending on your use case requirements. This task has to be executed before the "jenkins" role stated above. 

```yaml
- set_fact:
    include_jenkins_value_file: "{{ role_path }}/templates/<use case name>-jobs.yml.j2" # rename with your use case name

- include_role:
    name: jenkins
    tasks_from: template-values-file
  vars:
    git_username: "<a git tool user name>" # set your git tool´s user name
    git_token: "<a git tool token>" # set your git tool´s token
    git_domain: "<a git tool endpoint>" # set your git endpoint
    
    usecase_repo: "<a git repository name>" # set your git repository to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)
    usecase_org: "<a git repository organization/group>" # set your git organization to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)
    usecase_jenkins_folder: "<a git repository folder>" # set your git repo folder to be used by Jenkins in the use case template (i.e. include_jenkins_value_file)

```

#### "create-secret" 
This task creates the jenkins admin user and password.
```yaml
- include_role:
    name: jenkins
    tasks_from: create-secret
```

#### "create-token" 
This task generates the jenkins admin token and api token.
```yaml
- include_role:
    name: jenkins
    tasks_from: create-token
```

#### "source-endpoints" 
This task fetches the internal endpoint for the jenkins service

```yaml
- include_role:
    name: jenkins
    tasks_from: source-endpoints
```

#### "source-secret" 
This task sources the jenkins admin user and password as well as jenkins admin token.
```yaml
- include_role:
    name: jenkins
    tasks_from: source-secret
```