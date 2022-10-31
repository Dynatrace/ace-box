# app-easytravel

This currated role can be used to deploy easytravel demo application on the ACE-Box.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
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

### (Optional) To enable observability with Dynatrace OneAgent

```yaml
- include_role:
    name: dt-operator
```

### (Optional) To install Dynatrace Activegate to enable synthetic monitoring

```yaml
- include_role:
    name: dt-activegate-private-synth-classic
```

### Configure Dynatrace using Monaco

To enable monaco:

```yaml
- name: Deploy Monaco
  include_role:
    name: monaco
```

> Note: the below applies Dynatrace configurations with the monaco project embedded in the role
> To enable private synthetic monitor for EasyTeavel via Dynatrace ActiveGate, set the "skip_synthetic_monitor" variable as "false". The default value is "true"

```yaml
- include_role:
    name: app-easytravel
    tasks_from: apply-monaco
  vars:
    skip_synthetic_monitor: "false"
```

To delete the configuration:

```yaml
- include_role:
    name: app-easytravel
    tasks_from: delete-monaco
```

Dynatrace Configurations List:

    Infrastructure:
      - "auto-tag/app"
      - "auto-tag/environment"
      - "conditional-naming-processgroup/ACE Box - containername.namespace"
      - "conditional-naming-service/app.environment"
      - "synthetic-location/ACE-BOX"  # if skip_synthetic_monitor: "false"
    
    Easytravel Aplication Specific:
        - "app-detection-rule/app.easytravel.prod"
        - "app-detection-rule/app.easytravel-angular.prod"
        - "application-web/app.easytravel.prod"
        - "application-web/app.easytravel-angular.prod"
        - "auto-tag/easytravel-prod"
        - "management-zone/easytravel-prod"
        - "synthetic-monitor/webcheck.easytravel.prod"  # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/webcheck.easytravel-angular.prod" # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/browser.easytravel-angular.prod.home" # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/browser.easytravel.prod.home" # if skip_synthetic_monitor: "false"