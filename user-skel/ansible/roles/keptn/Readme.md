# keptn

This currated role can be used to install keptn on a kubernetes cluster.

For the details, please check this link: https://keptn.sh/

## Using the role

### Role Requirements
This role depends on the following roles to be deployed beforehand:
```yaml
- include_role:
    name: microk8s

```

### Deploying Keptn

The main task deploys Keptn on a kubernetes cluster. It is recommended to add a condition whether cloud_automation_flavor is "KEPTN" as shown below.

This task:
 - ensures Gitea is installed when we are using Keptn to have auto repository provisioning.
 - installs Keptn-CLI on the ACE-Box. 
 - creates an ingress using nginx ingress controller or a virtual service using istio depending on your choice
 - installs keptn-jmeter, keptn-dynatrace, keptn-helm, keptn-synthetic, keptn-test-collector, keptn-job-executor services when enabled in role defaults.

```yaml
- include_role:
    name: keptn
  when: cloud_automation_flavor is defined and cloud_automation_flavor == "KEPTN"
```

Variables that can be set are as follows:

```yaml
---
keptn_version: "0.16.1"
keptn_dynatrace_service_version: "0.23.0"
keptn_namespace: "keptn"
keptn_ingress_domain: "cloudautomation.{{ ingress_domain }}"
keptn_cli_download_location: "/tmp/keptn"
keptn_look_and_feel_url: "https://d2ixiz0hn5ywb5.cloudfront.net/branding.zip" # uncomment to give keptn the cloud automation look and feel
keptn_gitea_provision_service_version: "0.1.1"
keptn_jmeter_service_enabled: true
keptn_helm_service_enabled: false
keptn_synthetic_service_enabled: false
keptn_test_collector_service_enabled: false
keptn_job_executor_service_enabled: false
keptn_job_executor_service_version: "0.2.3"
keptn_job_executor_service_namespace: "keptn-jes"
keptn_job_executor_service_subscriptions: "sh.keptn.event.remote-task.triggered"
```

### Other Tasks in the Role


#### "source-secret" 
This task fetches the credentials for Keptn and stores them in the following variables:
- `keptn_api_token`
- `keptn_bridge_user`
- `keptn_bridge_password`

```yaml
- include_role:
    name: keptn
    tasks_from: source-secret
```

#### "source-endpoints" 
This task fetches endpoint details and stores them in the following variables:
> Note: these endpoints differ depending on ingress class is whether "istio" or "non-istio".

- `keptn_ingress_domain`: The keptn domain name (e.g.: keptn.myaceboxdomain.com)
- `keptn_endpoint`: The externally available endpoint for Keptn in the format of [protocol]://keptn-domain/api (e.g.: http://keptn.myaceboxdomain.com/api)
- `keptn_bridge`: The user interface of Keptn that presents all projects and services managed by Keptn in the format of [protocol]://keptn-domain/bridge (e.g.: http://keptn.myaceboxdomain.com/bridge)
- `keptn_internal_endpoint`: The internal endpoint for keptn in the format of [http://keptn-service-ip:80/api]. You can leverage this endpoint to reach Keptn without having to go via the outside-in
  
```yaml
- include_role:
    name: keptn
    tasks_from: source-endpoints
```

#### Keptn Services Tasks

##### "dynatrace-service" 
This task deploys Keptn Dynatrace service

For details: https://github.com/keptn-contrib/dynatrace-service

```yaml
- include_role:
    name: keptn
    tasks_from: dynatrace-service
```
##### "gitea-provisioner-service" 
This task deploys Keptn Gitea Provisioner service

For details: https://github.com/keptn-sandbox/keptn-gitea-provisioner-service

```yaml
- include_role:
    name: keptn
    tasks_from: gitea-provisioner-service
```
##### "helm-service" 
This task deploys Keptn Helm service

For details: https://github.com/keptn-contrib/helm-service/

```yaml
- include_role:
    name: keptn
    tasks_from: helm-service
```
##### "jmeter-service" 
This task deploys Keptn JMeter service

For details: https://github.com/keptn-contrib/jmeter-service/

```yaml
- include_role:
    name: keptn
    tasks_from: jmeter-service
```
##### "synthetic-service" 
This task deploys Dynatrace Synthetic service to trigger Dynatrace Synthetic executions as part of a Keptn sequence

For details: https://github.com/dynatrace-ace/dynatrace-synthetic-service

```yaml
- include_role:
    name: keptn
    tasks_from: synthetic-service
```

##### "collector-service" 
This task deploys Keptn Test Collector service to collect timestamps, synthetic test metadata, etc. from different Keptn contexts

For details: https://github.com/dynatrace-ace/keptn-test-collector-service

```yaml
- include_role:
    name: keptn
    tasks_from: collector-service
```
##### "job-executor-service" 
This task deploys Job Executor service

For details: https://github.com/keptn-contrib/job-executor-service

```yaml
- include_role:
    name: keptn
    tasks_from: job-executor-service
```
