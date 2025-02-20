# VSCode

This currated role can be used to install Visual Studio Code on the ace-box.
Two deployment options exist:
1. Direcly on the virtual machine.
2. On the Kubernetes cluster using Helm

See the section below for more info.

## Option 1 - Directly on the VM

This option is most suited when you need full access to the file system of the VM, and when you want to create a development environment where other dev tools will be installed.
The terminal in vscode will have direct access to the VM, so running commands like `java`, `dcoker`, ... will be possible.

> Note: this role still requires k3s for its ingress controller. This way it is also possible to combine this role with kubernetes-based workloads.

### Using the role

#### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```

#### Deploying VSCode on the VM

``` yaml
- include_role:
    name: vscode
vars:
    vscode_flavour: "vm"
    vscode_extensions:
    - "vscjava.vscode-java-pack"
    - "vmware.vscode-spring-boot"
    - "redhat.vscode-xml"
    - "ms-python.python"
    - "{{ role_path }}/files/vscode/extensions/dynatrace.dynatrace-debugging-extension-0.7.0.vsix"
```

The `vscode_extensions` variable supports the installation of extensions. Check the [Open VSX Registry](https://open-vsx.org/) for a list of available extensions.

It is also possible to provide a vsix file to the role.

#### Deploying the dashboard

Installing the role also prepares the dashboard with links. Install the dashboard to visualise it.

``` yaml
- include_role:
    name: dashboard
```

## Option 2 - On the Kubernetes cluster using Helm

This option deploys vscode on the kubernetes cluster directly, and requires k3s.
At this point, this would not give you many interaction possibilities with the VM directly.
It is therefor recommended to use the the option to directly deploy on the VM

### Using the role

#### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```

#### Deploying VSCode on the Kubernetes Cluster

``` yaml
- include_role:
    name: vscode
vars:
    vscode_flavour: "kubernetes"
    vscode_extensions:
    - "vscjava.vscode-java-pack"
    - "vmware.vscode-spring-boot"
    - "redhat.vscode-xml"
    - "ms-python.python"
    - "/mnt/volume/extensions/dynatrace.dynatrace-debugging-extension-0.7.0.vsix"
```

The `vscode_extensions` variable supports the installation of extensions. Check the [Open VSX Registry](https://open-vsx.org/) for a list of available extensions.

It is also possible to provide a vsix file to the role.
To do that, place the `vsix` file in the `files/vscode/extensions` folder. This fodler will be mounted to the pod and you can then specify the `vsix` file in the `vscode_extensions` variable.

#### Deploying the dashboard

Installing the role also prepares the dashboard with links. Install the dashboard to visualise it.

``` yaml
- include_role:
    name: dashboard
```