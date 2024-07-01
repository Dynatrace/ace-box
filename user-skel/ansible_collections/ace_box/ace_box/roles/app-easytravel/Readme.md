# app-easytravel

This currated role can be used to deploy Easytravel demo application on the ACE-Box.

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
easytravel_namespace: "easytravel" # namespace that Easytravel will be deployed in
easytravel_domain: "easytravel.{{ ingress_domain }}" #ingress domain for regular Easytravel
easytravel_image_tag: "2.0.0.3599" #easytravel docker image tag
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