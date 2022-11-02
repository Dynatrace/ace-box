# app-hipstershop

This currated role can be used to deploy hipstershop demo application on the ACE-Box.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying hipstershop

```yaml
- include_role:
    name: app-hipstershop
```

Variables that can be set are as follows:

```yaml
---
# application deployment parameters
hipstershop_namespace: "hipstershop" # namespace that hipstershop will be deployed in
hipstershop_image_tag: "0.0.2" # image tag to deploy for all hipstershop images
hipstershop_user_auth_service_image_tag: "0.0.1" # user_auth_service currently working version
hipstershop_simulate_private_ranges: "true" # enable/disable simulating private ranges on user simulator service
hipstershop_deploy_user_simulator_cronjob: "false" # enable/disable user simulator cronjob

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
> Note: To enable private synthetic monitor for hipstershop via Dynatrace ActiveGate, set the "skip_synthetic_monitor" variable as "false". The default value is "true"

```yaml
- include_role:
    name: app-hipstershop
    tasks_from: apply-dt-configuration
  vars:
    skip_synthetic_monitor: "false"
```

To delete the configuration:

```yaml
- include_role:
    name: app-hipstershop
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
    
    hipstershop Aplication Specific:
        - "application/hipstershop"
        - "app-detection-rule/hipstershop"
        - "dashboard/Application Security Issues"
        - "management-zone/hipstershop"
        - "request-attributes/X-Client-Ip"
        - "synthetic-monitor/hipstershop.http" # if set skip_synthetic_monitor: "false"
        - "synthetic-monitor/hipstershop.clickpath" # if set skip_synthetic_monitor: "false"
