# OneAgentCtl

OneAgentCtl can be used to change metadata, host groups and tags of the host it is running on.
From agent 189 it is the preferred way to set these values (as opposed to adding them directly in the files)
Check out https://www.dynatrace.com/support/help/setup-and-configuration/dynatrace-oneagent/oneagent-configuration-via-command-line-interface for more information.

## Using OneAgentCtl

### SSH into ace-box
Execute `vagrant ssh` from the `microk8s` folder

### Become root
`sudo su`

### Go to OneAgent tools folder
`cd /opt/dynatrace/oneagent/agent/tools`

### Set host metadata
`./oneagentctl --set-host-property=purpose=ACE`

### Set host tag
`./oneagentctl --set-host-tag=architecture=$HOSTTYPE`

### Set host name (requires OA container to be stopped)
`./oneagentctl --set-host-name=my-ace-box`

### Set host group (requires OA container to be stopped)
`./oneagentctl --set-host-group=Vagrant`
