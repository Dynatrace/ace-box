# ACE-CLI
`ACE-Box` comes with an including management tool called 'ace-cli'. This cli tool can be used to prepare and/or install the ACE-Box or certain components.

```
$ ace --version
```

## Available commands (ace-cli version 0.0.1, can also be retrieved by running `ace --help`):

  Command | Result |
  -- | -- |
  `prepare` | Prepares ACE-Box for further use (e.g. persists domain, protocol settings) |
  `enable <use case>` | Prepares ACE-Box for a use case by installing set of components (see table below) |
  `install <component>` | Installs ACE-Box or components thereof (see table below) |
  `uninstall <component>` | Uninstalls ACE-Box or components thereof (see table below) |
  `set <config>` | Updates ACE-Box config. <config> can be any of key=value, e.g. `$ace set foo=bar` |



  
## Available install components:

  Component | Result |
  -- | -- |
  `microk8s` | Installs and configures MicroK8S |
  `gitea` | Installs and configures Gitea |
  `gitlab` | Installs and configures Gitlab |
  `dynatrace` | Installs and configures Dynatrace OneAgent and ActiveGate |
  `repositories` | Installs and configures Git Repositories |
  `keptn` | Installs and configures Keptn |
  `monaco` | Installs and configures Monaco |
  `jenkins` | Installs and configures Jenkins |
  `dashboard` | Installs and configures the dashboard |
  `awx` | Installs AWX |


## Available uninstall components:

Please refer to `$ ace --help` for available commands