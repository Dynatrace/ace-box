# dt-activegate

This currated role can be used to deploy Dynatrace Synthetic-enabled ActiveGate on the acebox.

## Using the role

### Deploying ActiveGate

```yaml
- include_role:
    name: dt-activegate
```

Variables that can be set are as follows:

```yaml
---
activegate_download_location: "/tmp/Dynatrace-ActiveGate-Linux-x86-latest.sh"
activegate_uninstall_script_location: "/opt/dynatrace/gateway/uninstall.sh"
synthetic_nodes_query: "nodes[?hostname=='{{ ansible_facts.fqdn }}'].entityId"
```

This role downloads the latest AciveGate installer on the ace-box and deploys the synthetic-enabled ActiveGate.

### Other Tasks in the Role

"source-node-id" task gets the node ID on which the synthetic enabled active gate is installed

```yaml
- include_role:
    name: dt-activegate
    tasks_from: source-node-id
```

"uninstall" task executes the ActiveGate uninstall operation

```yaml
- include_role:
    name: dt-activegate
    tasks_from: uninstall
```