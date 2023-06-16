# 5. Dynatrace Configurations leveraging Monaco 2.0

We perform Dynatrace configurations automatically via `Monaco` considering the following aspects:
- infrastructure: More generic settings
  - private synthetic location (ACE-Box)
  - request attributes (LTN,LSN,TSN)
- app-simplenode: Application specific settings
  - staging: Corresponding to the application release on staging environment
  - production : Corresponding to the application release on production environment
  common settings for staging and production releases:
    - Auto-tag
    - Application Detection
    - Application
    - Synthetic Monitor
    - Management Zone
    - Calculated Metrics Service
    - SLO 
    - Dashboard
- SRG and Workflow definitions:
  - Workflow
  - SRG to utilize SLO definitions for defining validation objectives

![gitlab-cicd](assets/gitlab_cicd_pipeline_monaco_stage.png)