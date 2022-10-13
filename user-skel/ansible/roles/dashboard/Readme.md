# dashboard

This currated role can be used to install Acebox Dashboard on a kubernetes cluster.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Dashboard

The main task deploys dashboard on a kubernetes cluster with the variables set in "defaults".

Depending on a use case, it shows the deployed application details on the "Deployment Preview" and "Use Cases" guide sections. Please see the usage information under the "template-values-file" task. 

```yaml
- include_role:
    name: dashboard
```

Variables that can be set are as follows:

```yaml
---
dashboard_user: "dynatrace"
dashboard_password: "dynatrace"
dashboard_namespace: "ace"
dashboard_image: "dynatraceace/ace-box-dashboard:1.3.0"
dashboard_skip_install: False
```

### Other Tasks in the Role

#### "template-values-file" 
This task templates the helm values file depending on your use case requirements. This task has to be executed before the "dashboard" role stated above.


```yaml
- set_fact:
    include_dashboard_value_file: "{{ role_path }}/templates/<use-case-name>.yml.j2" # rename with your use case name 

- include_role:
    name: dashboard
    tasks_from: template-values-file
```

An example: demo-quality-gates-jenkins use case

You can create multiple "preview sections" depending on the URLs your deployments have. They will be shown on the "Deployment Preview" tab.

You can also add "guides" for your use cases that can be seen on "Use Cases" section of "Home" tab of the Dashboard.

```yaml
---
useCases:
  demo-quality-gates-jenkins:
    previews:
    - section: demo-quality-gates-jenkins
      description: Staging
      url: "{{ ingress_protocol }}://simplenodeservice-simplenode-jenkins-staging.{{ ingress_domain }}"
    - section: demo-quality-gates-jenkins
      description: Production
      url: "{{ ingress_protocol }}://simplenodeservice-simplenode-jenkins-production.{{ ingress_domain }}"
    guides:
    - description: "Quality Gates, Monitoring as a Service and Monitoring as Code - Demo using Jenkins, Gitea and Cloud Automation"
      url: "{{ ingress_protocol }}://gitea.{{ ingress_domain }}/demo/quality-gates-jenkins/src/branch/main/demo"

```