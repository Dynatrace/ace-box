# Backstage

Role allows you to deploy and manage [Backstage](https://backstage.io) on an ACE-Box.

## main.yml

Builds and deploys Backstage. During build, all settings will be applied from current ACE-Box installation (e.g. GitLab creds).

> Attention: Backstage depends on GitLab installation!

Example deployment:

```
#
# Prerequisite: Deploy GitLab
#
- include_role:
    name: gitlab

- include_role:
    name: backstage

#
# Optional: Install dashboard to show credentials
#
- include_role:
    name: dashboard
```

## register-catalog-item.yml

Role allows you to register Backstage catalog items.

Requires vars:

|Variable name|Description|
|---|---|
|backstage_catalog_git_repo|Name of repo that will be created|
|backstage_catalog_git_repo_src|Path to repo content which will be uploaded to repo specified earlier|

For example, consider an external use case repo:

```
roles/
  my-use-case/
    files/
      simplenodeservice/
        content/
          app.js
          ...
        catalog-info.yaml
    tasks/
      main.yaml
```

In your main.yaml, a catalog template could be registered by adding:

```
...
#
# role_path_abs is required to point to abs path of ext use case instead of backstage role.
#
- set_fact:
    role_path_abs: "{{ role_path }}"

- include_role:
    name: backstage
    tasks_from: register-catalog-item
  vars:
    backstage_catalog_git_repo: "simplenodeservice"
    backstage_catalog_git_repo_src: "{{ role_path_abs }}/files/simplenodeservice"
...
```

> All templates are added to the `backstage-templates` group in GitLab.

Backstage is configured in a way that it will scan the `backstage-templates` group in GitLab for repositories containing Backstage entities. If entities are found (e.g. templates), they will be added to Backstage. A scan is ran every 5 minutes.

## Local development

This folder can also be used to run a local Backstage instance. Please follow the official Backstage.io docs for more details [here](https://backstage.io/docs/overview/what-is-backstage/).

> Attention: Terraform does not like copying `node_modules` folders (e.g. due to symlinks). When you ran Backstage locally, please make sure you delete all `node_modules` folders prior to deploying an ACE-Box with Terraform!
