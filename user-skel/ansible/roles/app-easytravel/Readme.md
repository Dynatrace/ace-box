# app-easytravel

This currated role can be used to deploy easytravel demo application on the acebox.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

- include_role:
    name: dt-activegate

- include_role:
    name: dt-oneagent

- include_role:
    name: monaco
```

### Deploying EasyTravel

```yaml
- include_role:
    name: app-easytravel
```

Variables that can be set are as follows:

```yaml
---
easytravel_namespace: "easytravel-prod" # namespace that easytravel will be deployed in
easytravel_domain: "easytravel.{{ ingress_domain }}" #ingress domain for regular easytravel
easytravel_angular_domain: "easytravel-angular.{{ ingress_domain }}" #ingress domain for easytravel angular
easytravel_visit_number: 5 #number of visits generated per minute by the headless loadgen per replica
easytravel_headless_replicas: 3 #number of headless loadgen replicas
easytravel_image_tag: "2.0.0.3356" #image tag to deploy for all EasyTravel images
```

### Configure Dynatrace using Monaco

> Note: the below configures Dynatrace with the monaco project embedded in the role

```yaml
- include_role:
    name: app-easytravel
    tasks_from: apply-monaco
```

To delete the configuration again:

```yaml
- include_role:
    name: app-easytravel
    tasks_from: delete-monaco
```