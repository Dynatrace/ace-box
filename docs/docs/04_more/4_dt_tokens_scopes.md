---
sidebar_position: 4
---

# Dynatrace Tokens

### How to create dt_oauth_client_secret?

Check how to create an Dynatrace Oauth client [here](https://docs.dynatrace.com/docs/manage/identity-access-management/access-tokens-and-oauth-clients/oauth-clients)

[Back to ACE-Box terraform.tfvars config](../01_get-started/1_configure.md#configure-terraformtfvars)

### Scopes needed for dt_oauth_client_secret?

```yaml
app-engine:apps:run 
app-engine:apps:install 
storage:events:read 
storage:events:write 
storage:metrics:read 
storage:bizevents:read 
storage:entities:read 
storage:bizevents:write 
automation:workflows:read 
automation:workflows:write 
automation:workflows:run 
automation:rules:read 
automation:rules:write 
automation:workflows:admin 
davis:analyzers:read 
davis:analyzers:execute 
storage:buckets:read 
settings:objects:read 
settings:objects:write 
settings:schemas:read
app-engine:apps:install 
app-engine:edge-connects:connect
app-engine:edge-connects:read
app-engine:edge-connects:write
app-engine:edge-connects:delete
app-settings:objects:read
hub:catalog:read
document:documents:write 
document:documents:read
```

[Back to ACE-Box terraform.tfvars config](../01_get-started/1_configure.md#configure-terraformtfvars)

### How to create dt_api_token?

Check how to create a Dynatrace API token [here](https://docs.dynatrace.com/docs/dynatrace-api/basics/dynatrace-api-authentication#create-token)

[Back to ACE-Box terraform.tfvars config](../01_get-started/1_configure.md#configure-terraformtfvars)

### Scopes needed for dt_api_token?

Initial API token with scopes `apiTokens.read` and `apiTokens.write`. This token will be used by various roles to manage their own tokens.

[Back to ACE-Box terraform.tfvars config](../01_get-started/1_configure.md#configure-terraformtfvars)