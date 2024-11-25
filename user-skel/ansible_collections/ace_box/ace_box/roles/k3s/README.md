# k3s

This currated role installs k3s on the ACE-Box.
It also configures kube config to automatically connect to the cluster via kubectl and helm.

For the details, please check this link: https://docs.k3s.io/

## Using the role

### Deploy

```yaml
- include_role:
    name: k3s
```

Following variables can be set when applying the role:
```yaml
---
k3s_version: "v1.29.10+k3s1" # Check https://github.com/k3s-io/k3s/releases
```

The role will:
- Configure `ingress_class` automatically to use `traefik`
- Install helm
- Deploy and restart k3s
- Deploy a private registry
- Configure docker to use the insecure private registry

Following variables will be exposed after installation:

```yaml
ingress_class: `traefik`
kubernetes_flavour: `k3s`
```

### (Optional) Restart

There is a restart role that can be used if needed - it is also called when k3s is deployed.

```yaml
- include_role:
    name: k3s
    tasks_from: restart
```

### Example

The k8s HoT is the first HoT based on k3s. Check how it has been installed [here](https://github.com/dynatrace-ace/ace-box-ext-hot-k8s/blob/k3s-on-ace-box/roles/my-use-case/tasks/main.yml)