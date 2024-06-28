# ArgoCD

Roles allows you to deploy and manage ArgoCD on an ACE-Box.

## main.yml

Installs ArgoCD in namespace "argocd". If namespace doesn't exist, it will be created.

## source-initial-admin-password.yml

Sources admin password.

Sets facts:
- argocd_admin_password

## ensure-gitea-application-set.yml

TBD: NOT YET FULLY TESTED, USE AT OWN RISK.

## ensure-gitlab-application-set.yml

Deploys and links an ArgoCD application set with GitLab. ArgoCD will scan repositories of `argocd_gitlab_generator_owner` and deploys resources found in `argocd_gitlab_generator_k8s_path`.

For more information see ArgoCD's [official docs](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-SCM-Provider/#gitlab).

Requires vars:

|Variable name|Description|
|---|---|
|argocd_gitlab_generator_owner|GitLab repo owner|
|argocd_gitlab_generator_k8s_path|Path to k8s resources within repo|

For example, consider a repository `sandbox/test.git` (GitLab group `sandbox`) with the following layout:

```
index.html
index.js
Dockerfile
k8s/
  deployment.yml
  service.yml
  ingress.yml
...
```

With a repo layout like, you want to set:

```
argocd_gitlab_generator_owner: "sandbox"
argocd_gitlab_generator_k8s_path: "k8s"
```

