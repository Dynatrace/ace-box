# Role to manage Mattermost

## main

Deploys Mattermost Operator and Mattermost CRD.

## ensure-team

Creates a Mattermost team.

Requires vars:

|Variable name|Description|
|---|---|
|mm_admin_token|Admin token, needs permissions to manage teams|
|mm_team_name|Name of team|
|mm_team_display_name|(Optional) display name of team|

Sets facts:
- mm_team_id

## ensure-channel

Creates a Mattermost channel.

Requires vars:

|Variable name|Description|
|---|---|
|mm_admin_token|Admin token, needs permissions to manage channels|
|mm_team_id|Id of team the channel will be created in|
|mm_channel_name|Name of channel|
|mm_channel_display_name|(Optional) display name of channel|

Sets facts:
- mm_channel_id

## ensure-webhook

Creates a Mattermost webhook.

Requires vars:

|Variable name|Description|
|---|---|
|mm_admin_token|Admin token, needs permissions to manage webhooks|
|mm_channel_id|Id of channel the webhook will post in|

Sets facts:
- mm_webhook_id

## ensure-admin

Creates a Mattermost admin user.

Requires vars:

|Variable name|Description|
|---|---|
|mm_admin_email|Admin user email|
|mm_admin_name|Admin user name|
|mm_admin_password|Admin user password|

By default, Mattermost requires certain characters to be included in a password. A random password can be created with:

```
mm_admin_password: "{{ lookup('community.general.random_string', min_lower=1, min_upper=1, min_numeric=1, min_special=1, override_special='!#$%&()*+,-./:;<=>?@[]^_`|~', length=12) }}"
```

## ensure-user

Creates a Mattermost (non-admin) user.

Requires vars:

|Variable name|Description|
|---|---|
|mm_user_email|User email|
|mm_user_name|User name|
|mm_user_password|User password|

## ensure-token

Creates a Mattermost user token. User can either be "regular" or "admin".

Requires vars:

|Variable name|Description|
|---|---|
|mm_user_name|User name|
|mm_token_name|Token name|

Sets facts:
- mm_token
