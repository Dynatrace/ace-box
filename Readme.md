# Welcome to the ACE-BOX

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. 

## Check out [Troubleshooting](#troubleshooting) before reaching out!

Vagrant (Local) or Terraform (Cloud) are used for spinning up the VM, Ansible is used for setting up the various components.
- [Welcome to the ACE-BOX](#welcome-to-the-ace-box)
  - [Check out Troubleshooting before reaching out!](#check-out-troubleshooting-before-reaching-out)
  - [Release notes](#release-notes)
  - [Deployment Modes](#deployment-modes)
  - [Components](#components)
  - [Installation](#installation)
    - [Useful Terraform Commands](#useful-terraform-commands)
  - [Alt: Local installation with Vagrant](#alt-local-installation-with-vagrant)
    - [SSH into the box](#ssh-into-the-box)
    - [Vagrant cleanup](#vagrant-cleanup)
  - [Alt: Bring-your-own-VM](#alt-bring-your-own-vm)
  - [Default mode](#default-mode)
    - [Configuration settings](#configuration-settings)
    - [Resource Requirements](#resource-requirements)
  - [Troubleshooting](#troubleshooting)
  - [Accessing ACE Dashboard](#accessing-ace-dashboard)
  - [Behind the scenes](#behind-the-scenes)
  - [ACE-CLI](#ace-cli)
    - [Available commands (ace-cli version 0.0.1, can also be retrieved by running `ace --help`):](#available-commands-ace-cli-version-001-can-also-be-retrieved-by-running-ace---help)
    - [Available use cases:](#available-use-cases)
    - [Available install components:](#available-install-components)
    - [Available uninstall components:](#available-uninstall-components)


## Release notes
Please check [RELEASE_NOTES.md](RELEASE_NOTES.md)

## Deployment Modes
The ACE-BOX comes in two deployment modes based on your requirement:

  1. Local installation (on your workstation) using vagrant
  2. Cloud installation using terraform

## Components
ACE-BOX comes with the following components

| Component | Version |
|----|-------|
| microk8s | 1.18 |
| jenkins | lts (222.4 at time of writing) |
| helm | 3 |
| oneagent | latest |
| activegate for private synthetic node | latest |
| ace dashboard | built on the spot |
| gitea local git server | 1.11.6 |


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
        | use_case | no | Use case, the ACE Box will be prepared for. Options are `demo_default` (Default), `demo_appsec`, `demo_autorem`, `demo_gitlab` and `demo_all`  |

4. Run `terraform init`
5. Run `terraform apply`
6. Grab a coffee, this process will take some time...


### Useful Terraform Commands

Command  | Result
-------- | -------
`terraform destroy` | deletes any resources created by Terraform |
`terraform plan -destroy` | view a speculative destroy plan, to see what the effect of destroying would be |
`terraform show` | Outputs the resources created by Terraform. Useful to verify IP addresses and the dashboard URL. 


## Alt: Local installation with Vagrant
The local version can also be installed via Vagrant without the need for Terraform:

1. Check prereqs:
    - A workstation with at least **16GB of RAM** and **4 CPU cores (non-virtualized)**
    - Virtualbox installed (6.1.x tested)
    - Vagrant installed (2.2.7 tested)
    - Dynatrace tenant (prod or sprint, dev not recommended)
    - Hyper-V disabled on Windows machines, check [Troubleshooting](#troubleshooting) for more information
1. Go to folder `./terraform/vagrant/`
2. Create `ace.config.yml` e.g. by renaming `ace.config.yml.tpl` in place or copying from `refs`)
3. Set required variables:
    ```
    ---
    dynatrace:
      tenant:     "https://....dynatrace.com"
      apitoken:   "dt0c01...."
      paastoken:  "dt0c01...."
    ...
    ```
4. Run `vagrant up`
5. Grab a coffee, this process will take some time...

**Note:** The first time you might need to enter your passord at least once.

**Note:** Windows users will be asked to confirm security notifications a couple of times during the provisioning process, so keep an eye out for them.

### SSH into the box
Execute `vagrant ssh` to gain access to the VM

### Vagrant cleanup

Vagrant offers many commands to deal with the VM, check the below:

Command  | Result
-------- | -------
`vagrant destroy` | stops and deletes all traces of the vagrant machine |
`vagrant halt` | stops the vagrant machine - i.e. shutting down your workstation |
`vagrant suspend` | suspends the machine - i.e. sleep your workstation |
`vagrant resume` | resume a suspended vagrant machine |
`vagrant up` | starts and provisions the vagrant environment |
`vagrant box update` | update the base box from time to time to ensure it is the latest version. While provisioning a message will be shown that there are updates available |


## Alt: Bring-your-own-VM

Bringing your own Ubuntu Virtual Machine has not been tested, but should be possible:

1. Check prereqs:
    - An Ubuntu 18.04 virtual machine (Ubuntu 18.04 LTS "minimal" tested)
    - A public IP address
    - Port 80 and/or 443 exposed
    - A non-root user to run the script actions needs to be created (e.g. `ace`)
    - Repository cloned to VM
2. Run initialization script:
    ```
    $ cd user-skel
    $ ./init.sh
    ```
  This will install all necessary dependencies including the ace-cli.

3. Prepare ACE-Box by running the ace-cli and providing required values when prompted:
      ```
      $ ace prepare
      ```

4. Enable ACE-Box use case:
      ```
      $ ace enable demo_default
      ```
5. Grab a coffee, this process will take some time...


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


### Configuration settings

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
1. During testing it was found that when spinning up the VM while being connected to the corporate VPN it would sometimes have connectivity issues. It is best to disconnect from the VPN while provisioning. This will also drastically speed up the provision process. VPN issues manifests themselves mainly in Jenkins being empty (no pipelines or plugins installed) after provisioning. If you have this, turn off VPN and re-provision.
2. Some users had issues with (old) customer vpn software that was installed - not even connected -  causing issues with the virtual network adaptors. If you are having issues provisioning the VM, uninstall them when possible
3. If you are using a Windows workstation, ensure that Hyper-V native virtualization has been disabled as it clashes with virtualbox. Hyper-V support is on the roadmap. Check this [doc](https://docs.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v) on how to disable Hyper-V
4. If at any given time the provisioning fails, it is best to execute a `vagrant destroy` followed by a `vagrant up`
5. During testing there were some cases where Jenkins plugins refused to install while provisioning which renders the installation useless for the other usecases. In that case, it is best to execute a `vagrant destroy` followed by a `vagrant up`
6. On Windows machines the following error might occur `Stderr: VBoxManage.exe: error: Failed to open/create the internal network 'HostInterfaceNetworking-VirtualBox Host-Only Ethernet Adapter #2' (VERR_INTNET_FLT_IF_NOT_FOUND)`. It was found that disabling and enabling the network adaptor solved the issue
7. On Windows machines it might be that a `vagrant ssh` `gives vagrant@127.0.0.1: Permission denied (publickey,gssapi-keyex,gssapi-with-mic)` or similar. A common cause is that a privatekey file has too many people with access. This was seen when the repo was cloned in a subfolder of the C drive on Dynatrace laptops. It is suggested to use a subfolder of your home directory.
8. Your DNS settings might hinder the provisioning of the ace-box as the name does not resolve. It mainly manifests itself when it is waiting for gitea to be up. If you get a message like the below, you are most likely affected. The best way to go around it, is by changing the DNS settings on your network adaptor and point to for example the google DNS servers (8.8.8.8 and 8.8.4.4). A quick google search should tell you how to do that for your particular OS.
    ```
    FAILED - RETRYING: Gitea - Wait for API to be up (1 retries left).
    fatal: [ace-box]: FAILED! => {"attempts": 60, "changed": false, "content": "", "elapsed": 0, "msg": "Status code was -1 and not [200]: Request failed: <urlopen error [Errno -5] No address associated with hostname>", "redirected": false, "status": -1, "url": "http://gitea.192.168.50.10.nip.io/api/v1/admin/orgs?access_token=1c8d4fcef25b3ae2a15d17d29be64c2c7aa22501"}
    ```
9. Dynatrace Operator installation fails with "Error: Cluster already exists: ...": If you ever had a cluster created before please remove it from https://<dynatrace tenant>/#settings/kubernetesmonitoring;gf=all

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
`ACE-Box` comes with an including management tool called 'ace-cli'. This cli tool can be used to prepare and/or install the ACE-Box or certain components.

```
$ ace --version
```

### Available commands (ace-cli version 0.0.1, can also be retrieved by running `ace --help`):

  Command | Result |
  -- | -- |
  `prepare` | Prepares ACE-Box for further use (e.g. persists domain, protocol settings) |
  `enable <use case>` | Prepares ACE-Box for a use case by installing set of components (see table below) |
  `install <component>` | Installs ACE-Box or components thereof (see table below) |
  `uninstall <component>` | Uninstalls ACE-Box or components thereof (see table below) |
  `set <config>` | Updates ACE-Box config. <config> can be any of key=value, e.g. `$ace set foo=bar` |

### Available use cases:

  Component | Result |
  -- | -- |
  `demo_default` | Prepares ACE Box for a default demo, i.e. Quality Gates on Jenkins |
  `demo_appsec` | Prepares ACE Box for an AppSec demo, i.e. AppSec Quality Gates on Jenkins |
  `demo_autorem` | Prepares ACE Box for an auto remediation demo, i.e. Jenkins canary traffic shift with AWX |
  `demo_gitlab` | Prepares ACE Box for a default demo, i.e. Quality Gates on GitLab |
  `demo_all` | A combination of `demo_default` `demo_appsec` `demo_autorem` `demo_gitlab`. Please note that this will require a VM with more capacity|

  
### Available install components:

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


### Available uninstall components:

Please refer to `$ ace --help` for available commands
