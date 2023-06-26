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
    git_endpoint: "" # Specifies the endpoint to use, without protocol, for example "github.com". If git_remote is gitea or gitlab, git_endpoint is generated automatically. For the rest, you can directly set an endpoint.
    repo_src: "<folder/files path>" # the path you want to upload to a git repository
    git_org: "<organization-name>" # organization or group name to be created in a git tool
    git_repo: "<repository-name>" # repository name
    track_upstream: false # Boolean value whether to track git upstream. This might be helpful when you do manual pulls/pushes from the local repository on the ACE-Box.

```
If you want to use a curated role (gitea/gitlab) which can be installed in a K8s cluster, you can change their domain name as in the following: 

```yaml
---
gitlab_domain: "gitlab.{{ ingress_domain }}"
gitea_domain: "gitea.{{ ingress_domain }}"
```
