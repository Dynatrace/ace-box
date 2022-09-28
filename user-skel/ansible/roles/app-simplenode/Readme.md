# app-simplenode

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

### Deploying Simplenode  -To be discussed

```yaml
- include_role:
    name: app-simplenode
```

### Configure Dynatrace using Monaco - TO be discussed

To enable monaco:

```yaml
- include_role:
    name: monaco
```

> Note: the below configures Dynatrace with the monaco project embedded in the role

```yaml
- include_role:
    name: app-simplenode
    tasks_from: apply-dt-configuration
```

To delete the configuration:

```yaml
- include_role:
    name: app-simplenode
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
      - "synthetic-location/ACE-BOX"
    
    Simplenode Aplication Specific:
        - "application/simplenode"
        - "app-detection-rule/simplenode"

