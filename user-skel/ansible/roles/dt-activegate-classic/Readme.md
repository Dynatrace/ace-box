# dt-activegate-classic

This currated role can be used to deploy Dynatrace ActiveGate on the ACE-Box VM.

It also has tasks regarding the managing of private synthetic locations.


For the details, please check this link: https://www.dynatrace.com/support/help/how-to-use-dynatrace/synthetic-monitoring/private-synthetic-locations/create-a-private-synthetic-location


## Using the role

### Deploying ActiveGate

```yaml
- include_role:
    name: dt-activegate-classic
  vars:
    activegate_install_synthetic: true
```

Variables that can be set are as follows:

### Role variables

| Variable | Description | Default |
| --- | --- | --- |
| `activegate_install_synthetic` | Flag to install a synthetic activegate | `false` |
| `activegate_config_namespace` | Namespace where ActiveGate configuration will be stored | `dynatrace` |
| `activegate_download_location` | Where AG executable will be downloaded to | `/tmp/Dynatrace-ActiveGate-Linux-x86-latest.sh` |
| `activegate_uninstall_script_location` | location of uninstall.sh | `/opt/dynatrace/gateway/uninstall.sh` |
| `synthetic_nodes_query` | Query to get synthetic nodes from Dynatrace | `nodes[?hostname=='{{ ansible_facts.fqdn }}'].entityId` |


This role downloads the latest AciveGate installer on the ACE-Box and deploys the synthetic-enabled ActiveGate.

### Other Tasks in the Role

`restart-activegate.yml` restarts the activegate service.

```yaml
- include_role:
    name: dt-activegate-classic
    tasks_from: restart-activegate
```

`source-node-id` task fetches the node ID where the Synthetic-enabled ActiveGate is installed and sources the following variables:
- `dt_synthetic_node_id`

```yaml
- include_role:
    name: dt-activegate-classic
    tasks_from: source-node-id
```

> Note: this requires the activegate to be installed in synthetic mode (setting `activegate_install_synthetic` to `true` when installing). It falls back to setting the `dt_synthetic_node_id` to an empty string.

`uninstall` task executes the ActiveGate uninstall operation

```yaml
- include_role:
    name: dt-activegate-classic
    tasks_from: uninstall
```