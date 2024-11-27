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

In order to automatically provision a workflow with an action involving edge-connect, you need to generate beforehand the edge-connect connection within Dynatrace. To do that, you need the credentials to authenticate, for later on, using them in a monaco config file.

You can grab the credentials with the following task:

```yaml
- include_role:
    name: edge-connect
    tasks_from: generate-credentials
```

The credentials can be used in your Ansible code (I.e. set them as environment variables in Gitlab) with the following values:
- k8s_cluster_uid
- edge_connect_token

For example:

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