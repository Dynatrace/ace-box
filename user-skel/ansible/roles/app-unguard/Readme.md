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
    tasks_from: configure-monaco
```

To delete the configuration again:

```yaml
- include_role:
    name: app-unguard
    tasks_from: delete-monaco
```