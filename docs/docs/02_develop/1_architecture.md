---
sidebar_position: 1
---

# Architecture

Explore & extend the demo use case

### What is it?

A use case in software refers to a detailed description of how users interact with a system to achieve a specific goal. It outlines the steps involved in completing a task and helps to illustrate the functional requirements of the software.

Discover Dynatrace use cases in our [documentation](https://docs.dynatrace.com/docs/discover-dynatrace/use-cases)

### How is it defined?

An use case reside in repositories outside of the ACE-Box. [This](https://github.com/dynatrace-ace/basic-dt-demo) is the repository for our `First Steps into Dynatrace Observability`.

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

Before developing anything from scratch, check if there is a [curated role](../category/curated-roles)

:::