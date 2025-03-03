---
sidebar_position: 1
---

# Core Principles

Explore & extend the demo use case

## What is an use case?

A use case in software refers to a detailed description of how users interact with a system to achieve a specific goal. It outlines the steps involved in completing a task and helps to illustrate the functional requirements of the software.

Discover Dynatrace use cases in our [documentation](https://docs.dynatrace.com/docs/discover-dynatrace/use-cases)

## How is an use case defined?

An use case reside in repositories outside of the ACE-Box. [This](https://github.com/dynatrace-ace/basic-dt-demo) is the repository for our `First Steps into Dynatrace Observability`.

## Use case structure

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

## How can I make changes to my use case?

1. Within your ACE-Box instance (check how to access [here](../01_get-started/3_add_use_case.md#access-your-ace-box-instance)), run the following command:

```bash
ace enable https://github.com/dynatrace-ace/basic-dt-demo.git --local
```

The `--local` setting is forcing the ACE-Box to re-run everything using the local resources:
- ACE-Box local resources: `/home/ace/.ansible/collections/ansible_collections/ace_box/ace_box/roles`
- Use case local resources: `/home/ace/repos/basic-dt-demo/roles/my-use-case/tasks`

![](./img/ACE-Box-folder-structure.png)

That means that you can add, remove or edit roles in the fly, and see the changes reflected in the provisioning.

## Why Ansible?

One of the key benefits of re-running an Ansible script is idempotency. This means that you can safely run the script multiple times, and it will ensure that the system reaches the desired state without causing unintended changes or errors. Here are some specific advantages:

- Consistency: Re-running the script ensures that the system configuration remains consistent and correct, even if changes have been made manually or by other processes.
- Error Recovery: If a previous run of the script failed or was interrupted, re-running it can complete the configuration without starting from scratch.
- Ease of Updates: When updates or changes are needed, you can modify the script and re-run it to apply the updates across all target systems.
- Automation: Regularly re-running scripts can automate maintenance tasks, ensuring systems are always in the desired state without manual intervention.
These benefits make Ansible a powerful tool for managing and maintaining infrastructure efficiently.
