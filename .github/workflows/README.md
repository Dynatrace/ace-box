# ACE-Box Github Actions Workflows

## `validation.yaml` : Reusable Use Case Validations Workflow

The `validation.yaml` workflow is a reusable GitHub Actions workflow designed for provisioning and validating use cases in the Ace-Box environment. It is triggered by the `workflow_call` event, allowing it to be reused by other workflows. This workflow supports multiple cloud providers and use cases, ensuring that the respective pipelines or jobs are triggered, monitored, and validated.

### Key Characteristics

- **Inputs**:
  - `use_cases`: A comma-separated string of use cases to run. Default is '["demo_all"]'.
  - `providers`: A comma-separated string of providers to run. Default is '["gcloud"]'.
  - `destroy_resources`: A boolean to enable resource destruction. Default is true.
  - `custom_domain`: An optional custom domain name.
  - `dt_tenant`: An optional Dynatrace tenant.
  - `dt_url_gen3`: An optional Dynatrace Environment URL Gen3.
  - `dt_oauth_sso_endpoint`: An optional Dynatrace OAuth SSO Endpoint.
  - `dt_oauth_account_urn`: An optional Dynatrace OAuth Account URN.
  - `environment_name`: An optional environment name.
  - `environment_url`: An optional environment URL.
  - `use_case_validation_tests_enabled`: A boolean flag to enable or disable use case validation tests. Default is false.

- **Secrets**:
  - `dt_api_token`: An optional Dynatrace API Token.
  - `gcp_credentials_json`: An optional GCP Credentials JSON.
  - `dt_oauth_client_id`: An optional Dynatrace OAuth Client ID.
  - `dt_oauth_client_secret`: An optional Dynatrace OAuth Client Secret.

- **Concurrency**:
  - Ensures that only one instance of the workflow runs at a time for the same group.

### Jobs

1. **Preparation**:
   - Runs on a spot instance.
   - Parses inputs and sets outputs for use cases and providers.

2. **Apply**:
   - Needs the preparation job to complete.
   - Runs on a spot instance.
   - Sets environment variables and uses a matrix strategy to run for each provider and use case combination.
   - Includes steps for checking out the repository, installing dependencies, debugging environment variables, configuring cloud provider-specific settings, setting up Terraform, and running Terraform commands.
   - Runs tests and conditionally destroys resources based on the `destroy_resources` input.

3. **Update PR Status**:
   - Needs the apply job to complete.
   - Runs on a spot instance.
   - Updates the status of a pull request if the workflow was triggered by a pull request event.

### Example Usage

To call this reusable workflow from another workflow, use the following syntax:

```yaml
jobs:
  call-validation:
    uses: ./.github/workflows/validation.yaml
    with:
      use_cases: '["demo_ar_workflows_gitlab","demo_ar_workflows_ansible"]'
      providers: '["gcloud","aws"]'
      destroy_resources: true
      custom_domain: "example.com"
      dt_tenant: "https://example.dynatracelabs.com"
      dt_url_gen3: "https://example.apps.dynatracelabs.com"
      dt_oauth_sso_endpoint: "https://example.sso.dynatracelabs.com"
      dt_oauth_account_urn: "urn:example:account"
      environment_name: "demo-environment"
      environment_url: "https://example.environment.com"
      use_case_validation_tests_enabled: true
    secrets:
      dt_api_token: ${{ secrets.DT_API_TOKEN }}
      gcp_credentials_json: ${{ secrets.GCP_CREDENTIALS_JSON }}
      dt_oauth_client_id: ${{ secrets.DT_OAUTH_CLIENT_ID }}
      dt_oauth_client_secret: ${{ secrets.DT_OAUTH_CLIENT_SECRET }}
```

## `pr_validation.yaml` : Caller Workflow for particular use cases validations

The `pr_validation.yaml` workflow is designed to validate pull requests (PRs) with demo use cases in the Ace-Box environment. It is triggered by a push to the `dev` branch or manually via `workflow_dispatch`. This workflow sets environment variables based on the trigger event and uses the `validation.yaml` `reusable workflow` to test demo use cases.

### Key Characteristics

- **Triggers**:
  - On push to the `dev` branch.
  - Manual trigger via `workflow_dispatch` with the following inputs:
    - `use_cases`: Comma-separated list of use cases to run (default: '["demo_all"]').
    - `providers`: Comma-separated list of providers to run (default: '["gcloud"]').
    - `destroy_resources`: Boolean to enable resource destruction (default: true).
    - `use_case_validation_tests_enabled`: Boolean to enable use case validation tests (default: false).
    - `custom_domain`: Custom domain name for validation (default: "").
    - `dt_tenant`: Dynatrace Tenant (default: "").
    - `dt_url_gen3`: Dynatrace Environment URL Gen3 (default: "").

- **Environment Variables**:
  - `DEFAULT_USE_CASES`: Default use cases to run (default: '["demo_all"]').
  - `DEFAULT_PROVIDERS`: Default providers to run (default: '["gcloud"]').
  - `DESTROY_RESOURCES`: Default value for resource destruction (default: true).
  - `USE_CASE_VALIDATION_TESTS_ENABLED`: Default value for use case validation tests (default: false).
  - `DEFAULT_CUSTOM_DOMAIN`: Default custom domain name (default: "").
  - `DT_TENANT`: Dynatrace Tenant from GitHub variables.
  - `DT_URL_GEN3`: Dynatrace Environment URL Gen3 from GitHub variables.
  - `DT_API_TOKEN`: Dynatrace API Token from GitHub secrets.

### Jobs

1. **set_env_vars**:
   - Runs on a spot instance.
   - Sets environment variables based on the trigger event (push or workflow_dispatch).
   - Outputs the set environment variables for use in subsequent jobs.

2. **test_demo_usecases**:
   - Needs the set_env_vars job to complete.
   - Uses the `validation.yaml` workflow to test demo use cases.
   - Passes the environment variables and secrets to the validation workflow.

### Example Usage

To call this reusable workflow from another workflow, use the following syntax:

```yaml
jobs:
  call-pr-validation:
    uses: ./.github/workflows/pr_validation.yaml
    with:
      use_cases: '["demo_ar_workflows_gitlab","demo_ar_workflows_ansible"]'
      providers: '["gcloud","aws"]'
      destroy_resources: true
      use_case_validation_tests_enabled: true
      custom_domain: "example.com"
      dt_tenant: "https://example.dynatracelabs.com"
      dt_url_gen3: "https://example.apps.dynatracelabs.com"
    secrets:
      dt_api_token: ${{ secrets.DT_API_TOKEN }}
      gcp_credentials_json: ${{ secrets.GCP_CREDENTIALS_JSON }}
      dt_oauth_client_id: ${{ secrets.DT_OAUTH_CLIENT_ID }}
      dt_oauth_client_secret: ${{ secrets.DT_OAUTH_CLIENT_SECRET }}
```
## `deploy-demo-envs.yaml` : Demo Environments Deployment Workflow

The `deploy-demo-envs.yaml` workflow is designed to deploy demo environments in the Ace-Box environment. It supports both sprint and live environments and can be triggered by a push to any tag or manually via `workflow_dispatch`. This workflow ensures that the respective environments are provisioned, validated, and optionally destroyed based on the provided inputs.

### Key Characteristics

- **Triggers**:
  - On push to any tag.
  - Manual trigger via `workflow_dispatch` with the following inputs:
    - `use_cases_for_both`: Comma-separated list of use cases to run for initial run (default: '["demo_all"]').
    - `providers_for_both`: Comma-separated list of providers to run for initial run (default: '["gcloud"]').
    - `custom_domain_sprint`: Custom domain name for Sprint Environment (default: "demo-sprint.ace-innovation.info").
    - `dt_tenant_sprint`: Dynatrace tenant for Sprint Environment (default: "https://xxo38725.sprint.dynatracelabs.com").
    - `dt_url_gen3_sprint`: Dynatrace platform tenant for Sprint Environment (default: "https://xxo38725.sprint.apps.dynatracelabs.com").
    - `custom_domain_live`: Custom domain name for Live Environment (default: "demo-live.ace-innovation.info").
    - `dt_tenant_live`: Dynatrace tenant for Live Environment (default: "https://dhg95339.sprint.dynatracelabs.com").
    - `dt_url_gen3_live`: Dynatrace platform tenant for Live Environment (default: "https://dhg95339.sprint.apps.dynatracelabs.com").
    - `deploy_live`: Boolean to deploy to live environment (default: false).

- **Jobs**:
  - **destroy_sprint**:
    - Runs if `deploy_live` is false.
    - Uses the `validation.yaml` workflow to destroy resources in the Sprint environment.
  - **deploy_sprint**:
    - Needs the `destroy_sprint` job to complete.
    - Runs if `deploy_live` is false.
    - Uses the `validation.yaml` workflow to deploy resources in the Sprint environment.
  - **destroy_live**:
    - Needs the `deploy_sprint` job to complete.
    - Runs if `deploy_live` is true.
    - Uses the `validation.yaml` workflow to destroy resources in the Live environment.
  - **deploy_live**:
    - Needs the `destroy_live` job to complete.
    - Runs if `deploy_live` is true.
    - Uses the `validation.yaml` workflow to deploy resources in the Live environment.

### Example Usage

To call this reusable workflow from another workflow, use the following syntax:

```yaml
jobs:
  call-deploy-demo-envs:
    uses: ./.github/workflows/deploy-demo-envs.yaml
    with:
      use_cases_for_both: '["demo_ar_workflows_gitlab","demo_ar_workflows_ansible"]'
      providers_for_both: '["gcloud","aws"]'
      custom_domain_sprint: "demo-sprint.ace-innovation.info"
      dt_tenant_sprint: "https://xxo38725.sprint.dynatracelabs.com"
      dt_url_gen3_sprint: "https://xxo38725.sprint.apps.dynatracelabs.com"
      custom_domain_live: "demo-live.ace-innovation.info"
      dt_tenant_live: "https://dhg95339.sprint.dynatracelabs.com"
      dt_url_gen3_live: "https://dhg95339.sprint.apps.dynatracelabs.com"
      deploy_live: false
    secrets:
      dt_api_token: ${{ secrets.DT_API_TOKEN }}
      gcp_credentials_json: ${{ secrets.GCP_CREDENTIALS_JSON }}
      dt_oauth_client_id: ${{ secrets.DT_OAUTH_CLIENT_ID }}
      dt_oauth_client_secret: ${{ secrets.DT_OAUTH_CLIENT_SECRET }}
```
