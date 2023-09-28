# dashboard

This currated role can be used to install ACE-Box Dashboard on a kubernetes cluster.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Dashboard

The main task deploys dashboard on a kubernetes cluster.

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

#### How to add a dashboard value file:
Dashboard value file has to be added under the "templates" folder of your use case role.

##### Dashboard Value File Example: 
https://github.com/dynatrace-ace/ace-box-ext-template/blob/main/example_roles/my-use-case/templates/my-use-case-dashboard.yml.j2
 
You can create multiple "preview sections" depending on the URLs of your deployments. They will be shown on the "Deployment Preview" tab.

You can also add "guides" for your use cases that can be seen on "Use Cases" section of "Home" tab of the Dashboard.

"extRefs" is an additional capability to provide references to external tools. Description will be added to the dashboard's homepage. References can optionally contain credentials. Credentials will be added to the dashboard's "Links" page.

```yaml
---
useCases:
  my-use-case:
    previews:
    - section: my-use-case
      description: Dynatrace
      url: "https://dynatrace.com"
    guides:
    - description: "This is a template as well as example repository for ACE-Box external use cases"
      url: "https://github.com/dynatrace-ace/ace-box-ext-template/blob/HEAD/README.md"

extRefs:
  Github repo:
    description: "This is a template as well as example repository for ACE-Box external use cases"
    url: "https://github.com/dynatrace-ace/ace-box-ext-template/blob/HEAD/README.md"
    creds:
      - description: "Github username"
        type: "text"
        value: "my-github-user-name"
      - description: "Github password"
        type: "password"
        value: "my-super-secret-password"
  ```
