# microk8s

This currated role installs microk8s on the ACE-Box along with the required addons and packages.
It also configures kube config to automatically connect to the cluster via kubectl and helm.

For the details, please check this link: https://microk8s.io/

## Using the role

### Deploying microk8s

```yaml
- include_role:
    name: microk8s
```

Variables that can be set are as follows:

```yaml
---
microk8s_addons: "dns storage registry ingress helm3" # addons installed along with microk8s
microk8s_release_channel: "1.23/stable" # microk8s release channel from snap community
```
