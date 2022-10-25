# app-unguard

This currated role can be used to deploy Unguard demo application on the ACE-Box.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Unguard

```yaml
- include_role:
    name: app-unguard
```

Variables that can be set are as follows:

```yaml
---
# application deployment parameters
unguard_namespace: "unguard" # namespace that Unguard will be deployed in
unguard_image_tag: "0.0.2" # image tag to deploy for all Unguard images
unguard_user_auth_service_image_tag: "0.0.1" # user_auth_service currently working version
unguard_simulate_private_ranges: "true" # enable/disable simulating private ranges on user simulator service
unguard_deploy_user_simulator_cronjob: "false" # enable/disable user simulator cronjob

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

### (Optional) Configure Dynatrace using Monaco

> The below deploys monaco and configures Dynatrace with the monaco project embedded in the role
> 
> Note: To enable private synthetic monitor for Unguard via Dynatrace ActiveGate, set the "skip_synthetic_monitor" variable as "false". The default value is "true"

```yaml
- include_role:
    name: app-unguard
    tasks_from: apply-dt-configuration
  vars:
    skip_synthetic_monitor: "false"
```

To delete the configuration:

```yaml
- include_role:
    name: app-unguard
    tasks_from: delete-dt-configuration
```

Dynatrace Configurations List:

    Infrastructure:
      - "auto-tag/app"
      - "auto-tag/environment"
      - "conditional-naming-processgroup/ACE Box - containername.namespace"
      - "conditional-naming-processgroup/Java Springboot Naming"
      - "conditional-naming-processgroup/MongoDB Naming"
      - "conditional-naming-processgroup/NodeJS Naming"
      - "conditional-naming-processgroup/Postgres Naming"
      - "conditional-naming-processgroup/ {ProcessGroup:ExeName} {ProcessGroup:KubernetesBasePodName}"
      - "conditional-naming-service/app.environment"
      - "kubernetes-credentials/ACE-BOX"
      - "synthetic-location/ACE-BOX"  # if set skip_synthetic_monitor: "false"
    
    Unguard Aplication Specific:
        - "application/unguard"
        - "app-detection-rule/unguard"
        - "dashboard/Application Security Issues"
        - "management-zone/unguard"
        - "request-attributes/X-Client-Ip"
        - "synthetic-monitor/unguard.http" # if set skip_synthetic_monitor: "false"
        - "synthetic-monitor/unguard.clickpath" # if set skip_synthetic_monitor: "false"
