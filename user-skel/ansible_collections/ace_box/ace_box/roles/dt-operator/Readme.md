# dt-operator

This currated role deploys the Dynatrace Operator to monitor your Kubernetes cluster. Dynatrace provides different deployment options: `application-only + k8s-api`, `cloudNativeFullStack`, and `classicFullStack`. Notice that the prerequisites for each are different

## Prerequisites

### (RECOMMENDED) application-only + k8s-api or cloudNativeFullStack

This role depends on the following roles to be deployed beforehand:

```yaml
- include_role:
    name: k3s
```

> Note: if you deploy k3s, you don't need to deploy microk8s and viceversa

### classicFullStack

This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s
```

> Note: if you deploy microk8s, you don't need to deploy k3s and viceversa

Dynatrace Operator manages classic full-stack injection after the following resources are deployed.

- OneAgent, deployed as a DaemonSet, collects host metrics from Kubernetes nodes. It also detects new containers and injects OneAgent code modules into application pods.

- Dynatrace Activegate is used for routing, as well as for monitoring Kubernetes objects by collecting data (metrics, events, status) from the Kubernetes API.

- Dynatrace webhook server validates Dynakube definitions for correctness.

For the details, please check this link: https://www.dynatrace.com/support/help/shortlink/dto-deploy-options-k8s#classic


## Deploying Dynatrace K8s Operator

```yaml
- include_role:
    name: dt-operator
```
The Operator gets deployed in application only mode approach, check the `roles/dt-operator/defaults/main.yml`:

```yaml
operator_mode: "applicationMonitoring"  # default & prefered deployment option
dt_operator_release: "1.3.0-rc.0"       # operator release should be linked with the right operator mode
log_monitoring: "fluentbit"
edge_connect: false
```

> Note: log monitoring is enabled by default, using the fluentbit collector and edge connect is disabled by default, but can be switched to 
To deploy the Operator in application only mode (and default approach), variables can be set as follow:

```yaml
- include_role:
    name: dt-operator
  vars:
    edge_connect: true
```

If you decide to use the classicFullStack approach, you need to specify the variables as follow:

```yaml
- include_role:
    name: dt-operator
  vars:
    operator_mode: "classicFullStack"  
    dt_operator_release: "1.2.2"
```

## Extra variables

You can configure the cluster name and host group as follows:

```yaml
- include_role:
    name: dt-operator
  vars:
    host_group: custom_host_group
    cluster_name: custom_cluster_name
```


## Other Tasks in the Role

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
