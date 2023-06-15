# app-simplenode

This currated role contains content for the demo application "Simplenodeservice". When included, a new repository will be created

## Using the role

### Role Requirements

This role depends on the following roles to be deployed beforehand:

```yaml
- include_role:
    name: microk8s
```

### Deploying app-simplenodeservice

|Var|Required|Description|
|---|---|---|
|git_username|...|...|
|git_password|...|...|
|git_remote|...|...|
|git_org_name|...|...|
|repo_name|...|...|
|app_simplenode_overwrites|...|...|

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
      - dest: demo/
      - dest: monaco/
        src: '{{ playbook_dir }}/roles/demo-ar-workflows-ansible/files/monaco/'
```
