# Details

## Job `init_cloudautomation`

Below you will find a snippet from the `gitlab-ci.yml` file that shows the steps.

```yaml
init_cloudautomation:
  image: dynatraceace/keptn-gitlab-runner:2.2
  stage: init
  variables: 
    KEPTN_PROJECT: simplenode-gitlab
    KEPTN_SERVICE: simplenodeservice
    KEPTN_STAGE: staging
    KEPTN_SOURCE: gitlab
    KEPTN_MONITORING: dynatrace
    SHIPYARD_FILE: cloudautomation/shipyard.yaml
    SLO_FILE: cloudautomation/slo.yaml
    SLI_FILE: cloudautomation/sli.yaml
    DT_CONFIG_FILE: cloudautomation/dynatrace.conf.yaml
  script:
    - /keptn/keptn_init.sh
  artifacts:
    paths: 
    - keptn.init.json
```

Important parts:
- `image: dynatraceace/keptn-gitlab-runner:2.2`: a reference to an existing container image that contains logic to handle interactions with Cloud Automation and Keptn
- `variables`
  - `KEPTN_PROJECT/KEPTN_SERVICE/KEPTN_STAGE`: the name of project/service/stage within Cloud Automation/Keptn. They can be changed but keep note of when changing the stage name then the shipyard file also needs to be updated
  - `SHIPYARD_FILE: cloudautomation/shipyard.yaml`: location of the shipyard file
  - `SLO_FILE: cloudautomation/slo.yaml`: location of the SLO yaml file
  - `SLI_FILE: cloudautomation/sli.yaml`: location of the SLI yaml file
  - `DT_CONFIG_FILE: cloudautomation/dynatrace.conf.yaml`: location of the dynatrace configuration file