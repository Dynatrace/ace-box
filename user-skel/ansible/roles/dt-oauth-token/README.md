# dt-oauth-token

This role allows you to create an oauth token on demand. After including the role, a newly created token can be used as variable `dt_oauth_access_token`.

### Required extra vars

|Variable name|Description|Example|
|---|---|---|
|dt_oauth_sso_endpoint|Dynatrace OAuth endpoint. **Attention**: Value differs depending on sprint/live environment!|`https://sso-sprint.dynatracelabs.com/sso/oauth2/token`|
|dt_oauth_client_id|Dynatrace OAuth client id.|`dt0s02...`|
|dt_oauth_client_secret|Dynatrace OAuth client secret|`dt0s02...`|
|dt_oauth_account_urn|Dynatrace OAuth account URN|`urn:dtaccount:...`|
|dt_oauth_scope|List of scopes that will token will be granted, separated by whitespaces.|`automation:workflows:read automation:workflows:write`|
