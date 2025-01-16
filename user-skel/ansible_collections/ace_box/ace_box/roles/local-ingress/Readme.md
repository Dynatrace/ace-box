# Local-ingress

This role can be used to create an ingress for non-kubernetes applications.

## Using the role

### Role Requirements

This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```
> Note: If you want to monitor the deployed application with Dynatrace, you cannot use the `dt-operator` role as it cannot monitor outside of containers. Use the `dt-oneagent-classic` role instead.

### Role variables

| Variable | Description | Default |
| --- | --- | --- |
| `local_ingress_port` | the port where the locally running app is exposed on | 8080 |
| `local_ingress_domain` | the domain you want the app to be available on | |
| `local_ingress_namespace` | the namespace for the ingress object | ingress |
| `local_ingress_name` | the name of the helm release | local-ingress-(5 random characters) |
| `local_private_ip` | the private IP for the VM | `{{ ansible_default_ipv4.address }}`|
| `local_ingress_class` | the ingress class to use, defaults to `local_ingress` variable| `{{ local_ingress }}` |


#### Creating a local ingress

The following snippet shows how to deploy the ingress and als

```yaml
- include_role:
    name: local-ingress
  vars:
    local_ingress_port: "8080"
    local_ingress_domain: "myapp.mydomain"
    local_ingress_namespace: "my-namespace"
    local_ingress_name: "myingressname"
```