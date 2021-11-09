# Welcome to the ACE-BOX

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. 

## Check out [Troubleshooting](#troubleshooting) before reaching out!

Vagrant (Local) or Terraform (Cloud) are used for spinning up the VM, Ansible is used for setting up the various components.
- [Welcome to the ACE-BOX](#welcome-to-the-ace-box)
  - [Check out Troubleshooting before reaching out!](#check-out-troubleshooting-before-reaching-out)
  - [Release notes](#release-notes)
  - [Deployment Modes](#deployment-modes)
  - [Components](#components)
  - [Local version using vagrant](#local-version-using-vagrant)
  - [Cloud Version using terraform](#cloud-version-using-terraform)
  - [Spinning up the ace-box](#spinning-up-the-ace-box)
    - [Step 1 - Clone the ace-box repository](#step-1---clone-the-ace-box-repository)
    - [Step 2 - change directory to microk8s](#step-2---change-directory-to-microk8s)
    - [Step 3 - create a config file](#step-3---create-a-config-file)
      - [config.yml settings](#configyml-settings)
      - [Resource Requirements](#resource-requirements)
      - [Demo mode](#demo-mode)
      - [Training mode](#training-mode)
    - [Step 4 - Provision](#step-4---provision)
    - [Troubleshooting](#troubleshooting)
  - [Accessing ACE Dashboard](#accessing-ace-dashboard)
  - [Ansible playbooks](#ansible-playbooks)
  - [SSH into the box](#ssh-into-the-box)
  - [Cleaning up](#cleaning-up)
    - [Vagrant](#vagrant)
  - [Behind the scenes](#behind-the-scenes)


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

## Local version using vagrant
To run the ace-box locally, the following is required:
- a workstation with at least **16GB of RAM** and **4 CPU cores (non-virtualized)**
- virtualbox installed (6.1.x tested)
- vagrant installed (2.2.7 tested)
- Dynatrace tenant (prod or sprint, dev not recommended)
- Hyper-V disabled on Windows machines, check [Troubleshooting](#troubleshooting) for more information

## Cloud Version using terraform
In case you require the ACE-BOX to run on a cloud provider, check out [Terraform Instructions](terraform/Readme.md) for more details. Currently GCP, AWS and Azure are supported.

## Spinning up the ace-box

### Step 1 - Clone the ace-box repository
Make sure that you have the ace-box repository cloned locally

### Step 2 - change directory to microk8s
```
$ cd microk8s
```
### Step 3 - create a config file
You need to create a config file called `config.yml` that contains the information needed to bring up the vm. You can use `config.yml.template` as a base.

**Note1:** YAML is space sensitive so make sure the indentation is correct. YAML does not allow [tabs](https://yaml.org/faq.html) - even though most code editors replace them with spaces for you!

**Note2:** If you had forked this repo and want to update it with your own changes, a `gitignore` entry has been added for the config.yml file so you do not accidentally spill your tokens :-).

#### config.yml settings

The ace-box comes with a certain number of features and settings that can be set/enabled/disabled at provisioning. Adding and removing features will change the resource consumption. Most settings have default values and do not need to be set explicitly, but they can be overwritten if needed.

Default behaviour can be verified in [initial.yml](microk8s/ansible/initial.yml)

Flag  | Description | Required | Default 
-------- | ------- | ------- | ------- |
dynatrace.tenant | Dynatrace environment to point to. https://abc12345.live.dynatrace.com OR https://[managed-domain]/e/[environmentguid] | ***yes*** | not set
dynatrace.apitoken | API token. Best to give all scopes | ***yes*** | not set
dynatrace.paastoken | PaaS token for OneAgent and ActiveGate installation | ***yes*** | not set
acebox.specs.cpu | Number of virtual CPU cores for VM. Minimal 3 | ***yes*** | not set
acebox.specs.mem | Memory assignment for VM in MB. Minimal 8196 | ***yes*** | not set
acebox.specs.priv_ip | Private IP for VM. Set to 192.168.50.10 | ***yes*** | not set
acebox.specs.disk | Disk size of VM. Set to 50GB | ***yes*** | not set
acebox.features.mode | Mode for ace-box. Choose between `training` or `demo` | no | training
acebox.features.oneagent | Install OneAgent | no | true
acebox.features.activegate | Install Private Synthetic ActiveGate | no | false
acebox.features.activegatekube | EXPERIMENTAL: Deploy ActiveGate on Kubernetes | no | false
acebox.features.jenkins | Install Jenkins | no | true
acebox.features.gitea | Install Gitea local git server | no | false
acebox.features.dashboard | Install ACE dashboard | no | false
acebox.features.keptn | Install Keptn Quality Gates | no | false
acebox.features.gitlab | Install Gitlab | no | false
acebox.features.awx | Install AWX | no | false
acebox.config.keptn.version | Keptn version to install | no | 0.8.7
acebox.config.keptn.dynatrace_service_version | Keptn Dynatrace Service version to install **WARNING:** when overwriting keptn services versions, make sure they are compatible with keptn base version! | no | 0.16.0
acebox.config.keptn.jenkins.helm_chart_version | Version of the Jenkins helm chart to use (is not equal to Jenkins version) | no | 1.27.0
acebox.config.keptn.version | Version of Jenkins to deploy | no | lts
acebox.config.keptn.set_creds | placeholder for future | no | n/a
acebox.config.keptn.set_jenkinslib | placeholder for future | no | n/a
acebox.config.keptn.jenkins_lib_url | URL for ACE Jenkins library | no | https://github.com/dynatrace-ace/ace-jenkins-extensions.git
acebox.config.keptn.keptn_lib_url | URL for Jenkins Keptn library | no | https://github.com/keptn-sandbox/keptn-jenkins-library.git
acebox.config.microk8s.domain_ext | domain extension for ace-box, can be set to `nip.io` or `xip.io` | ***yes*** | nip.io
acebox.config.microk8s.addons | microk8s addons to enable. **WARNING** may break ace-box functionality | no | dns storage registry ingress 
acebox.config.git.version | version of gitea to install | no | 1.11.6
acebox.config.git.user | default login for gitea | no | dynatrace
acebox.config.git.password | default password for gitea | no | dynatrace
acebox.config.git.email | email address assigned to gitea user for account creation purposes, can be fake email | no | ace@ace.ace 
acebox.config.git.org | organization name created on gitea during install | no | ace 
acebox.config.git.repo | repository name created on gitea during install | no | ace 
acebox.config.activegate.download_location | overwrite where the oneagent will be downloaded, storing it inside /vagrant/* will speed up subsequent destroy and up commands as the AG does not have to be re-downloaded | no | not set
acebox.config.dashboard.user | Dashboard login username | no | dynatrace
acebox.config.dashboard.password | Dashboard login password | no | dynatrace




#### Resource Requirements
Each feature requires a certain amount of resources - on top of the base microk8s requirements.
The resource requirements below are measured using Dynatrace's Kubernetes monitoring
Feature  | Kubernetes Resource Usage | 
-------- | ------- |
GitLab | 11 mCores, 2GB RAM
Jenkins | 1mCore, 1GB RAM
Gitea | 2 mCores, 250MB RAM




#### Demo mode

The below config.yml example will spin up an ace-box with all features in a demo mode (everything pre-configured).
This file is also available as `microk8s/config.yml.demotmpl`. You can just rename it to `microk8s/config.yml` and modify it accordingly.
In demo mode, the following gets installed and configured:
- Microk8s 
- Helm 
- Dynatrace Acitve Gate for Private Synthetic gets installed and automatically configured in the Dynatrace tenant as a Private Location
- Dynatrace OneAgent operator gets installed via Helm
- Gitea gets installed, a user gets created and a repository created
- Keptn Quality Gates gets installed
- Jenkins gets installed with all the plugins that are needed, pipeline libraries get added for interaction with keptn and Dynatrace, pipelines get created and linked to the gitea repository
- A dashboard gets built and deployed with links to all the components as well as credentials
- A kubernetes ingress gets configured for all applications so it is easy to navigate
- Dynatrace tag rules and request attributes get set up via the API

```
dynatrace:
  tenant:     ''    # https://abc12345.live.dynatrace.com OR https://[managed-domain]/e/[environmentguid]
  apitoken:   ''    # full scope
  paastoken:  ''
acebox:
  specs:
    cpu: 3                      
    mem: 8196                   
    priv_ip: "192.168.50.10"    
    disk: "50GB"
  features:
    mode: "demo"                
  config:
    microk8s:
      domain_ext: "nip.io"      
```

Setting `mode` to `demo` will overwrite the following:
Flag  | Description | Set to
-------- | ------- | ------- |
acebox.specs.features.activegate | Install Private Synthetic ActiveGate | true
acebox.specs.features.activegatekube | EXPERIMENTAL: Deploy ActiveGate on Kubernetes | true
acebox.specs.features.jenkins | Install Jenkins | true
acebox.specs.features.gitea | Install Gitea local git server | true
acebox.specs.features.dashboard | Install ACE dashboard | true
acebox.specs.features.keptn | Install Keptn Quality Gates | true
acebox.specs.features.gitlab | Install Gitlab | true


#### Training mode

Training mode can be used to have more control over the features and configuration of the ace-box. 

### Step 4 - Provision
Run the following commands to bring up the virtual machine
```shell
vagrant up
```

Check [Behind the scenes](#behind-the-scenes) for more detail about what happens now
  
**This process will take some time, grab a coffee**

**Note:** The first time you will need to enter your passord at least once.

**Note:** Windows users will be asked to confirm security notifications a couple of times during the provisioning process, so keep an eye out for them.

### Troubleshooting
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

## Ansible playbooks
All Ansible playbooks run by the auto provisioning script can also be run standalone. Certain tasks (playbooks) can be filtered by using tags as per definition below:

Tag | Result |
- | - |
`init` | Prepares VM for further use (e.g. installs apt packages) |
`post_install` | Cleans up after installation (e.g. prints config details) |
`k8s` | Installs and configures microk8s, helm and cert manager |
`monaco` | Installs and configures Monaco |
`monaco_uninstall` | Uninstalls Monaco |
`dt_core` | Installs and configures Dynatrace Cluster ActiveGate and OneAgent. To prevent naming conflicts, this tag also removes legacy Kubernetes clusters from the Dynatrace tenant. |
`git` | Installs and configures Gitea (`feature_gitea` enabled) and / or Gitlab (`feature_gitlab` enabled) |
`git_uninstall` | Uninstalls Gitea (`feature_gitea` enabled) |
`keptn` | Installs and configures Keptn |
`jenkins` | Installs and configures Jenkins |
`jenkins_uninstall` | Uninstalls Jenkins |
`dashboard` | Installs the ACE Box Dashboard |
`awx` | Installs AWX |
`awx_uninstall` | Uninstalls AWX |
`awx_config` | Configures AWX (can't be re-run at the moment, i.e. requires awx_uninstall + awx + awx_config ) |
`awx_output` | Shows AWX info (e.g. credentials) |

For example:
```bash
$ ansible-playbook -vv /vagrant/ansible/initial.yml --extra-vars "ansible_python_interpreter=auto acebox_provisioner=vagrant non_root_user=vagrant" --tags post_install
```

## SSH into the box
Inside the `microk8s` folder, execute `vagrant ssh` to gain access to the VM

## Cleaning up

### Vagrant

Vagrant offers many commands to deal with the VM, check the below:

Command  | Result
-------- | -------
`vagrant destroy` | stops and deletes all traces of the vagrant machine |
`vagrant halt` | stops the vagrant machine - i.e. shutting down your workstation |
`vagrant suspend` | suspends the machine - i.e. sleep your workstation |
`vagrant resume` | resume a suspended vagrant machine |
`vagrant up` | starts and provisions the vagrant environment |
`vagrant box update` | update the base box from time to time to ensure it is the latest version. While provisioning a message will be shown that there are updates available |



## Behind the scenes

When running the `vagrant up` command the following takes place:
1. The `Vagrantfile` is read
2. Some required Vagrant plugins are installed
3. The `config.yml` file is loaded
4. An `ubuntu/xenial64` Virtual Machine is spun up based on the specs found in the `config.yml` file. If needed, the image gets downloaded
5. Networking for the VM gets configured
6. Once the VM has been spun up, Vagrant `ssh` into it and start the provisioning. `ansible_local` Vagrant provisioner is used which will install ansible on the VM.
7. Package manager will update the vm and install VirtualBox Guest Additions.
8. The provisioner does the following:
   1. The `ansible/initial.yml` file is loaded.
   2. Some init tasks are executed based on `ansible/playbooks/init_tasks.yaml` such as installing supporting packages and resizing disks
   3. Microk8s and addons are installed based on `ansible/playbooks/microk8s_tasks.yaml`
   4. Helm is installed based on `ansible/playbooks/helm_tasks.yaml`. Helm repos are also added
   5. If enabled, OneAgent is installed based on `ansible/playbooks/dtoneagent_tasks.yaml`
   6. If enabled, Jenkins is installed based on `ansible/playbooks/jenkins_tasks.yaml`. This uses the helm chart found in `k8s/jenkins-values.yml` which will not only install Jenkins but also perform plugin installation and set up our skeleton pipelines. When run in the demo mode, it will also set up all integrations
   7. If enabled, An ACE dashboard is built and deployed as described in `ansible/playbooks/dashboard_tasks.yaml`
   8. If enabled, an Private Synthetic ActiveGate is installed based on `ansible/playbooks/dtactivegate_tasks.yaml`. This also installs all required packages.
   9. Post installation tasks are also executed, as described in `ansible/playbooks/postinstall_tasks.yaml`. This includes configuring `iptables` for port forwarding
