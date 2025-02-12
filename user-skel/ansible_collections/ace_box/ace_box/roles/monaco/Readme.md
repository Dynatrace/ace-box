# monaco

This currated role can be used to install monaco CLI on the ACE-Box.

For the details, please check this link: https://dynatrace-oss.github.io/dynatrace-monitoring-as-code/

## Using the role

### Deploying Monaco

```yaml
- include_role:
    name: monaco
```

Variables that can be set are as follows:

```yaml
---
monaco_version: "v1.6.0"
```

### Other Tasks in the Role

#### "apply-monaco" 
This task applies configuration of the selected projects under the monaco projects root folder.
You need to specify them as input variables shown under "vars" parameter. 

You can also apply environment variables that is needed for monaco configurations under "apply.environment" parameter.

```yaml
- include_role:
    name: monaco
    tasks_from: apply-monaco
  vars:
    monaco_projects_root: "{{ <monaco/projects/root-folder-path> }}"  # monaco projects root folder path
    monaco_project: "" # selection of projects or all projects under the root path if set empty
    monaco_environment:
      <ENV_VAR1>: "<env_var1_value>" # for example APP_NAMESPACE: "easytravel" to be used for easytravel to create a dynatrace management zone via monaco
      <ENV_VAR2>: "<env_var2_value>" # for example INGRESS_DOMAIN: "easytravel.<HOST_IP>" to detect the application via monaco rules

```
