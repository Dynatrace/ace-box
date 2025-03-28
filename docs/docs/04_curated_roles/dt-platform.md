# dt-platform

The following curated role allows you to install apps from the [Hub](https://www.dynatrace.com/hub/). You can install apps that cater to both analysis and automation needs. Here are some examples:

For Analysis:
- Log Management and Analytics: Unified log management and analytics for actionable insights.
- Infrastructure Observability: Monitor and analyze your infrastructure for optimal performance.
- Application Observability: Gain deep insights into your applications' performance and behavior.
- Business Analytics: Track, analyze, and optimize your critical business processes.
- Cost & Carbon Optimization: Monitor and optimize your IT carbon footprint and public cloud costs.

For Automation:
- Workflows: Automate tasks in your IT landscape, remediate problems, and visualize processes.
- Jira Integration: Create, query, comment, transition, and resolve Jira tickets within workflows.
- Slack Integration: Automate Slack messaging for security incidents, attacks, remediation, and more

These apps can help you streamline operations, enhance observability, and automate routine tasks effectively.

## ensure-app

This task installs app from the Hub.

### example

```yaml
- name: Install Biz Flow App
  include_role:
    name: dt-platform
    tasks_from: ensure-app
  vars:
    dt_app_id: "{{ item.dt_app_id }}"
    dt_app_version: "{{ item.dt_app_version }}"
    dt_environment_url_gen3: "{{ extra_vars.dt_environment_url_gen3 }}"
    dt_oauth_sso_endpoint: "{{ extra_vars.dt_oauth_sso_endpoint }}"
    dt_oauth_client_id: "{{ extra_vars.dt_oauth_client_id }}"
    dt_oauth_client_secret: "{{ extra_vars.dt_oauth_client_secret }}"
    dt_oauth_account_urn: "{{ extra_vars.dt_oauth_account_urn }}"
  loop:
    - dt_app_id: "dynatrace.biz.flow"
      dt_app_version: "1.20.3"
```

> Note: you can retrieve the dt_app_id by searching the app in the hub, you will find the id in the URL.

### vars description

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `app-engine:apps:install app-engine:apps:run hub:catalog:read` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|dt_app_id|Dynatrace app id, e.g. `dynatrace.site.reliability.guardian`|

> `dt_app_version` variable is not needed as the latest version will be installed automatically.

## install-app-artifact

Installs an App from the provided artifact (zip file). If you have a custom app or any app that it is not in the hub yet, you can install it with `install-app-artifact` by providing the `dt_app_artifact_path`, meaning that you need to have the app in artifact format within your use case.

This role also executes [validate-app-version](#validate-app-version), which will skips the installation if the specified app is already installed with a given application version.

### example

```yaml
- name: Install kubernetes workflow action from artifact
  include_role:
    name: dt-platform
    tasks_from: install-app-artifact
  vars:
    dt_environment_url_gen3: "{{ extra_vars.dt_environment_url_gen3 }}"
    dt_oauth_sso_endpoint: "{{ extra_vars.dt_oauth_sso_endpoint }}"
    dt_oauth_client_id: "{{ extra_vars.dt_oauth_client_id }}"
    dt_oauth_client_secret: "{{ extra_vars.dt_oauth_client_secret }}"
    dt_oauth_account_urn: "{{ extra_vars.dt_oauth_account_urn }}"
    dt_app_artifact_path: "{{ role_path }}/../ace-box-ext-hot-k8s/files/k8s-wf-artifact/kubernetes-connector.zip"
    dt_app_id: "dynatrace.kubernetes.connector"
```

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `app-engine:apps:install` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|dt_app_artifact_path|Path to App artifact (zip)|
|dt_app_id|Dynatrace app id, e.g. `my.dynatrace.jenkins.tobias.gremmer`|


Optional vars:
|Variable name|Description|
|---|---|
|dt_app_version|Dynatrace app version, e.g. `0.0.3`|

Sets facts:
- dt_app_id

## validate-app-version

Sets `dt_app_version` if a specific Dynatrace app is installed. This is used with `install-app-artifact` role as the `ensure-app` role installs the latest version.
`dt_app_version` is undefined if app isn't found. This task can be used to validate installation status of a required app and e.g. fail deployment early.

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `app-engine:apps:install` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|dt_app_artifact_path|Path to App artifact (zip)|
|dt_app_id|Dynatrace app id, e.g. `my.dynatrace.jenkins.tobias.gremmer`|

Sets facts:
- dt_app_version
