# k3s

This currated role installs k3s on the ACE-Box.
It also configures kube config to automatically connect to the cluster via kubectl and helm.

For the details, please check this link: https://docs.k3s.io/

## Using the role

### Deploying k3s

```yaml
- include_role:
    name: k3s
```

### Restarting k3s is needed after gets deployed

```yaml
- include_role:
    name: k3s
    tasks_from: restart
```

### Example

The k8s HoT is the first HoT based on k3s. Check how it has been installed [here](https://github.com/dynatrace-ace/ace-box-ext-hot-k8s/blob/k3s-on-ace-box/roles/my-use-case/tasks/main.yml)