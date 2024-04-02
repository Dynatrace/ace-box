# Role to manage DT Platform

## ensure-app

> Attention: `ensure-app` uses a non-supported API. Use at your own risk, it might break at any point!

Makes sure an App available in the Hub is installed.

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `app-engine:apps:install app-engine:apps:run hub:catalog:read` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|dt_app_id|Dynatrace app id, e.g. `dynatrace.site.reliability.guardian`|

## install-app-artifact

Installs an App from the provided artifact (zip file) or skips installation if the specified app is already installed.

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
- dt_app_id

## validate-app-version

Sets `dt_app_version` if a specific Dynatrace App is installed. `dt_app_version` is undefined if app isn't found. This task can be used to validate installation status of a required app and e.g. fail deployment early.

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

## ensure-notebook

Deploys a Dynatrace Notebook. A configuration json can be downloaded from your Dyntarce environment.

> When successfully deployed, the json response includes a unique notebook id. This id can be stored and verified to prevent duplicate deployments.

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `document:documents:write` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|notebook_path|Path to local notebook json file.|
|notebook_name|Name of notebook, helps you identify your notebook in Dynatrace.|

Sets facts:
- notebook_post_result_json

Example:

```
- block:
  - include_role:
      name: dt-platform
      tasks_from: ensure-notebook
    vars:
      dt_oauth_sso_endpoint: "{{ extra_vars.dt_oauth_sso_endpoint }}"
      dt_oauth_client_id: "{{ extra_vars.dt_oauth_client_id }}"
      dt_oauth_client_secret: "{{ extra_vars.dt_oauth_client_secret }}"
      dt_oauth_account_urn: "{{ extra_vars.dt_oauth_account_urn }}"
      dt_environment_url_gen3: "{{ extra_vars.dt_environment_url_gen3 }}"
      notebook_path: "{{ role_path_abs }}/files/validations/Validation_AR_Demo.json"
      notebook_name: "Validation - AR Demo"
  - name: Persist Notebook Id
    include_role:
      name: config-v2
      tasks_from: set-var
    vars:
      var_key_to_set: "notebook_id"
      var_value_to_set: "{{ notebook_post_result_json.id }}"
when: notebook_id is not defined
```

## delete-notebook

Deletes a Dynatrace Notebook.

Requires vars:

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scope `document:documents:read document:documents:delete` is assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|
|notebook_id|Notebook id as returned in `notebook_post_result_json` in task `ensure-notebook`.|
