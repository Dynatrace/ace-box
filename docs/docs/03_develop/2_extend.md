---
sidebar_position: 2
---

# Extending Use Case

In this section, we will learn how to extend our initial use case with a step-by-step example.

## Access ACE-Box & Run --local Command

1. If you haven't yet, SSH into your ACE-Box and test the [--local](../03_develop/1_core_principles.md#how-can-i-make-changes-to-my-use-case) command. The output should look as follows:

```bash
PLAY RECAP **********************************************************************************************
localhost                  : ok=86   changed=12   unreachable=0    failed=0    skipped=48   rescued=0    ignored=2   

Successfully installed https://github.com/dynatrace-ace/basic-dt-demo.git
You're welcome!
```

## <span class="difficulty-easy">(Easy)</span> Install Dynatrace App from the hub

1. In order to install apps from the hub, we can use the [dt-platform](../04_curated_roles/dt-platform.md) role. Follow the role documentation to learn how to use it. For our case, let's install the app [Davis for Workflows](https://docs.dynatrace.com/docs/discover-dynatrace/platform/davis-ai/davis-ai-integrations/davis-for-workflows#install-davis-for-workflows) during the provisioning using the following command:

```yaml
- name: Install dt apps from hub
  include_role:
    name: dt-platform
    tasks_from: ensure-app
  with_items:
    - dt_app_id: "dynatrace.davis.workflow.actions"
      dt_app_version: "1.2.0"
  vars:
    dt_environment_url_gen3: "{{ extra_vars.dt_environment_url_gen3 }}"
    dt_oauth_sso_endpoint: "{{ extra_vars.dt_oauth_sso_endpoint }}"
    dt_oauth_client_id: "{{ extra_vars.dt_oauth_client_id }}"
    dt_oauth_client_secret: "{{ extra_vars.dt_oauth_client_secret }}"
    dt_oauth_account_urn: "{{ extra_vars.dt_oauth_account_urn }}"
    dt_app_id: "{{ item.dt_app_id }}"
    dt_app_version: "{{ item.dt_app_version }}"
```

## <span class="difficulty-easy">(Easy)</span> Deploy ChatOps tool - Mattermost 

1. In order to deploy mattermost, we can use the [mattermost](../04_curated_roles/mattermost.md) role. Follow the role documentation to learn how to use it. For our example, let's add Mattermost, in order to have a ChatOps solution embedded within our use case:

```yaml
- include_role:
    name: mattermost
```

2. Use sub-tasks from the role to configure it:

```yaml
- name: Mattermost - Create a new channel
  include_role:
    name: mattermost
    tasks_from: ensure-channel
  vars:
    mm_channel_name: "operations"
    mm_channel_display_name: "operations"

- name: Mattermost - Create a new channel
  include_role:
    name: mattermost
    tasks_from: ensure-channel
  vars:
    mm_channel_name: "development"
    mm_channel_display_name: "development"
```

## <span class="difficulty-medium">(Medium)</span> Apply a Dynatrace configuration

We want to have certain features preconfigured for our scenario. Dynatrace has certain Kubernetes recommendations turned off to avoid noise, but we want to start switching them on to show the value of it.

<div style={{ textAlign: 'left' }}>
<img src={require('./img/pending-pods-off.png').default} alt="Description" width="400" />
</div>


The roles that may be helpful for this task are:
- [dt-access-token](../04_curated_roles/dt-access-token.md)
- [dt-oauth-token](../04_curated_roles/dt-oauth-token.md)
- [monacov2](../04_curated_roles/monacov2.md)

1. Follow the curated role documentation to create a `dt-access-token` with the needed scopes to read & write a Dynatrace setting:

```yaml
- include_role:
    name: dt-access-token
  vars:
    access_token_var_name: "dt_operator_dt_access_token_name"
    access_token_scope: ["entities.read", "settings.read", "settings.write", "ReadConfig", "WriteConfig"]
```

2. Execute an API call from your provisioning script using the previous generated token

<details>
  <summary>Click to view the API call</summary>
    
```yaml
- name: Configure global anomaly detection k8s
  uri:
    url: "{{ dynatrace_tenant_url }}/api/v2/settings/objects"
    method: POST
    headers:
      accept: "application/json"
      Content-Type: "application/json; charset=utf-8"
      Authorization: "Api-Token {{ dt_operator_dt_access_token_name }}"
    body: |
      [
        {
        "schemaId":"builtin:anomaly-detection.kubernetes.workload",
        "schemaVersion":"1.10.1",
        "scope":"environment",
        "value":{
            "containerRestarts":{"enabled":false},
            "deploymentStuck":{"enabled":false},
            "pendingPods":{"enabled":true,"configuration":{"threshold":1,"samplePeriodInMinutes":10,"observationPeriodInMinutes":10}},
            "podStuckInTerminating":{"enabled":false},
            "workloadWithoutReadyPods":{"enabled":false},
            "notAllPodsReady":{"enabled":true,"configuration":{"samplePeriodInMinutes":10,"observationPeriodInMinutes":10}},
            "highMemoryUsage":{"enabled":false},
            "highCpuUsage":{"enabled":false},
            "highCpuThrottling":{"enabled":false},
            "oomKills":{"enabled":false},
            "jobFailureEvents":{"enabled":false},
            "podBackoffEvents":{"enabled":false},
            "podEvictionEvents":{"enabled":false},
            "podPreemptionEvents":{"enabled":false}
            }
        }
        ]
    body_format: json
    status_code: 200
```

</details>


Your full main.yml script should look as follows

<details>
  <summary>Full main.yml</summary>
    
```yaml
---
- include_role:
    name: "k3s"

- include_role:
    name: dt-operator
  vars:
    log_monitoring: "fluentbit"

- include_role:
    name: app-easytrade

- include_role:
    name: dashboard

- include_role:
    name: dt-access-token
  vars:
    access_token_var_name: "dt_operator_dt_access_token_name"
    access_token_scope: ["entities.read", "settings.read", "settings.write", "ReadConfig", "WriteConfig"]

- name: Configure global anomaly detection k8s
  uri:
    url: "{{ dynatrace_tenant_url }}/api/v2/settings/objects"
    method: POST
    headers:
      accept: "application/json"
      Content-Type: "application/json; charset=utf-8"
      Authorization: "Api-Token {{ dt_operator_dt_access_token_name }}"
    body: |
      [
        {
        "schemaId":"builtin:anomaly-detection.kubernetes.workload",
        "schemaVersion":"1.10.1",
        "scope":"environment",
        "value":{
            "containerRestarts":{"enabled":false},
            "deploymentStuck":{"enabled":false},
            "pendingPods":{"enabled":true,"configuration":{"threshold":1,"samplePeriodInMinutes":10,"observationPeriodInMinutes":10}},
            "podStuckInTerminating":{"enabled":false},
            "workloadWithoutReadyPods":{"enabled":false},
            "notAllPodsReady":{"enabled":true,"configuration":{"samplePeriodInMinutes":10,"observationPeriodInMinutes":10}},
            "highMemoryUsage":{"enabled":false},
            "highCpuUsage":{"enabled":false},
            "highCpuThrottling":{"enabled":false},
            "oomKills":{"enabled":false},
            "jobFailureEvents":{"enabled":false},
            "podBackoffEvents":{"enabled":false},
            "podEvictionEvents":{"enabled":false},
            "podPreemptionEvents":{"enabled":false}
            }
        }
        ]
    body_format: json
    status_code: 200
```

</details>


3. Run your provisioning script again:

```bash
ace enable https://github.com/dynatrace-ace/basic-dt-demo.git --local
```

Now your configuration should be enabled

<div style={{ textAlign: 'left' }}>
<img src={require('./img/pending-pods-on.png').default} alt="Description" width="400" />
</div>

### Tips: How to get a Dynatrace configuration body for API?

- Every setting has access to their own API:

    <div style={{ textAlign: 'left' }}>
    <img src={require('./img/dt-get-api-1.png').default} alt="Description" width="800" />
    </div>

    > Note: For other elements such as notebooks, dashboards & workflows, you can always download them in JSON format

- Check the url and body:

    <div style={{ textAlign: 'left' }}>
    <img src={require('./img/dt-get-body.png').default} alt="Description" width="400" />
    </div>

### Tips: I have my bash command but I don't know Ansible

- GenAI models are excellent translators (e.g., bash to Ansible), but please use them with moderation and responsibility.