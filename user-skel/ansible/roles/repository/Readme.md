# repository

This currated role uploads contents from a specified path to a git repository

## Using the role

### Role Requirements
This role depends on a git tool to publish the contents. The curated git tools are as follows:

#### gitea
To deploy gitea:
```yaml
- include_role:
    name: gitea
```
After deploying gitea. you need to create an organization and repository before publishing the contents.
For the details please check gitea Readme.

#### gitlab
To deploy gitlab:
```yaml
- include_role:
    name: gitlab
```
After deploying gitlab. you need to create an organization and repository before publishing the contents.
For the details please check gitea Readme.
#### Other git tools
If you already have an existing git repository (i.e. github, bitbucket, external gitea, gitlab, etc) you can pass the necessary parameters to the "repository" role.

### Publishing the contents to a Repository

To publish the contents to a git repository, you first need to provide the git_endpoint, organization and repository name along with the username and password.

```yaml
- include_role:
    name: repository
  vars:
    git_remote: "" # e.g. "gitea" or "gitlab" or "github" or any other git tool
    git_username: "" # a username to connect to a git tool
    git_password: "" # a password to connect to a git tool
    git_endpoint: "http://<git_username>:<git_password>@<gitea_internal_endpoint>" # if the git_remote is gitea or gitlab, git_endpoint is generated automatically. For the rest, you can directly set an endpoint

    repo_src: "{{ item.repo_src }}" # the path you want to upload to a git repository
    git_org: "{{ item.git_org }}" # organization or group name to be created in a git tool
    git_repo: "{{ item.repo_target }}" # repository name
  loop:
  - { repo_target: "<repository-name>", repo_src: "<folder/files path>", git_org: "<organization-name>" }

```
If you want to use a curated role (gitea/gitlab) which can be installed in a K8s cluster, you can change their domain name as in the following: 

```yaml
---
gitlab_domain: "gitlab.{{ ingress_domain }}"
gitea_domain: "gitea.{{ ingress_domain }}"
```
