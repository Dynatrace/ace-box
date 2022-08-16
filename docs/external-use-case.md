# External use case

In addition to use cases provided natively by the ACE-Box, it is now possible to source external use cases. This allows using the ACE-Box as a platform to develop own use cases, demos, trainings, etc.

An external use case can be sourced and provisioned by simply providing a link to the Git repository of the external use case. In order for the ACE-Box to understand such external use cases, they need to comply with a specific structure. Further information, a template, as well as examples of such a structure can be found [here](https://github.com/dynatrace-ace/ace-box-ext-template).

To enable an external use case the Terraform `use_case` variable has to be set to the Git repository URL. For example:

```
...
use_case = "https://<user>:<token>@github.com/my-org/my-ext-use-case.git"
...
```

> Attention: You usually want to host your code in a private repository. Therefore, credentials need to be added to the URL. For public repositories, it is also possible to omit credentials.

## Curated roles

The following curated roles can be added to your external use case. See [template repository](https://github.com/dynatrace-ace/ace-box-ext-template) for examples.

|Role|Description|
|---|---|
|awx|Installs AWX|
|cloudautomation|Links an existing Cloud Automation instance|
|dashboard|Installs the ACE-Box dashboard|
|dt-activegate|Installs a Synthetic enabled ActiveGate|
|dt-oneagent|Installs the OneAgent operator|
|gitea|Installs Gitea|
|gitlab|Installs Gitlab|
|jenkins|Installs Jenkins|
|keptn|Installs Keptn|
|microk8s|Installs Microk8s|
|monaco|Installs Monaco|
|otel-collector|Installs an OpenTelemetry collector|
|repository|Initializes and publishes a local repository to Gitea or Gitlab|

## Example external use cases

|Name|Description|
|---|---|
|[ace-box-sandbox-easytravel](https://github.com/dynatrace-ace/ace-box-sandbox-easytravel)|A simple ace-box with EasyTravel monitored by Dynatrace|