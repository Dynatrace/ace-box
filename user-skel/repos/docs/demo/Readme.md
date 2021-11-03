# ACE-box Demo mode

This readme walks you through the various phases of the ACE-box demo mode.
The demo mode will show you the following:

- 4 jenkins pipelines: Build, Deploy Staging, Test, Deploy Production
- The `Desploy` pipeline will read metadata and tags from a yaml file and apply it
- The `Desploy` pipeline will configure a synthetic test, application definition, management zone and dashboard
- The `Test` pipeline will execute a test
- The `Test` pipeline will verify the test using Keptn Quality gates
- The `Test` pipeline will promote an artifact to production of quality has been succesfully verified
- The `Deploy production` pipeline will promote the artifact

