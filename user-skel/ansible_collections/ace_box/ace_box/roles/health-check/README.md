# Health check Role

This role is used to deploy a health check service for the Ace-Box roles

### Include Health Check

```yaml
- include_role:
    name: health-check
```

Variables that can be set are as follows:

```yaml
---
app_url: "https://dashboard.ingress-domain.com"
```