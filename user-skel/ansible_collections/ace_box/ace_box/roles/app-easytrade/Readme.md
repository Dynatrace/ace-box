# app-easytrade

This currated role can be used to deploy EasyTrade demo application on the ACE-Box.
Easytrade application files are stored in this [repository](https://github.com/Dynatrace/easytrade).
Check the [EasyTrade documentation](https://github.com/Dynatrace/easytrade/blob/main/README.md) for more information.

## Using the role

### Role Requirements

This role depends on the following roles to be deployed beforehand:

```yaml
- include_role:
    name: microk8s
```

> Note: we highly recommend to use k3s, but it is also possible to use microk8s. More information below

### Deploying EasyTrade

```yaml
- include_role:
    name: app-easytrade
  vars:
    manifest_strategy: "static" # static or fetch_latest: static will use the static files from the app-easytrade role, dynamic will clone the EasyTrade repository with the latest files. Attention: This would break the existing deployments if the EasyTrade repository is updated.
```

Variables that can be set are as follows:

```yaml
---
easytrade_namespace: "easytrade" # namespace that EasyTrade will be deployed in
easytrade_domain: "easytrade.{{ ingress_domain }}" #ingress domain for regular EasyTrade
easytrade_addDashboardLink: true # add a link to the dashboard when enabled
easytrade_addDashboardPreview: true # add a preview to the dashboard when enabled
easytrade_deploy: true # Choose to deploy or not easytrade. True by default but useful to set it to false when it is combined with gitlab or any other ci/cd, so it's gets deployed from the pipeline
easytrade_owner: "ace-box" # Customize the dt.owner annotation for your lab.
```

### (Optional) To enable observability with Dynatrace OneAgent

```yaml
- include_role:
    name: dt-operator
```

### (Optional) To install Dynatrace Activegate to enable synthetic monitoring

```yaml
- include_role:
    name: dt-activegate-classic
  vars:
    activegate_install_synthetic: true
```

### (Optional) Configure Dynatrace using Monaco

To enable monaco:

```yaml
- name: Deploy Dynatrace configurations
  include_role:
    name: monaco-v2
  vars:
    monaco_version: "latest"
```

> Note: the below applies Dynatrace configurations with the monaco project embedded in the role.

```yaml
- include_role:
    name: app-easytrade
    tasks_from: apply-dt-configuration

```

### Add to ACE Dashboard
To add references to the ACE dashboard, set the following vars:

```yaml
easytrade_addDashboardLink: true
easytrade_addDashboardPreview: true
```

After deploying the app, ensure to also deploy the dashboard to see it reflected:

```yaml
- include_role:
    name: dashboard
```