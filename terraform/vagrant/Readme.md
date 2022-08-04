# Local installation with Vagrant
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

## SSH into the box
Execute `vagrant ssh` to gain access to the VM

## Vagrant cleanup

Vagrant offers many commands to deal with the VM, check the below:

Command  | Result
-------- | -------
`vagrant destroy` | stops and deletes all traces of the vagrant machine |
`vagrant halt` | stops the vagrant machine - i.e. shutting down your workstation |
`vagrant suspend` | suspends the machine - i.e. sleep your workstation |
`vagrant resume` | resume a suspended vagrant machine |
`vagrant up` | starts and provisions the vagrant environment |
`vagrant box update` | update the base box from time to time to ensure it is the latest version. While provisioning a message will be shown that there are updates available |

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