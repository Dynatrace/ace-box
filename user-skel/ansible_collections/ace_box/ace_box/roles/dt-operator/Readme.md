# dt-operator

This currated role can be used to deploy Dynatrace k8s operator (Dynakube) with a Classic full-stack injection deployment strategy. 

Dynatrace Operator manages classic full-stack injection after the following resources are deployed.

- OneAgent, deployed as a DaemonSet, collects host metrics from Kubernetes nodes. It also detects new containers and injects OneAgent code modules into application pods.

- Dynatrace Activegate is used for routing, as well as for monitoring Kubernetes objects by collecting data (metrics, events, status) from the Kubernetes API.

- Dynatrace webhook server validates Dynakube definitions for correctness.

For the details, please check this link: https://www.dynatrace.com/support/help/shortlink/dto-deploy-options-k8s#classic

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
```

### Deploying Dynatrace K8s Operator

```yaml
- include_role:
    name: dt-operator
```

Variables that can be set are as follows:

```yaml
---
dt_operator_release: "v0.9.1" # the latest supported dynatrace operator release
dt_operator_namespace: "dynatrace"
host_group: "ace-box"
```

This role creates a namespace in the Kubernetes cluster and deploys the Dynatrace operator along with the Dynakube custom resource.

### Other Tasks in the Role

"source-secrets" retrieves the Operator bearer token and stores it in the following variable:
- `dt_operator_kube_bearer_token`

```yaml
- include_role:
    name: dt-operator
    tasks_from: source-secrets
```

"uninstall" task deletes the Dynatrace operator namespace

```yaml
- include_role:
    name: dt-operator
    tasks_from: uninstall