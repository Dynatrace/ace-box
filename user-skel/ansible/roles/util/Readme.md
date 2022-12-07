# ACE-Box Utils

This collection of tasks can be used for supporting the development of external use cases.

## Tasks

### `create-local-ingress`
This task can be used when you have an application that is not deployed on kubernetes - but straight on the VM - and you still want to expose it using the kubernetes ingress controller

#### Role requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
```

### Role variables

| Variable | Description | Default |
| --- | --- | --- |
| `local_ingress_port` | the port where the locally running app is exposed on | 8080 |
| `local_ingress_domain` | the domain you want the app to be available on | |
| `local_ingress_namespace` | the namespace for the ingress object | ingress |
| `local_ingress_name` | the name of the helm release | local-ingress-(5 random characters) |
| `local_private_ip` | the private IP for the VM | `{{ ansible_default_ipv4.address }}`|


#### Creating a local ingress

The following snippet shows how to deploy the ingress and als

```yaml
- include_role:
    name: util
    tasks_from: create-local-ingress
  vars:
    local_ingress_port: "8080"
    local_ingress_domain: "myapp.mydomain"
    local_ingress_namespace: "my-namespace"
    local_ingress_name: "myingressname"
```