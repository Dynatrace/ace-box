# keptn-cli

This currated role install Keptn CLI on the acebox.

## Using the role

### Installing Keptn-CLI

```yaml
- include_role:
    name: keptn-cli
```

Variables that can be set are as follows:

```yaml
---
keptn_cli_download_location: "/tmp/keptn"
keptn_bin_location: "/usr/local/bin/keptn"

```