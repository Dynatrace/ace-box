# dt-operator

This currated role deploys the Dynatrace Operator to monitor your Kubernetes cluster. Dynatrace provides different deployment options: `cloudNativeFullStack`, `applicationMonitoring`, `classicFullStack` (deprecated). Notice that the prerequisites for each are different

### (RECOMMENDED) Deploy cloudNativeFullStack

1. Install k3s

```yaml
- include_role:
    name: k3s
```

2. Deploy Operator in `cloudNativeFullStack`

```yaml
- include_role:
    name: dt-operator
  vars:
    operator_mode: "cloudNativeFullStack"
    dt_operator_release: "v1.7.2"
    host_group: k8s_multi_prod
    cluster_name: ace-box
```

### Destroy

Destroy your Operator with 

```yaml
- include_role:
    name: dt-operator
    tasks_from: destroy
```

> Note: match the destroy with the operator release that has been deployed

### Other Modes

#### Deploy applicationMonitoring

1. Install k3s

```yaml
- include_role:
    name: k3s
```

2. Deploy Operator in `applicationMonitoring`

```yaml
- include_role:
    name: dt-operator
  vars:
    operator_mode: "applicationMonitoring"
    dt_operator_release: "v1.7.2"
    host_group: k8s_multi_prod
    cluster_name: ace-box
```

#### (DEPRECATED) Deploy classicFullStack

1. Install microk8s

```yaml
- include_role:
    name: microk8s
```

2. Deploy classic Operator

```yaml
- include_role:
    name: dt-operator
  vars:
    operator_mode: "classicFullStack"  
    dt_operator_release: "v1.2.2"
```

### Other Tasks in the Role

"source-secrets" retrieves the Operator bearer token and stores it in the following variable:
- `dt_operator_kube_bearer_token`

```yaml
- include_role:
    name: dt-operator
    tasks_from: source-secrets
```