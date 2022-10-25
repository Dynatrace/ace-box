# dt-activegate-private-synth-classic

This currated role can be used to deploy Dynatrace Synthetic-enabled ActiveGate on the ACE-Box. 


For the details, please check this link: https://www.dynatrace.com/support/help/how-to-use-dynatrace/synthetic-monitoring/private-synthetic-locations/create-a-private-synthetic-location


## Using the role

### Deploying ActiveGate

```yaml
- include_role:
    name: dt-activegate-private-synth-classic
```

Variables that can be set are as follows:

```yaml
---
activegate_download_location: "/tmp/Dynatrace-ActiveGate-Linux-x86-latest.sh"
activegate_uninstall_script_location: "/opt/dynatrace/gateway/uninstall.sh"
synthetic_nodes_query: "nodes[?hostname=='{{ ansible_facts.fqdn }}'].entityId"
```

This role downloads the latest AciveGate installer on the ACE-Box and deploys the synthetic-enabled ActiveGate.

### Other Tasks in the Role

"source-node-id" task gets the node ID on which the synthetic enabled active gate is installed. This can then be used to set up a private synthetic location

```yaml
- include_role:
    name: dt-activegate-private-synth-classic
    tasks_from: source-node-id
```

"uninstall" task executes the ActiveGate uninstall operation

```yaml
- include_role:
    name: dt-activegate-private-synth-classic
    tasks_from: uninstall
```