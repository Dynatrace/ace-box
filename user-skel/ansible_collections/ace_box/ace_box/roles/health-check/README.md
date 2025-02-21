# Health check Role

This role is used to deploy a health check service for the Ace-Box roles

### Include Health Check

```yaml
- include_role:
    name: health-check
    tasks_from: application-availability
  vars:
    application_domain: "{{ gitlab_domain }}"
```
