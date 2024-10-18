# Welcome to the ACE-Box

**Note**
> This product is not officially supported by Dynatrace.

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. 

Terraform (Cloud) are used for spinning up the VM, Ansible is used for setting up the various components.
- [Welcome to the ACE-Box](#welcome-to-the-ace-box)
  - [Installation](#installation)
    - [Available use cases:](#available-use-cases)
    - [Useful Terraform Commands](#useful-terraform-commands)
  - [Alt: Bring-your-own-VM](#alt-bring-your-own-vm)
  - [Default mode](#default-mode)
  - [External use case](#external-use-case)
  - [Configuration settings](#configuration-settings)
    - [Resource Requirements](#resource-requirements)
  - [Troubleshooting](#troubleshooting)
  - [Accessing ACE Dashboard](#accessing-ace-dashboard)
  - [Behind the scenes](#behind-the-scenes)
  - [ACE-CLI](#ace-cli)
  - [Licensing](#licensing)


## Installation
The recommended way of installing any ACE box version, local or cloud, is via Terraform (scroll down for alternatives). Check the [Azure](terraform/azure/Readme.md), [AWS](terraform/aws/Readme.md) or [Google Cloud](terraform/gcloud/Readme.md) subfolders for additional instructions.

1. Check prereqs:
     - Terraform installed
     - Dynatrace tenant (prod or sprint, dev not recommended)
2. Go to folder `./terraform/<aws, azure or gcloud>/`
3. Set required Terraform variables:
   1. Check out the `Readme.md` for your specific cloud provider to verify the provider-specific configuration that needs to be set
   2. Add ace-box specific information (see below for more details)
   3. Set them by either
      1. adding `dt_tenant, dt_api_token, ...` to a `terraform.tfvars` file:
          ```
          dt_tenant = "https://....dynatrace.com"
          dt_api_token = "dt0c01...."
          ...
          ```
      2. Or by setting environment variables:
          ```
          export TF_VAR_dt_tenant=https://....dynatrace.com
          export TF_VAR_dt_api_token=dt0c01....
          ...
          ```
          For details and alternatives see https://www.terraform.io/docs/language/values/variables.html
    4. The following variables are available:
        | var | type | required | details |
        | --- | --- | -------- | ------- |
        | dt_tenant | string | **yes** | Dynatrace environment URL |
        | dt_api_token | string | **yes** | Initial API token with scopes `apiTokens.read` and `apiTokens.write`. This token will be used by various roles to manage their own tokens. |
        | dt_owner_team | string | yes | Required when using Dynatrace enviroments. Check with Dynatrace GCP/AWS admins for your specific team value.
        | dt_owner_email | string | yes |Required when using Dynatrace enviroments. Format:  name_surname-dynatrace_com. (replace "." with "_" and "@" with "-")
        | acebox_user | string | no | User, for which home directory will be provisioned (Default: "ace") |
        | use_case | string | no | Hardened use cases embedded in the ACE-Box. Options are:<ul><li>`demo_all` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-all/README.md))</li><li>`demo_monaco_gitops`</li><li>`demo_ar_workflows_ansible` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md))</li><li>`demo_ar_workflows_gitlab` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md))</li><li>`demo_release_validation_srg_gitlab` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md))</li><li>URL to an external repository (see below)</li></ul>|
        | extra_vars | map(string) | no | Additional variables that are passed and persisted on the VM. Variables can be sourced as `extra_vars.<variable key>` for e.g. external use cases |
        |dashboard_user|string|no|ACE-Box dashboard user (Default: "dynatrace")|
        |dashboard_password|string|no|ACE-Box dashboard password. If not set, a random password will be generated. The password can retrieved by running `terraform output dashboard_password`. **Note**: Output shows leading and trailing quotes that are not part of the password!|

        Please consult our dedicated readmes for [AWS](terraform/aws/Readme.md), [MS Azure](terraform/azure/Readme.md) and [Google Cloud](terraform/gcloud/Readme.md) specific variables.

        > Note: `demo_all` requires extra variables. See [use case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-all/README.md) for details.
        
        > Note: `demo_ar_workflows_ansible` requires extra variables. See [use case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md) for details.

        > Note: `demo_ar_workflows_gitlab` requires extra variables. See [use case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md) for details.
       
        > Note: `demo_release_validation_srg_gitlab` requires extra variables. See [use case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md) for details.

4. Run `terraform init`
5. Run `terraform apply`
6. Grab a coffee, this process will take some time...

### Available use cases:

  Use Case | k8s | OneAgent | Synth AG | Jenkins | Gitea | Registry | GitLab | AWX | Keptn | Dashboard | Notes |
  -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
  [`demo_release_validation_srg_gitlab`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md) | x | x | x |  |  |  | x |  | x |  x | Demo flow for Release Validation using GitLab/Site Reliability Guardian |
  [`demo_ar_workflows_ansible`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md) | x | x | | x | x | x | x | x |  | x | Demo flow for Auto Remediation using Gitlab/Dynatrace Workflows |
  [`demo_ar_workflows_gitlab`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md) | x | x | | | | x |  | x |  | x | Demo flow for Auto Remediation using Gitlab/Dynatrace Workflows |
  `demo_monaco_gitops` | x | x | x | x | x | x |  |  |  | x | Demo flow for Application Onboarding using Jenkins/Gitea |

  > Note: You can also enter a link to an external repository (e.g.: `https://github.com/my-org/my-ext-use-case.git`) if you want to load an external use case. See [External Use Case](#external-use-case) for more details and examples

### Useful Terraform Commands

Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL. 

## Alt: Bring-your-own-VM

Bringing your own Ubuntu Virtual Machine has not been tested, but should be possible.

Check out [BYO VM](docs/byo-vm.md) documentation for more details.

## External use case

In addition to use cases provided natively by the ACE-Box, it is possible to source external use cases. This allows using the ACE-Box as a platform to develop own use cases, demos, trainings, etc.

Check out [External Use Case](docs/external-use-case.md) documentation for more info.

## Configuration settings

The ace-box comes with a certain number of features and settings that can be set/enabled/disabled. Adding and removing features will change the resource consumption. Most settings have default values and do not need to be set explicitly, but they can be overwritten if needed. Please refer to the ace cli instruction below.


### Resource Requirements
Each feature requires a certain amount of resources - on top of the base microk8s requirements.
The resource requirements below are measured using Dynatrace's Kubernetes monitoring
Feature  | Kubernetes Resource Usage | 
-------- | ------- |
GitLab | 11 mCores, 2GB RAM
Jenkins | 1mCore, 1GB RAM
Gitea | 2 mCores, 250MB RAM

For up to date information, check the currated role's Readme for more information


## Troubleshooting
1. Make sure that the cloud account you are using for provisioning has sufficient permissions to create all the resources in the particular region
   

## Accessing ACE Dashboard
At the end of the provisioning of any of the out of the box supported use cases, an ACE Dashboard gets created with more information on how to use the ACE-BOX. Check out [ACE Dashboard](Dashboard.md) for more details.

## Behind the scenes
Spinning up an ACE-Box can be split into two main parts:

1) Deploying a VM: This happens automatically when you use the included Terraform projects or you can bring your own VM.
2) After a VM is available, provisioners install the actual application (i.e. "ACE-Box" logic). This process itself consists of a couple steps:
   1) Copying working directory: Everything in [user-skel](/user-skel) is copied to the VM
   2) Package manager update: [init.sh](/user-skel/init.sh) is run. This runs an `apt-get` update and installs `Python3.9`, Ansible and the `ace-cli`
   3) `ace prepare` is run, which asks for ACE-Box specific configurations (e.g. protocol, custom domain, ...)
   4) Once the VM is prepared, the actual installation happens by running `ace enable USECASE_NAME|USECASE_URL`

## ACE-CLI
Check out the [ACE CLI](docs/ace-cli.md) page for more details.

## Licensing

Please see `LICENSE` in repo root for license details.

License headers can be added automatically be running `./tools/addlicenseheader.sh` (see file for details).
