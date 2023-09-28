# dt-oneagent-classic

This currated role can be used to deploy the Dynatrace OneAgent on the host.

> Note: For Kubernetes-based environments, it is best to deploy the [Dynatrace Operator](../dt-operator/Readme.md).


## Using the role

### Role Requirements
This role has no dependencies on other roles

### Deploying The Dynatrace OneAgent

```yaml
- include_role:
    name: dt-oneagent-classic
```

### Other Tasks in the Role


"uninstall" task deletes the Dynatrace operator namespace

```yaml
- include_role:
    name: dt-oneagent-classic
    tasks_from: uninstall