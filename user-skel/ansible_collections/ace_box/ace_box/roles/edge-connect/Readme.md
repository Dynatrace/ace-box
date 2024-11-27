# edge-connect

This currated role can be used to deploy [edge-connect](https://docs.dynatrace.com/docs/setup-and-configuration/edgeconnect) in your k8s cluster

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```

### Deploying edge-connect

Edge-connect gets installed along with the Dynatrace Operator. In order to deploy edge-connect, add the following variable to the dt-operator role:

```yaml
- include_role:
    name: dt-operator
  vars:
    edge_connect: true
```

### (Optional) Generate credentials for edge-connect

In order to use edge-connect in a Kubernetes Workflow Action, a connection setting is needed. The previous commmand will automatically generate a connection for you that you can use in a Kubernetes Workflow Action.

If you want to provision the Kubernetes Workflow Action via monaco, then you need also the connection as-code, in order to reference one configuration with the other. Then you need to store the connection variables in environment variables.

The credentials generated after running the previous command are:
- k8s_cluster_uid
- edge_connect_token

Meaning that you can use them and store them as environment variables in another tool. I.e. for Gitlab:

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
        key: "K8S_TOKEN",
        value: "{{token_workflow_config.stdout}}",
      }
    - {
        key: "K8S_UID",
        value: "{{k8s_cluster_uid.stdout}}",
      }
```

Then you can use them as variables for your configuration-as-code (Monaco). You can use the template `edge-connect/files/monaco/k8s-connector`