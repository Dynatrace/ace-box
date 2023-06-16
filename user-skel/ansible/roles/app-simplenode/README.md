# app-simplenode

This currated role contains content for the demo application "Simplenodeservice". When included, a new repository will be created

## Using the role

### Deploying app-simplenodeservice

|Var|Required|Description|
|---|---|---|
|git_username|Required|Username for your VCS (version control system).|
|git_password|Required|Password for your VCS.|
|git_org_name|Required|...|
|repo_name|Required|...|
|git_remote|Conditionally required|Specifies which remote to use. Supported values are "gitea" or "gitlab", the ACE-Box internal VCSs. Either _git_remote_ or _git_endpoint_ is required.|
|git_endpoint|Conditionally required|Specifies the endpopint to use, without protocol, for example "github.com". This value will be used in combination with _git_org_name_ and _repo_name_ will to sync repositories. Either _git_remote_ or _git_endpoint_ is required.|
|app_simplenode_overwrites|Optional|Allows you to overwrite certain simplenode resources before the repository is set up. Value needs to be a list ob objects. Each object is required to contain at least a "dest" key and value. See example below.|

Example:

```
- include_role:
    name: app-simplenode
  vars:
    git_username: "ace"
    git_password: "supersecret"
    git_remote: "gitea"
    git_org_name: "demo"
    repo_name: "simplenode"
    app_simplenode_overwrites:
      # Ignores demo/ folder:
      - dest: demo/
      # Substitutes monaco/ folder with specified src:
      - dest: monaco/
        src: '{{ playbook_dir }}/roles/demo-ar-workflows-ansible/files/monaco/'
```

### Role Requirements

This role depends on the following roles to be deployed beforehand:

```yaml
- include_role:
    name: microk8s
```
