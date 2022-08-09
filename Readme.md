# Welcome to the ACE-BOX

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. 

Vagrant (Local) or Terraform (Cloud) are used for spinning up the VM, Ansible is used for setting up the various components.
- [Welcome to the ACE-BOX](#welcome-to-the-ace-box)
  - [Installation](#installation)
    - [Available use cases:](#available-use-cases)
    - [Useful Terraform Commands](#useful-terraform-commands)
  - [Alt: Local installation with Vagrant](#alt-local-installation-with-vagrant)
  - [Alt: Bring-your-own-VM](#alt-bring-your-own-vm)
  - [Default mode](#default-mode)
  - [External use case](#external-use-case)
  - [Configuration settings](#configuration-settings)
    - [Resource Requirements](#resource-requirements)
  - [Troubleshooting](#troubleshooting)
  - [Accessing ACE Dashboard](#accessing-ace-dashboard)
  - [Behind the scenes](#behind-the-scenes)
  - [ACE-CLI](#ace-cli)


## Installation
The recommended way of installing any ACE box version, local or cloud, is via Terraform (scroll down for alternatives). Check the [Azure](terraform/azure/Readme.md), [AWS](terraform/aws/Readme.md), [Google Cloud](terraform/gcloud/Readme.md) and [Vagrant](terraform/vagrant/Readme.md) subfolders for additional instructions.

1. Check prereqs:
     - Terraform installed (+ Vagrant for local installation)
     - Dynatrace tenant (prod or sprint, dev not recommended)
2. Go to folder `./terraform/<aws, azure, gcloud or vagrant>/`
3. Set required Terraform variables:
   1. Check out the `Readme.md` for your specific cloud provider to verify the provider-specific configuration that needs to be set
   2. Add ace-box specific information (see below for more details)
   3. Set them by either
      1. adding `dt_tenant, dt_api_token, dt_paas_token` to a `terraform.tfvars` file:
          ```
          dt_tenant = "https://....dynatrace.com"
          dt_api_token = "dt0c01...."
          dt_paas_token = "dt0c01...."
          ca_tenant = "https://abc12345.cloudautomation...com"
          ca_api_token = "xyz123"
          ```
      2. Or by setting environment variables:
          ```
          export TF_VAR_dt_tenant=https://....dynatrace.com
          export TF_VAR_dt_api_token=dt0c01....
          export TF_VAR_dt_paas_token=dt0c01....
          export TF_VAR_ca_tenant=...
          export TF_VAR_ca_api_token=...
          ```
          For details and alternatives see https://www.terraform.io/docs/language/values/variables.html
    4. The following variables are available:
        | var | required | details |
        | --- | -------- | ------- |
        | dt_tenant | **yes** | Dynatrace environment URL |
        | dt_api_token | **yes** | Dynatrace API token |
        | dt_paas_token | **yes** | Dynatrace PaaS token |
        | ca_tenant | no | Dynatrace Cloud Automation environment URL. **Note**: if not set, Keptn will be installed and used instead |
        | ca_api_token | no | Dynatrace Cloud Automation api token. **Note**: if not set, Keptn will be installed and used instead |
        | acebox_user | no | User, for which home directory will be provisioned (Default: "ace") |
        | use_case | no | Use case, the ACE Box will be prepared for. Options are:<ul> <li>`demo_default` (Default)</li><li>`demo_quality_gates_jenkins`</li><li>`demo_security_gates_jenkins`</li><li>`demo_quality_gates_gitlab`</li><li>`demo_auto_remediation_ansible`</li><li>`demo_all`</li><li>`demo_monaco_gitops`<li>URL to an external repository (see below)</li></ul>|

4. Run `terraform init`
5. Run `terraform apply`
6. Grab a coffee, this process will take some time...

### Available use cases:

  Use Case | k8s | OneAgent | Synth AG | Jenkins | Gitea | Registry | GitLab | AWX | Keptn | Dashboard | Notes |
  -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
  `demo_default` | x | x | x | x | x | x |  |  | x | x | See `demo_quality_gates_jenkins` below. `demo_default` and `demo_quality_gates_jenkins` can be used interchangeably. |
  `demo_quality_gates_jenkins` | x | x | x | x | x | x |  |  | x | x | Demo flow for Quality Gates using Jenkins/Gitea/Cloud Automation. `demo_default` and `demo_quality_gates_jenkins` can be used interchangeably. |
  `demo_security_gates_jenkins` | x | x | x | x | x | x |  |  | x |  x | Demo flow for Security Gates using Jenkins/Gitea/Cloud Automation |
  `demo_quality_gates_gitlab` | x | x | x |  |  |  | x |  | x |  x | Demo flow for Quality Gates using GitLab/Cloud Automation |
  `demo_auto_remediation_ansible` | x | x | x | x | x | x |  | x |  | x | Demo flow for Quality Gates using Jenkins/Gitea/Cloud Automation |
  `demo_monaco_gitops` | x | x | x | x | x | x |  |  |  | x | Demo flow for Quality Gates using Jenkins/Gitea/Cloud Automation |

  > Note: When specifying Cloud Automation instance details, Keptn will not be deployed

  > Note: You can also enter a link to an external repository (e.g.: `https://github.com/my-org/my-ext-use-case.git`) if you want to load an external use case. See [External Use Case](#external-use-case) for more details

### Useful Terraform Commands

Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL. 


## Alt: Local installation with Vagrant
Check [Vagrant instructions](terraform/vagrant/Readme.md)


## Alt: Bring-your-own-VM

Bringing your own Ubuntu Virtual Machine has not been tested, but should be possible.

Check out [BYO VM](docs/byo-vm.md) documentation for more details.

## Default mode

By default, an ACE Box is prepared for a demo use case (i.e. "demo_default"). The following resources will be deployed, configured and ready for you to use:

- Microk8s 
- Helm 
- Dynatrace Acitve Gate for Private Synthetic gets installed and automatically configured in the Dynatrace tenant as a Private Location
- Dynatrace OneAgent operator gets installed via Helm
- Gitea gets installed, a user gets created and a repository created
- Cloud Automation instance linked (opt. Keptn installed)
- Jenkins gets installed with all the plugins that are needed, pipeline libraries get added for interaction with Cloud Automation (Keptn) and Dynatrace, pipelines get created and linked to the gitea repository
- A dashboard gets built and deployed with links to all the components as well as credentials
- A kubernetes ingress gets configured for all applications so it is easy to navigate
- Dynatrace tag rules and request attributes get set up via the API

## External use case

In addition to use cases provided natively by the ACE-Box, it is now possible to source external use cases. This allows using the ACE-Box as a platform to develop own use cases, demos, trainings, etc.

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


## Troubleshooting
1. For Vagrant troubleshooting, check [Vagrant](terraform/vagrant/Readme.md#troubleshooting)
2. Make sure that the cloud account you are using for provisioning has sufficient permissions to create all the resources in the particular region
   

## Accessing ACE Dashboard
At the end of the provisioning, an ACE Dashboard gets created with more information on how to use the ACE-BOX. Check out [ACE Dashboard](Dashboard.md) for more details.

## Behind the scenes
Spinning up an ACE-Box can be split into two main parts:

1) Deploying a VM: This can either happen locally via Vagrant or a VM is can be created in your Cloud Account.
2) After a VM is available, provisioners install the actual application (i.e. "ACE-Box" logic). This process itself consists of a couple steps:
   1) Copying working directory: Everything in [user-skel](/user-skel) is copied to the VM
   2) Package manager update: [init.sh](/user-skel/init.sh) is run. This runs an `apt-get` update and installs `Python3.9`, Ansible and the `ace-cli`
   3) `ace prepare` is run, which asks for ACE-Box specific configurations (e.g. protocol, custom domain, ...)
   4) Once the VM is prepared, the actual installation happens by running `ace install default`

## ACE-CLI
Check out the [ACE CLI](docs/ace-cli.md) page for more details.
