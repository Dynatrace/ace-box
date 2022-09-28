# app-unguard

This currated role can be used to deploy Unguard demo application on the acebox.

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

```

### Deploying Unguard

```yaml
- include_role:
    name: app-unguard
```

Variables that can be set are as follows:

```yaml
---
unguard_namespace: "unguard" # namespace that Unguard will be deployed in
unguard_image_tag: "0.0.2" #image tag to deploy for all Unguard images
```

### Configure Dynatrace using Monaco

> Note: the below configures Dynatrace with the monaco project embedded in the role

```yaml
- include_role:
    name: app-unguard
    tasks_from: apply-dt-config
```

To delete the configuration again:

```yaml
- include_role:
    name: app-unguard
    tasks_from: delete-dt-config
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
      - "synthetic-location/ACE-BOX"
    
    Unguard Aplication Specific:
        - "application-web/unguard"
        - "app-detection-rule/unguard"
        - "dashboard/Application Security Issues"
        - "management-zone/unguard"
        - "request-attributes/X-Client-Ip"
        - "synthetic-monitor/unguard.http"
        - "synthetic-monitor/unguard.clickpath"

