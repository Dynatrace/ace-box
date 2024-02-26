# demo-all (gen3)

### Required extra vars

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure the following scopes are assigned to your OAuth client: <ul><li>storage:logs:read</li><li>storage:bizevents:read</li><li>storage:events:read</li><li>storage:events:write</li><li>storage:buckets:read</li><li>automation:workflows:read</li><li>automation:workflows:write</li><li>app-engine:apps:run</li><li>settings:objects:read</li><li>settings:objects:write</li><li>settings:schemas:read</li></ul>Make sure your Workflow authorization settings reflect the same scopes.|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|

### Optional extra vars

|Variable name|Description|
|---|---|
|are_nightly_auto_runs_enabled|Optional: Enable automatic nightly use case runs; Default: false|


Extra vars can be set e.g. as Terraform variables:

```
extra_vars = {
  dt_environment_url_gen3 = "https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com"
  dt_oauth_sso_endpoint   = "https://sso-sprint.dynatracelabs.com/sso/oauth2/token"
  ...
}
```