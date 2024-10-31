**Note:**
> This product is not officially supported by Dynatrace.

<br>

# Welcome to the ACE-Box

- [What is it?](#what-is-it)
- [Who is it for?](#who-is-it-for)
- [Use-cases](#use-cases)
  - [Out-of-the-box use-cases](#out-of-the-box-use-cases)
  - [Custom use-cases](#custom-use-cases)
- [Architecture](#architecture)
  - [ACE CLI](#ace-cli)
  - [ACE Dashboard](#ace-dashboard)
- [Installation](#installation)
  - [Useful Terraform Commands](#useful-terraform-commands)
  - [Behind the scenes](#behind-the-scenes)
- [Licensing](#licensing)

<br>

## What is it?
The ACE-Box is a framework that can be used as a portable sandbox, demo and testing environment. It has been designed to simplify resource deployment and to streamline content creation.
The ACE-box allows to deploy compute instances (usually cloud-hosted virtual machines) and to install modules on them. 
The framework follows a declarative approach where modules, resources and configurations are defined in a set of configuration files.

<br>

## Who is it for?
The ACE-Box is ideal for anybody who needs to create isolated testing environments, run demonstrations, or build reproducible deployment setups. It caters to those seeking to prototype new features, test new features and integrations, or deliver hands-on training in an efficient and portable manner.

<br>

## Use-cases
A use-case aim to reproduce real-world setups for purposes like feature demonstrations, hands-on training, or system testing. Each use-case is defined by a set of configuration files that ACE-Box uses to automatically deploy the necessary infrastructure and apply the required configurations on the systems.

### Use-case example: Basic Observability Demo

The following use-case can be used to demo the Dynatrace Basic Observability features.

The ACE-Box has been configured to spin up a VM and use different built-in modules to install on that machine the following components:
- k8s (k3s)
- Dynatrace Operator
- Easytrade (demo app)

The environment (VM + the modules installed on it) is automatically provisioned by the framework and it can be leveraged to showcase Dynatrace observability capabilities:

![](./assets/use-case-example.png)

### Out-of-the-box use-cases
The ACE-Box framework comes with a set of use-cases which are referred as _out-of-the-box use-cases_ which have been added from time to time by the ACE-Box contributors. 

The list of available out-of-the-box use-cases is reported below:
use-case | k8s | OneAgent | Synth AG | Jenkins | Gitea | Registry | GitLab | AWX | Keptn | Dashboard | Notes |
-- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
[`demo_release_validation_srg_gitlab`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md) | x | x | x |  |  |  | x |  | x |  x | Demo flow for Release Validation using GitLab/Site Reliability Guardian |
[`demo_ar_workflows_ansible`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md) | x | x | | x | x | x | x | x |  | x | Demo flow for Auto Remediation using Gitlab/Dynatrace Workflows |
[`demo_ar_workflows_gitlab`](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md) | x | x | | | | x |  | x |  | x | Demo flow for Auto Remediation using Gitlab/Dynatrace Workflows |
`demo_monaco_gitops` | x | x | x | x | x | x |  |  |  | x | Demo flow for Application Onboarding using Jenkins/Gitea |

### Custom use-cases
In addition to the out-of-the-box use-cases provided natively by the ACE-Box, it is possible to source custom use-cases. This allows using the ACE-Box as a platform to develop your own use-cases, demonstrations, trainings, etc.

Check out [Custom use-case](docs/custom-use-case.md) documentation for more info.

<br>

## Architecture
_Terraform_ is used for spinning up and configure the compute instance and all the needed resources within the Cloud Provider environment (AWS, GCP, Azure).
_Ansible_ is used for setting up the various modules on top of the compute instance.
Referring to the [previous example](#use-case-example), Terraform is used to provision the virtual machine and some auxiliary resources on the Cloud Provider environment, while Ansible roles are used to deploy the k8s cluster, Dynatrace operator and Easytrade application on the VM.

### ACE CLI
Check out the [ACE CLI](docs/ace-cli.md) page for more details.

### ACE Dashboard
At the end of the provisioning of any of the out of the box supported use-cases, an ACE Dashboard gets created with more information on how to use the ACE-BOX. Check out [ACE Dashboard](Dashboard.md) for more details.

<br>

## Installation
The recommended way of installing any ACE box version, local or cloud, is via Terraform (scroll down for alternatives). Check the [Azure](terraform/azure/Readme.md), [AWS](terraform/aws/Readme.md) or [Google Cloud](terraform/gcloud/Readme.md) subfolders for additional instructions.

1. Check prereqs:
     - Terraform installed
     - Dynatrace tenant (prod or sprint, dev not recommended)
2. Go to folder `./terraform/<aws, azure or gcloud>/` or check out [BYO VM](docs/byo-vm.md) documentation for more details on how to use a VM of your choice.
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
        | use_case | string | no | Hardened use-cases embedded in the ACE-Box. Options are:<ul><li>`demo_all` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-all/README.md))</li><li>`demo_monaco_gitops`</li><li>`demo_ar_workflows_ansible` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md))</li><li>`demo_ar_workflows_gitlab` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md))</li><li>`demo_release_validation_srg_gitlab` (ATTENTION: Requires [extra vars](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md))</li><li>URL to an external repository (see below)</li></ul>|
        | extra_vars | map(string) | no | Additional variables that are passed and persisted on the VM. Variables can be sourced as `extra_vars.<variable key>` for e.g. custom use-cases |
        |dashboard_user|string|no|ACE-Box dashboard user (Default: "dynatrace")|
        |dashboard_password|string|no|ACE-Box dashboard password. If not set, a random password will be generated. The password can retrieved by running `terraform output dashboard_password`. **Note**: Output shows leading and trailing quotes that are not part of the password!|

        Please consult our dedicated readmes for [AWS](terraform/aws/Readme.md), [MS Azure](terraform/azure/Readme.md) and [Google Cloud](terraform/gcloud/Readme.md) specific variables.

        > Note: `demo_all` requires extra variables. See [use-case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-all/README.md) for details.
        
        > Note: `demo_ar_workflows_ansible` requires extra variables. See [use-case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-ansible/README.md) for details.

        > Note: `demo_ar_workflows_gitlab` requires extra variables. See [use-case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-ar-workflows-gitlab/README.md) for details.
       
        > Note: `demo_release_validation_srg_gitlab` requires extra variables. See [use-case README](user-skel/ansible_collections/ace_box/ace_box/roles/demo-release-validation-srg-gitlab/README.md) for details.

4. Run `terraform init`
5. Run `terraform apply`
6. Grab a coffee, this process will take some time...

### Useful Terraform Commands
Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL. 

### Behind the scenes
Spinning up an ACE-Box instance can be split into two main parts:

1) Deploying a VM: This happens automatically when you use the included Terraform projects or you can bring your own VM.
2) After a VM is available, the provisioners install the ACE-Box framework. This process itself consists in a couple steps:
   1) Working directory copy: everything in [user-skel](/user-skel) is copied to the VM local filesystem
   2) Package manager update: [init.sh](/user-skel/init.sh) is run. This runs an `apt-get` update and installs `Python3.9`, `Ansible` and the `ace-cli`
   3) `ace prepare` command is run, which asks for ACE-Box specific configurations (e.g. protocol, custom domain, ...)
   4) Once the VM is prepared, `ace enable USECASE_NAME|USECASE_URL` command is run to perform the actual deployment of the modules (e.g: softwares, applications, ..) and implement the configurations that have been defined in the use-case's configuration files

<br>

## Licensing
Please see `LICENSE` in repo root for license details.

License headers can be added automatically be running `./tools/addlicenseheader.sh` (see file for details).
