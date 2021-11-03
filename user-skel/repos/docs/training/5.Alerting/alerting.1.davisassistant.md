# Alerting

## Alerting profiles
Create a management zone called "Gold prod" which will match all services running in `produdction` with the meta data of `Class` set to `Gold`. You might need to add the meta data if it does not already exist.

## Davis assistant

1. Go to [assistant.dynatrace.com](https://assistant.dynatrace.com/) - also works for sprint tenants.
2. Add your environment (when using a sprint tenant, add it as a managed instance!)
3. Hook up your own slack instance
4. Create a channel `goldprod` and configure the davis assistance to only receive information for entities tagged with `Class=Gold` and `environment=production` 