# app-easytrade

This currated role can be used to deploy EasyTrade demo application on the ACE-Box.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
```

### Deploying EasyTrade

```yaml
- include_role:
    name: app-easytrade
```

Variables that can be set are as follows:

```yaml
---
easytrade_namespace: "easytrade" # namespace that EasyTrade will be deployed in
easytrade_domain: "easytrade.{{ ingress_domain }}" #ingress domain for regular EasyTrade
easytrade_image_tag: "5aa49fb" #image tag to use, check https://console.cloud.google.com/gcr/images/dynatrace-demoability/global/easytrade
easytrade_headlessloadgen_tag: "848c2ab" #image tag for headless loadgen, check https://console.cloud.google.com/gcr/images/dynatrace-demoability/global/headlessloadgen
easytrade_addDashboardLink: true # add a link to the dashboard when enabled
easytrade_addDashboardPreview: true # add a preview to the dashboard when enabled
```

### (Optional) To enable observability with Dynatrace OneAgent

```yaml
- include_role:
    name: dt-operator
```

### (Optional) To install Dynatrace Activegate to enable synthetic monitoring

```yaml
- include_role:
    name: dt-activegate-classic
  vars:
    activegate_install_synthetic: true
```

### (Optional) Configure Dynatrace using Monaco

To enable monaco:

```yaml
- name: Deploy Monaco
  include_role:
    name: monaco
```

> Note: the below applies Dynatrace configurations with the monaco project embedded in the role.
> 
> To enable private synthetic monitor for EasyTeavel via Dynatrace ActiveGate, set the "skip_synthetic_monitor" variable "false". The default value is "true".

```yaml
- include_role:
    name: app-easytrade
    tasks_from: apply-monaco
  vars:
    skip_synthetic_monitor: "false"
```

To delete the configuration:

```yaml
- include_role:
    name: app-easytrade
    tasks_from: delete-monaco
```

Dynatrace Configurations List (check the files/monaco/projects/easytrade folder for the latest):

    Infrastructure:
      - "auto-tag/app"
      - "auto-tag/environment"
      - "conditional-naming-processgroup/ACE Box - containername.namespace"
      - "conditional-naming-service/app.environment"
      - "synthetic-location/ACE-BOX" # if skip_synthetic_monitor: "false"
    
    EasyTrade Aplication Specific:
        - "app-detection-rule/app.easytrade"
        - "application-web/app.easytrade"
        - "auto-tag/easytrade"
        - "management-zone/easytrade-prod"
        - "synthetic-monitor/webcheck.easytrade.prod" # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/webcheck.easytrade-angular.prod" # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/browser.easytrade-angular.prod.home" # if skip_synthetic_monitor: "false"
        - "synthetic-monitor/browser.easytrade.prod.home" # if skip_synthetic_monitor: "false"

### Add to ACE Dashboard
To add references to the ACE dashboard, set the following vars:

```yaml
easytrade_addDashboardLink: true
easytrade_addDashboardPreview: true
```

After deploying the app, ensure to also deploy the dashboard to see it reflected:

```yaml
- include_role:
    name: dashboard
```