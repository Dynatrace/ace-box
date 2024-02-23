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

Sets `dt_app_version` if a specific Dynatarce app is installed. `dt_app_version` is undefined if app isn't found. This task can be used to validate installation status of a required app and e.g. fail deployment early.

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
