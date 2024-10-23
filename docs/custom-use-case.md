# Custom use case

In addition to use cases provided natively by the ACE-Box, it is now possible to source custom use cases. This allows using the ACE-Box as a platform to develop own use cases, demos, trainings, etc.

An custom use case can be sourced and provisioned by simply providing a link to the Git repository of the custom use case. In order for the ACE-Box to understand such custom use cases, they need to comply with a specific structure. Further information, a template, as well as examples of such a structure can be found [here](https://github.com/dynatrace-ace/ace-box-ext-template).

To enable an custom use case the Terraform `use_case` variable has to be set to the Git repository URL. For example:

```
...
use_case = "https://<user>:<token>@github.com/my-org/my-ext-use-case.git"
...
```

> Attention: You usually want to host your code in a private repository. Therefore, credentials need to be added to the URL. For public repositories, it is also possible to omit credentials.

## Versioning

At one point, you probably want to create a hardened release of the custom repository you're working on. This is particularly important when an custom use case is used as part of a hands-on tarining, etc.

A specific ref (version or branch) can be targeted by appending `@my-version` it to the `use_case` variable, e.g.:

```
use_case = "https://<user>:<token>@github.com/my-org/my-ext-use-case.git@v1.0.0"
```

## Curated roles

The following curated roles can be added to your custom use case. See [template repository](https://github.com/dynatrace-ace/ace-box-ext-template) for examples.

|Role|Description|
|---|---|
|[app-easytrade](../user-skel/ansible_collections/ace_box/ace_box/roles/app-easytrade/Readme.md)|Installs the [Easy Trade demo application]|
|[app-easytravel](../user-skel/ansible_collections/ace_box/ace_box/roles/app-easytravel/Readme.md)|Installs the [Easy Travel demo application]|
|[app-hipstershop](../user-skel/ansible_collections/ace_box/ace_box/roles/app-hipstershop/Readme.md)|Installs the [Hipstershop demo application]|
|[app-simplenode](../user-skel/ansible_collections/ace_box/ace_box/roles/app-simplenode/README.md)|Installs the [Simplenode demo application]|
|[app-unguard](../user-skel/ansible_collections/ace_box/ace_box/roles/app-unguard/Readme.md)|Installs the [Unguard demo application]|
|[argocd](../user-skel/ansible_collections/ace_box/ace_box/roles/argocd/README.md)|Installs the [ArgoCD](https://argoproj.github.io/cd/)|
|[awx](../user-skel/ansible_collections/ace_box/ace_box/roles/awx/Readme.MD)|Installs AWX|
|[dashboard](../user-skel/ansible_collections/ace_box/ace_box/roles/dashboard/Readme.md)|Installs the ACE-Box dashboard|
|[dt-activegate-classic](../user-skel/ansible_collections/ace_box/ace_box/roles/dt-activegate-classic/Readme.md)|Installs a Classic VM based ActiveGate|
|[dt-oneagent-classic](../user-skel/ansible_collections/ace_box/ace_box/roles/dt-oneagent-classic/Readme.md)|Installs the OneAgent on the host|
|[dt-operator](../user-skel/ansible_collections/ace_box/ace_box/roles/dt-operator/Readme.md)|Installs the [Dynatrace Operator](https://github.com/Dynatrace/dynatrace-operator)|
|[dt-platform](../user-skel/ansible_collections/ace_box/ace_box/roles/dt-platform/README.md)|Manage apps on DT Platform|
|[gitea](../user-skel/ansible_collections/ace_box/ace_box/roles/gitea/Readme.md)|Installs Gitea|
|[gitlab](../user-skel/ansible_collections/ace_box/ace_box/roles/gitlab/Readme.md)|Installs Gitlab|
|[jenkins](../user-skel/ansible_collections/ace_box/ace_box/roles/jenkins/Readme.md)|Installs Jenkins|
|[k3s](../user-skel/ansible_collections/ace_box/ace_box/roles/k3s/README.md)|Installs K3S Kubernetes platform|
|k9s|Installs [K9S CLI](https://k9scli.io)|
|keptn|Installs Keptn|
|[local-ingress](../user-skel/ansible_collections/ace_box/ace_box/roles/local-ingress/Readme.md)|Create an ingress for non-kubernetes applications|
|[mattermost](../user-skel/ansible_collections/ace_box/ace_box/roles/mattermost/README.md)|Deploys [Mattermost Operator and Mattermost CRD](https://mattermost.com)|
|[microk8s](../user-skel/ansible_collections/ace_box/ace_box/roles/microk8s/Readme.md)|Installs Microk8s|
|[monaco-v2](../user-skel/ansible_collections/ace_box/ace_box/roles/monaco-v2/Readme.md)|Installs Monaco v2|
|otel-collector|Installs an OpenTelemetry collector|
|[repository](../user-skel/ansible_collections/ace_box/ace_box/roles/repository/Readme.md)|Initializes and publishes a local repository to Gitea or Gitlab|

## Example custom use cases

|Name|Description|
|---|---|
|[ace-box-sandbox-easytravel](https://github.com/dynatrace-ace/ace-box-sandbox-easytravel)|A simple ace-box with EasyTravel monitored by Dynatrace|
[ace-box-ext-demo-auto-remediation-easytravel](https://github.com/dynatrace-ace/ace-box-ext-demo-auto-remediation-easytravel)|An auto remediation demo using Dynatrace, ServiceNow and Ansible|

## Development

When developing an custom use case, it might be cumbersome to update/re-install an custom use case from a remote repository. We therefore introduced a flag for `ace enable` that allows you to work on your use case locally (i.e. ACE-Box) while keeping the remote as well as ACE-Box roles in sync.

Recommended development workflow:

1) Enable use case as you would normally, e.g. `ace enable https://github.com/dynatrace-ace/ace-box-ext-template.git`. This will clone the repository to a _repos_ folder within the user's _home_ directory and initially enable the use case. For example, in the case of `https://github.com/dynatrace-ace/ace-box-ext-template.git`, a new local repo will be created at _/home/ace/ace-box-ext-template_
2) Make any required changes in the local repository (e.g. in _/home/ace/ace-box-ext-template_).
3) Re-run the enable command with the local flag, e.g. `ace enable https://github.com/dynatrace-ace/ace-box-ext-template.git --local`. This will neither clone nor push, but enable the use with all the changes you made in step 2.
4) When you're happy with your changes, commit and push changes from your local (e.g. in _/home/ace/ace-box-ext-template_) to the remote repository. Your changes are now published, hence from now on `ace enable ...` (without the `--local` flag) commands will include your changes.

The `ace-box-ext-template` provides a template structure and examples of how to create a custom [ACE-Box](https://github.com/Dynatrace/ace-box) use case.

## Repository structure

It's important that your external use case complies to a specific folder structure. Most importantly, a folder `roles` need to be available at the repository root that includes at least a `my-use-case` (literal, not renamed) folder.

This `roles` folder and all of it's contents are synced with the ACE-Box's Ansible workdir. Ansible is used to provision use cases including external ones. Upon a successful content sync, Ansible tries to use this `my-use-case` folder as an Ansible role.

An Ansible role is expected to have the following structure:

```
roles/
  my-use-case/
    defaults/
      main.yml
    tasks/
      main.yml
    ...
```

For more information, please see the [official Ansible documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html).

The `my-use-case` role can itself source other Ansible roles. Such roles can either be provided as part of the external repository or included from the ACE-Box default roles. A list of ACE-Box roles can be found [here](https://github.com/Dynatrace/ace-box#curated-roles). Please also see the `examples_roles` folder for examples.

