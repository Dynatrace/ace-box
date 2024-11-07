# fluentbit

This currated role can be used to deploy [fluentbit](https://docs.dynatrace.com/docs/observe-and-explore/logs/lma-log-ingestion/lma-log-ingestion-via-api/lma-stream-logs-with-fluent-bit) in your k8s cluster to extract logs

## Using the role

### Role Requirements

This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: k3s
```


### Deploying fluentbit

FluentBit gets installed by default with the following role:

```yaml
- include_role:
    name: dt-operator
```

Otherwise install the fluentbit collector by running

```yaml
- include_role:
    name: fluentbit
```