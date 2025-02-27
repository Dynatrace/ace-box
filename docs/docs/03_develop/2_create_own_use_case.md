---
sidebar_position: 2
---

# Create your own use case

How to build a use case from scratch?

## Your Use Case repository structure

1. Each use case is linked with a repository. Create your own repo and copy the structure of the basic-dt-demo

https://github.com/dynatrace-ace/basic-dt-demo

2. Your `roles/my-use-case/tasks/main.yml` could look as simple as this, in this way you are starting from scratch, without creating anything in particular

```yaml
---
- debug:
    msg: "Hello from your external use case!"
```

3. Deploy your ACE-Box as we did in [2. Deploy](../01_get-started/2_deploy.md)

4. Enable your use case as we did in [3. Enable use case](../01_get-started/3_add_use_case.md), this time pointing to yours

```bash
ace enable https://github.com/<your_project>/<your_use_case>.git
```

If you're using a private repo:

```bash
ace enable https://YOUR_GITHUB_USER:YOUR_GITHUB_TOKEN@github.com/<your_project>/<your_use_case>.git
```

Well done, now you have your use case within your ACE-Box, now you can start developing on top of it.

## Adding the first modules to your use case

SHOW HOW TO ACCESS THE ACE-BOX

HOW TO USE THE --LOCAL

HOW TO ADD STUFF