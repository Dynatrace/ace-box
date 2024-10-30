# edge-connect

This currated role can be used to deploy [edge-connect](https://docs.dynatrace.com/docs/setup-and-configuration/edgeconnect) in your k8s cluster

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```

```yaml
- include_role:
    name: dt-operator
```

### Deploying edge-connect

Extend your dt-operator role to 

```yaml
- include_role:
    name: dt-operator
  vars:
    edge_connect: true
```