# app-falco

This currated role can be used to deploy Unguard demo application on the ACE-Box. More information about falco [here](https://www.dynatrace.com/news/blog/ttp-based-threat-hunting-solves-alert-noise).

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```
### Deploying Falco

```yaml
- include_role:
    name: app-falco
```

```
### (Optional) To demo falco with unguard

```yaml
- include_role:
    name: app-unguard
```

