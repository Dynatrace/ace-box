Table Of Content:
- [Introduction](#introduction)
- [Get Started](#get-started)
  - [Part A: Prepare your repository & spin up your ACE-Box](#part-a-prepare-your-repository--spin-up-your-ace-box)
  - [Part B: Build your custom use-case (Ansible)](#part-b-build-your-custom-use-case-ansible)
  - [Part C: Closing Up](#part-c-closing-up)
- [Get Pro (coming soon)](#get-pro-coming-soon)
- [Custom Use-case Examples](#custom-use-case-examples)
- [Ansible Roles](#ansible-roles)
  - [Out-of-the-box Ansible Roles](#out-of-the-box-ansible-roles)
  - [Custom Ansible Roles](#custom-ansible-roles)
- [Repository Structure](#repository-structure)
- [Versioning](#versioning)
- [Contribute](#contribute)
- [Troubleshoot](#troubleshoot)
  - [Known_hosts Issue](#known_hosts-issue)

<br>

# Introduction
In addition to use-cases provided natively by the ACE-Box, it is now possible to create custom use-cases. This capability allows using the ACE-Box as a platform to develop your own scenarios, demonstrations, trainings, etc.

In the next sections you can find all the needed information to develop your own custom use-case from scratch.

<br>

# Get Started

<br>

## Part A: Prepare your repository & spin up your ACE-Box

Let's create a custom use-case from scratch, in order to replicate the `Basic Observability Demo` use-case previously presented.

1. First of all, create a new repository using the [ext-template](https://github.com/dynatrace-ace/ace-box-ext-template) as a template.

   <img src="../assets/create-new-repo.png" width="800">

<br>

2. Give your repository a name and make it part of the `dynatrace-ace` space

   <img src="../assets/repo-config.png" width="600">

<br>

3. Clone your recently created repository locally. Later on, you could either make changes locally or within the ACE-Box VM instance.

    ```bash
    git clone https://github.com/dynatrace-ace/basic-dt-demo.git
    ```

<br>

4. Now, follow the ACE-Box [installation guide](/Readme.md#get-started) to spin up a VM and deploy the modules and configurations defined in the custom use-case template. <br>Be sure to configure the `use-case` variable within the `terraform.tfvars` file to point to the custom use-case repository that we are about to develop:

    ```bash
    use_case = "https://<user>:<personal-access-token>@github.com/dynatrace-ace/basic-dt-demo.git"
    ```

    > Note: you need to provide your github user and personal access token. Replace the placeholders above with your own values.

<br>

5. Finish the [installation guide](/Readme.md#get-started) and check the output of the terraform apply command with:

    ```bash
    terraform output 
    ```

    > Note: it should retrieve the IP & SSH key to access the VM that has been just created (ACE-Box)

<br>

6. At this point, the framework has provisioned a VM on the selected Cloud Provider and it has automatically cloned our custom use-case repository (`basic-dt-demo`) under the `/home/ace/repos/basic-dt-demo` path. <br>Next step is to go ahead implementing our custom use-case directly from the newly-created machine and, for for this reason, it's required to access the VM via SSH. <br><br>
**Recommended**: use an IDE such as [Remote Development](https://code.visualstudio.com/docs/remote/ssh) from Visual Studio for a more straight-forward and comfortable development experience. <br> SSH config file example:

    ```yaml
    Host <your-ace-box-ip>
    HostName <your-ace-box-ip>
    IdentityFile <path-to-the-ssh-key>
    User ace
    ```

<br>

## Part B: Build your custom use-case (Ansible)
At this stage, we have an empty ACE-Box (Linux VM) and we can start building our custom use-case on top of it.
To do so, we are going to use `Ansible` and `Ansible Roles` to automate and simplify the process. Check out the [Ansible Roles](#ansible-roles) section for further details.

More in detail, we’ll build our custom use-case incrementally, modifying the `my-use-case/tasks/main.yml` configuration file step-by-step to instruct the Ansible engine on what to deploy to the ACE-Box VM. After each step, we let the engine parse the updated file and deploy the changes accordingly.

<br>

7. After having successfully logged in into the ACE-Box VM, we are going to trigger a first run of the `main.yml` configuration file (which just contains a simple _"Hello World"_ print at this stage) to get familiar with the ACE-Box and Ansible. To let the Ansible engine parse the configuration file and implement the instructions run the following command on the terminal:

    ```bash
    ace enable https://github.com/dynatrace-ace/basic-dt-demo.git --local
    ```
   <img src="../assets/hello-world.png" width="600">

<br>

8. Now, in order to replicate the `Basic Observability Demo`, we first need to deploy a k8s distribution. To do so, Read the [k3s role](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/k3s) documentation and the following instructions to the add it to the `main.yml` file:

    ```yaml
    - include_role:
        name: k3s
    ```

<br>

9. Now that we declared what we want to deploy on the VM, we need to install k3s by running again the ansible `main.yml` leveraging on the same command we used at step `7`:

    ```bash
    ace enable https://github.com/dynatrace-ace/basic-dt-demo.git --local
    ```

<br>

10. Next step would be to add Dynatrace monitoring to our ACE-Box. Repeat step `8` & `9`, but this time following the [dt-operator](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/dt-operator) role instructions:

    ```yaml
    - name: Install dt operator
      include_role:
        name: dt-operator
    ```

<br>

10. Let's add a demo app. Repeat step `8` & `9`, but this time following the [app-easytrade](https://github.com/Dynatrace/ace-box/tree/dev/user-skel/ansible_collections/ace_box/ace_box/roles/app-easytrade) role instructions:

    ```yaml
    - include_role:
        name: app-easytrade
      vars:
        easytrade_namespace: "easytrade-app"
        easytrade_domain: "easytrade-app.{{ ingress_domain }}"
        easytrade_deploy: true
        easytrade_owner: "easytrade-hot-devs"
    ```

<br>

11. Check the ingress defined for `easytrade-app` in order to access externally to the demo app:

    ```bash
    ace@ace-box-4c9z:~$ kubectl get ingress -A
    NAMESPACE       NAME                CLASS    HOSTS                                 ADDRESS       PORTS   AGE
    easytrade-app   easytrade-ingress   <none>   easytrade-app.35.225.173.223.nip.io   10.128.0.20   80      113s
    ```

<br>

## Part C: Closing Up
[This](https://github.com/dynatrace-ace/ace-box-ext-template/blob/basic_demo/roles/my-use-case/tasks/main.yml) is how your `main.yml` should look like at the end of `Part B`.

12. Once you're happy with your changes, commit and push changes to the remote repository. Now you could safely destroy the ACE-Box following the instructions contained in the [installation guide](/Readme.md#get-started). <br>Whenever you'll recreate it, all the resources and modules defined within the configuration files will get created automatically.

<br>

# Get Pro (Coming soon...)

Let's extend our initial Basic Dynatrace Observability use-case, by using more OOTB & custom roles

13. Add dashboard & gitlab

_Coming soon..._

<br>

14. Create dt token & oauth token

_Coming soon..._

<br>

15. Create DT configuration using Monaco, installing an App

_Coming soon..._

<br>

16. Extending it, shell script, use variables (what default variables are avaiblable, extra.vars from terraform), custom role 

_Coming soon..._

<br>

# Ansible Roles
_Ansible_ is used for automatically setting up and deploying modules on top of the compute instance (VM) created by the ACE-Box framework via Terraform.

Ansible roles play a critical role in automating the setup and configuration of resources for custom use-cases.
They are modular units that define specific tasks, such as installing software, configuring environments, or managing services. By leveraging these roles, ACE-Box simplifies the process of provisioning and configuring environments, making the creation and execution of use-cases more efficient.

## Out-of-the-box Ansible Roles
Out-of-the-box Ansible roles are the roles that are natively provided by the ACE-Box framework, which cover common tasks and scenarios. Leveraging OOTB Ansible roles is recommended and ensures rapid and consistent deployments.

Referring to the [Basic Obsevability Demo](#part-b-build-your-custom-use-case-ansible) example, we have used several OOTB Ansible roles (`k3s`, `dt-operator` and `app-easytrade`) to deploy all the needed modules within the ACE-Box VM.

Check out the OOTB roles [ReadMe](/user-skel/ansible_collections/ace_box/ace_box/roles/Readme.md) for the complete list of Ansible roles natively provided by the ACE-Box framework.

## Custom Ansible Roles
If a particular use-case requires actions beyond the OOTB roles, custom Ansible roles can be defined to meet those specific requirements. These custom roles can be integrated into the use-case's configuration, giving users flexibility while still maintaining a structured, automated approach.

## Repository structure
In order for the ACE-Box to understand and properly deploy all the custom use-cases' modules using Ansible, it's mandatory that the custom use-case repository complies with the following folder structure:

```
roles/
  my-use-case/
    defaults/
      main.yml
    tasks/
      main.yml
    ...
```

More specifically, a folder named `roles` must to be available at the repository root, and it must include at least a `my-use-case` (literal, not renamed) sub-folder.

This `roles` folder, as well as all subfolders and files included in it, is synchronized with the ACE-Box's Ansible working directory. Upon a successful content sync, Ansible engine tries to use this `my-use-case` folder as an Ansible role and executes all the instructions specified within the configuration files.

Besides, it is possible to create other sub-folders to source additional custom Ansible roles:
```
roles/
  my-use-case/
  additional-custom-ansible-role/
  ...
```

For more information, please check out the [official Ansible documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_roles.html).

<br>

# Versioning
At one point, you probably want to create a hardened release of the custom repository you're working on. This is particularly important when a custom use-case is used as part of a hands-on training, etc.

A specific ref (version or branch) can be targeted by appending `@my-version` it to the `use_case` variable, e.g.:

```
use_case = "https://<user>:<token>@github.com/my-org/my-ext-use-case.git@v1.0.0"
```

<br>

# Contribute
It is possible to extend the out-of-the-box use-cases by integrating the needed configuration files into the ACE-Box repository.

<br>

# Troubleshoot

## Known_hosts issue

If you get the following error lines while trying to access the ACE-Box server:

```log
[10:04:38.930] Exec server for ssh-remote+35.225.173.223 failed: Error: Remote host key has changed, port forwarding is disabled
[10:04:38.930] Error opening exec server for ssh-remote+35.225.173.223: Error: Remote host key has changed, port forwarding is disabled
```

Check also in that piece of logs, where the known_hosts are defined, for example:

```log
Offending ECDSA key in /Users/<user>/.ssh/known_hosts:6
```

And run the following command locally in order to remove the known_hosts:

```bash
rm /Users/<user>/.ssh/known_hosts
```

Then try to access again your VM