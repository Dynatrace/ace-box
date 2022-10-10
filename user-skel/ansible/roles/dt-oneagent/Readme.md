# dt-oneagent

This currated role can be used to deploy Dynatrace Oneagent on the acebox.

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
```

### Deploying OneAgent

```yaml
- include_role:
    name: dt-oneagent
```

Variables that can be set are as follows:

```yaml
---
dt_operator_release: "v0.7.2" # the latest supported dynatrace operator release
dt_operator_namespace: "dynatrace"
host_group: "ace-box"
```

This role creates a namespace in the kubernetes cluster and deploys the Dynatrace operator along with the Dynakube custom resource.

### Other Tasks in the Role

"source-secrets" task gets the "dt_operator_kube_bearer_token" to be able to connect the cluster to Dynatrace

```yaml
- include_role:
    name: dt-oneagent
    tasks_from: source-secrets
```

"uninstall" task deletes the Dynatrace operator namespace

```yaml
- include_role:
    name: dt-oneagent
    tasks_from: uninstall