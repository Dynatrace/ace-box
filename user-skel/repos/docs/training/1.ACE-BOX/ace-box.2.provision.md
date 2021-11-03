# ace-box - Provision
This lab will explain you how to provision the ace-box

## Step 0 - Designate a github org for the ace app and config
We will be forking a repository that contains our demo application and the configuration files.
Create a new github organization that will be used to fork this repo to. Alternatively repurpose an existing one.
Keep note of this org as you will need it later.

## Step 1 - Clone the ace-box repository
Make sure that you have the ace-box repository cloned locally

## Step 2 - change directory to microk8s
```
$ cd microk8s
```
## Step 3 - create a config file
You need to create a config file called `config.yml` that contains the information needed to bring up the vm. You can use `config.yml.template` as a base.
```
dynatrace:
  tenant:     ''    # abc12345.live.dynatrace.com OR [managed-domain]/e/[environmentguid]
  apitoken:   ''
  paastoken:  ''
git:
  username:   ''
  pat:        ''
  email:      ''
  org:        ''    # Github org created
acebox:
  specs:
    cpu: 2                      # number of cpu vcores
    mem: 8192                   # memory assignment in MB
    priv_ip: "192.168.50.10"    # private IP 
    disk: "50GB"                # disk size
  features:
    oneagent: true              # install Dynatrace OneAgent, defaults to true
    activegate: true            # install Dynatrace ActiveGate for Private Synthetic, defaults to false
    jenkins: true               # install Jenkins, defaults to true
    jenkins_setcreds: true      # automatically set git and dynatrace credentials in Jenkins
    dashboard: true             # install ACE dashboard, defaults to false
  microk8s:
    addons: "dns dashboard storage registry"  # which addons to micrk8s to install (https://microk8s.io/docs/addons) WARN: will increase resource usage
```

## Step 4 - Provision
Run the following commands to bring up the virtual machine
```
$ vagrant up
```
Vagrant will perform the following:
- Create an Ubuntu VM
- Give the Ubuntu VM the name ace-box and give it an IP
- Use Ansible to install:
    - Dynatrace OneAgent via Ansible Role
    - Microk8s + dashboard (exposed on nodePort 31100, https) and allow to skip token for dashboard
    - Jenkins (exposed on nodePort 31000)
    - A dashboard with handy links (exposed on nodePort 30001)
  
  **This process will take some time, grab a coffee**

  ## Step 5 - Access ace-box dashboard
  At the end of the provisioning, the ACE dashboard can be accessed in the browser by navigating to `http://ace-box:30001/`. Alternatively the IP address can be used that was specified in the `config.yml` file.

  ## Step 6 - Fork the maas-hot repo
  Navigate to the https://github.com/dynatrace-ace/maas-hot repository and fork it to the organization that you specified in the `config.yml` file. 

  ## Step 7 - Clone the forked maas-hot repo
  Clone the repository (that you just cloned into your own org) to your local machine.