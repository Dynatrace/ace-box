# dt-edge-connect

This currated role can be used to deploy the Dynatrace [Edge Connect](https://docs.dynatrace.com/docs/setup-and-configuration/edgeconnect) component in your k8s cluster.

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

### Deploying dt-edge-connect

`dt-edge-connect` gets installed along with the Dynatrace Operator. In order to deploy `dt-edge-connect`, add the following variable to the dt-operator role:

```yaml
- include_role:
    name: dt-edge-connect
```

Once the role is completed, the following variables are available:
- `k8s_cluster_uid`
- `edge_connect_token`

In order to use dt-edge-connect in a [Kubernetes Workflow Action](https://docs.dynatrace.com/docs/analyze-explore-automate/workflows/actions/kubernetes-automation/kubernetes-workflow-actions), a connection setting is needed. The `dt-edge-connect` role will automatically create a connection for you that you can use in a Kubernetes Workflow Action.

If you want to automatically provision a Kubernetes Workflow Action via monaco, then you need also the connection as-code, in order to reference one configuration with the other. Then you need to store the variables as environment variables, in order to call them from the monaco configuration file. Check the files under `dt-edge-connect/files/monaco/k8s-connector` as an example:

```yaml
configs:
- id: k8s_connector
  config:
    parameters:
        k8sToken:
          type: environment
          name: k8s_cluster_uid
        k8sUid:
          type: environment
          name: edge_connect_token
    template: k8s-connector.json
    skip: true
  type:
    settings:
      schema: app:dynatrace.kubernetes.connector:connection
      schemaVersion: 0.1.8
      scope: environment
```

If you are running monaco from Gitlab, this is how you can create enviroment variables:

```yaml
- name: Gitlab - Additional Environment Variables
  include_role:
    name: gitlab
    tasks_from: ensure-group-var
  vars:
    gitlab_var_key: "{{ item.key }}"
    gitlab_var_value: "{{ item.value }}"
  loop:
    - {
        key: "k8s_cluster_uid",
        value: "{{k8s_cluster_uid}}",
      }
    - {
        key: "edge_connect_token",
        value: "{{edge_connect_token}}",
      }
```