# ace-box - Introduction

The ace-box is an all-in-one Autonomous Cloud Enablement machine that you can use as a portable sandbox, demo and testing environment. The key is that it is spun up on demand on your local workstation, without the need of an expensive cloud provider. 

Vagrant is used for spinning up the VM, Ansible is used for setting up the various components.

It comes with the following:
- microk8s
- container registry
- jenkins
- helm
- oneagent deployed via helm
- activegate for private synthetic
- an easy to use ace dashboard

## Requirements
To run the ace-box, the following is required:
- a workstation with at least **16GB of RAM** and **2 CPU cores (non-virtualized)**
- virtualbox installed (latest version)
- vagrant installed (latest version)
- ansible installed (latest version)
- Dynatrace tenant (prod or sprint, dev not recommended)
- github account
- a (new) github organization used for the application