# demo-ar-workflows-ansible

### Required extra vars

|Variable name|Description|
|---|---|
|dt_environment_url_gen3|Dynatrace Gen3 environment url, e.g. `https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com`|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint, e.g. `https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id. Make sure scopes `automation:workflows:read` and `automation:workflows:write` are assigned to your OAuth client|
|dt_oauth_client_secret|Dynatrace OAuth client secret|
|dt_oauth_account_urn|Dynatrace OAuth account URN|

Extra vars can be set e.g. as Terraform variables:

```
extra_vars = {
  dt_environment_url_gen3 = "https://<YOUR ENVIRONMENT ID>.sprint.apps.dynatracelabs.com"
  dt_oauth_sso_endpoint   = "https://sso-sprint.dynatracelabs.com/sso/oauth2/token"
  ...
}
```