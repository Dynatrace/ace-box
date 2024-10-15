# Postgres Role

This currated role can be used to install PostgreSQL database on a Kubernetes cluster.

### Deploying Postgres

```yaml
- include_role:
    name: postgres
```

Variables that can be set are as follows:

```yaml
---
postgres_namespace: "postgres"
postgres_size: "8Gi"
```