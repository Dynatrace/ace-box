---
sidebar_position: 1
---

# Dynatrace Basic Observability

## Value

Real world scenario of Dynatrace monitoring an application running in a Kubernetes cluster, providing visibility into:
- APM & Logs
- Application Security
- Infrastructure & Resource consumption

Using a realistic environment you will run through similar scenarios to the ones provided in the documentation, in order to learn:
- [Drill-down to service failure causes](https://docs.dynatrace.com/docs/analyze-explore-automate/distributed-traces/use-cases/error-analysis)
- [Use logs in context to troubleshoot issues](https://docs.dynatrace.com/docs/analyze-explore-automate/logs/lma-use-cases/lma-e2e-troubleshooting)
- [Assess and troubleshoot cluster health](https://docs.dynatrace.com/docs/observe/infrastructure-monitoring/container-platform-monitoring/use-cases/cluster-health)
- [Optimize workload resource usage with Kubernetes app and Notebooks](https://docs.dynatrace.com/docs/observe/infrastructure-monitoring/container-platform-monitoring/use-cases/resource-optimization)
- [Troubleshoot common health problems of Kubernetes workloads](https://docs.dynatrace.com/docs/observe/infrastructure-monitoring/container-platform-monitoring/use-cases/troubleshoot-health-problems)
- [Visualize and analyze security findings](https://docs.dynatrace.com/docs/secure/use-cases/visualize-and-analyze-security-findings)

> Note: there are not exactly the same use cases as in the documentation, but you can see the instructions below

## Setup

You have 2 options

### Post ACE-Box installation

Follow the [Enable Use Case](../01_get-started/3_add_use_case.md) instructions to set this use case after creating your ACE-Box instance

### Via terraform.tfvars

You can add the following line to your terraform.tfvars in order to automatically install the use case after executing the `terraform apply` command

```bash
use_case = "https://github.com/dynatrace-ace/basic-dt-demo.git"
```

> Note: you can also 

## Instructions

Details to run the use case
