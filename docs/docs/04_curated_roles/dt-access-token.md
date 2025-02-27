# dt-access-token

This role creates DT access tokens on the user's behalf. In order to do so, a initial token needs to be provided that has the permissions (`apiTokens.read` and `apiTokens.write`) to create other API tokens. Each role that requires access to the DT API is responsible for managing its own access token and scopes.

## Required variables

|Variable name|Comment|Example|
|---|---|---|
|dynatrace_tenant_url|URL for your DT environment. This is usually provided and sourced by default.|https://your-id.dynatrace.com|
|dynatrace_api_token|Initial API token with scopes `apiTokens.read` and `apiTokens.write`|dt0c01. ...|
|access_token_var_name|Name of variable the access token will be stored in. This variable can be used in any playbook. Variables must start with a letter or underscore character, and contain only letters, numbers and underscores.|ace_box_gitlab_api_token|
|access_token_scope|List of scopes that will be added to the access token. For a list of available scopes please see the [official docs](https://www.dynatrace.com/support/help/shortlink/token#scopes).|["slo.read","slo.write"]|

## Example

An access token can be created/sourced in any task by adding:

```
- include_role:
    name: dt-access-token
  vars:
    access_token_var_name: "ace_box_my_access_token"
    access_token_scope: ["slo.read","slo.write"]
```