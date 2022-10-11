# jenkins

This currated role can be used to install jenkins on a kubernetes cluster.

## Using the role

### Role Requirements

```yaml
- include_role:
    name: jenkins

```

### Deploying Jenkins

The main task deploys jenkins on a kubernetes cluster with the variables set in "defaults" folder. It creates a secret that includes username and password. 

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
This task templates the helm values file

```yaml
- include_role:
    name: jenkins
    tasks_from: template-values-file
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
    tasks_from: create-secret
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