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

## Versioning

At one point, you probably want to create a hardened release of the external repository you're working on. This is particularly important when an external use case is used as part of a hands-on tarining, etc.

A specific ref (version or branch) can be targeted by appending `@my-version` it to the `use_case` variable, e.g.:

```
use_case = "https://<user>:<token>@github.com/my-org/my-ext-use-case.git@v1.0.0"
```

## Curated roles

The following curated roles can be added to your external use case. See [template repository](https://github.com/dynatrace-ace/ace-box-ext-template) for examples.

|Role|Description|
|---|---|
|[awx](../user-skel/ansible/roles/awx/Readme.MD)|Installs AWX|
|[cloudautomation](../user-skel/ansible/roles/cloudautomation/Readme.md)|Links an existing Cloud Automation instance|
|[dashboard](../user-skel/ansible/roles/dashboard/Readme.md)|Installs the ACE-Box dashboard|
|[dt-oneagent-classic](../user-skel/ansible/roles/dt-oneagent-classic/Readme.md)|Installs the OneAgent on the host|
|[dt-activegate-private-synth-classic](../user-skel/ansible/roles/dt-activegate-private-synth-classic/Readme.md)|Installs a Synthetic enabled ActiveGate|
|[dt-operator](../user-skel/ansible/roles/dt-operator/Readme.md)|Installs the [Dynatrace Operator](https://github.com/Dynatrace/dynatrace-operator)|
|[gitea](../user-skel/ansible/roles/gitea/Readme.md)|Installs Gitea|
|[gitlab](../user-skel/ansible/roles/gitlab/Readme.md)|Installs Gitlab|
|[jenkins](../user-skel/ansible/roles/jenkins/Readme.md)|Installs Jenkins|
|keptn|Installs Keptn|
|[microk8s](../user-skel/ansible/roles/microk8s/Readme.md)|Installs Microk8s|
|[monaco](../user-skel/ansible/roles/monaco/Readme.md)|Installs Monaco|
|otel-collector|Installs an OpenTelemetry collector|
|[repository](../user-skel/ansible/roles/repository/Readme.md)|Initializes and publishes a local repository to Gitea or Gitlab|

## Example external use cases

|Name|Description|
|---|---|
|[ace-box-sandbox-easytravel](https://github.com/dynatrace-ace/ace-box-sandbox-easytravel)|A simple ace-box with EasyTravel monitored by Dynatrace|
[ace-box-ext-demo-auto-remediation-easytravel](https://github.com/dynatrace-ace/ace-box-ext-demo-auto-remediation-easytravel)|An auto remediation demo using Dynatrace, ServiceNow and Ansible|