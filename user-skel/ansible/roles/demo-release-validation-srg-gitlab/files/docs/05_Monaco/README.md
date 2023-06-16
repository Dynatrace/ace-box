# 5. Dynatrace Configurations leveraging Monaco 2.0

We perform Dynatrace configurations automatically via `Monaco` considering the below settings:
- infrastructure: More generic settings to be applied at host level
  - private synthetic location (ACE-Box)
  - request attributes (LTN,LSN,TSN)
- app-simplenode: Application specific settings to be applied
  - staging: Corresponding to the application release on staging environment
  - production : Corresponding to the application release on production environment
- SRG and Workflow definitions:

![gitlab-cicd](gitlab_cicd_pipeline_monaco_stage.png)