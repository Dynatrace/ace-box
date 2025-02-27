---
sidebar_position: 2
---

# Dive Deep Use Case

## Exploring

In this tutorial, we will explore the demo use case and extend it using curated roles and custom functionalities

### How is an use case defined?

Use cases reside in repositories outside of the ACE-Box. For our First Steps into Dynatrace Observability
https://github.com/dynatrace-ace/basic-dt-demo

### How it works?

With the [ace enable](../01_get-started/3_add_use_case.md#enable-use-case) command, the ACE-Box will execute the [roles/my-use-case/tasks/main.yml](https://github.com/dynatrace-ace/basic-dt-demo/blob/main/roles/my-use-case/tasks/main.yml) following task, that looks as follows:

```yml
---
- include_role:
    name: "k3s"

- include_role:
    name: dt-operator
  vars:
    log_monitoring: "fluentbit"

- include_role:
    name: app-easytrade

- include_role:
    name: dashboard
```

Each of these roles are curated roles that are part of the ACE-Box. Check out the documentation related to each role.
- [k3s](../04_curated_roles/k3s.md)
- [dt-operator](../04_curated_roles/dt-operator.md)
- [app-easytrade](../04_curated_roles/app-easytrade.md)
- [dashboard](../04_curated_roles/dashboard.md)

:::tip

Before developing anything from scratch, check if there is a curated role that may help you.

:::

## Extending

We will use the existing demo to create an extended version of it adding the following

### Preparation

1. SSH into the VM

2. ace enable --local

### Dynatrace configurations & apps

_coming soon..._

### Gitlab CI/CD

_coming soon..._

### Custom Commands

_coming soon..._

