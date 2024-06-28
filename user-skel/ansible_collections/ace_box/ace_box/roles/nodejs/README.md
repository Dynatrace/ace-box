# nodejs

Role maintains NVM, Node.js and yarn on an ACE-Box. This is a helper role for e.g. Backstage, but can of course be used on it's own.

## main.yml

Installs NVM, Node.js and yarn on an ACE-Box.

Example deployment:

```
- include_role:
    name: nodejs
```

Requires vars:

|Variable name|Description|Default|
|---|---|---|
|nodejs_nvm_version|NVM version to install|v0.39.7|
|nodejs_node_version|Node.js version to install|v18.20.1|

For example, custom nodejs_node_version:
```
- include_role:
    name: nodejs
  vars:
    nodejs_node_version: "v20.14.0"
```
