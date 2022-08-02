# Define Performance Pipeline

In this lab you will activate a Quality gate for the carts service that will catch any build issues in the staging environment.

## Step 1: Replace `Jenkinsfile.performance`

1. Navigate to the `k8s-deploy-staging` repository in your Gitea instance and locate the JenkinsFile.
1. Review and uncomment the following blocks of code. (remove the  `/*` and `*/` from lines `3,7,33,47,93,184`)

    2.1. This will import the keptn groovy libraries inside the Jenkins pipeline and will set the parameter values that will used throughout the pipeline.
    ```groovy
    
    @Library('keptn-library@3.3')
    import sh.keptn.Keptn
    def keptn = new sh.keptn.Keptn()
    ```
    2.2 This set the keptn variables required
    ```groovy
      environment {
        KEPTN_PROJECT = "acl-sockshop"
        KEPTN_SERVICE = "${APP_NAME}"
        KEPTN_STAGE = "staging"
        KEPTN_MONITORING = "dynatrace"
        KEPTN_SHIPYARD = "keptn/shipyard.yaml"
        KEPTN_SLI = "keptn/${APP_NAME}-sli.yaml"
        KEPTN_SLO = "keptn/${APP_NAME}-slo.yaml"
        KEPTN_DT_CONF = "keptn/dynatrace.conf.yaml"
        KEPTN_ENDPOINT = credentials('keptn-endpoint')
        KEPTN_API_TOKEN = credentials('keptn-api-token')
        KEPTN_BRIDGE = credentials('keptn-bridge')
      }
    ```
    2.3 This stage initializes keptn, it creates the required project, service, passes all the required files for the evaluation and configures monitoring for the service that is being deployed.
    ```groovy
        stage('Keptn Init') {
      steps{
        script {
          keptn.keptnInit project:"${KEPTN_PROJECT}", service:"${KEPTN_SERVICE}", stage:"${KEPTN_STAGE}", monitoring:"${KEPTN_MONITORING}", shipyard: "${KEPTN_SHIPYARD}"
          keptn.keptnAddResources("${KEPTN_SLI}",'dynatrace/sli.yaml')
          keptn.keptnAddResources("${KEPTN_SLO}",'slo.yaml')
          keptn.keptnAddResources("${KEPTN_DT_CONF}",'dynatrace/dynatrace.conf.yaml')          
        }
      }
    } // end stage
    ```
    This marks the start time of the keptn evaluation

    ```groovy
    keptn.markEvaluationStartTime()
    ```
  The `sendStartEvaluationEvent` function posts an evaluation event to the keptn API which triggers a performance evaluation in keptn using dynatrace as the SLI provider.

  ```groovy
    def keptnContext = keptn.sendStartEvaluationEvent starttime:"", endtime:""
            echo "Open Keptns Bridge: ${keptn_bridge}/trace/${keptnContext}"
  ```

  This part of the pipeline executes a JMeter script (as defined by the scriptName) in the context of a jmeter container. The script receives a list of parameters for its configuration. The condition after the *executeJMeter* function terminates the pipeline in case of a failed test.  

  ```groovy
    container('jmeter') {
      script {
        def status = executeJMeter ( 
          scriptName: "jmeter/${env.APP_NAME}_perfcheck.jmx",
          resultsDir: "PerfCheck_${env.APP_NAME}_${env.VERSION}_${BUILD_NUMBER}",
          serverUrl: "${env.APP_NAME}.dev", 
          serverPort: 80,
          checkPath: '/health',
          vuCount: 10,
          loopCount: 250,
          LTN: "PerfCheck_${BUILD_NUMBER}",
          funcValidation: false,
          avgRtValidation: 2000
        )
        if (status != 0) {
          currentBuild.result = 'FAILED'
          error "Performance check failed."
        }
      }
    }
  ```

  Once the evaluation ends, the `keptn-library` will retrieve the results from the keptn api and approve/fail the jenkins pipeline.

  ```groovy
  def result = keptn.waitForEvaluationDoneEvent setBuildResult:true, waitTime:'5'
  echo "${result}"
  ```

  The `setBuildResult` parameters will determine the exit result of current, is set to `false` the build will ignore the keptn evaluation result and if set to true the build result will be affected by the keptn evaluation result:

  - **pass score:** build set as successful
  - **warning score:** build set as unstable
  - **fail score:** build will fail

2. **Save and commit the file.**






## Step 3: Review the SLO,SLI definitions

Go to `k8-deploy-staging\keptn` folder and review the files that define the carts SLO. You can find more information about SLO definitions [here](https://keptn.sh/docs/0.7.x/quality_gates/slo/)

```yaml
---
  spec_version: "0.1.1"
  comparison:
    aggregate_function: "avg"
    compare_with: "single_result"
    include_result_with_score: "pass"
  filter:
  objectives:
    - sli: "response_time_p95"
      key_sli: false
      pass:             # pass if (relative change <= 10% AND absolute value is < 400ms)
        - criteria:
            - "<=+10%"  # relative values require a prefixed sign (plus or minus)
            - "<400"    # absolute values only require a logical operator
      warning:          # if the response time is above 400ms and less or equal to 700ms, the result should be a warning
        - criteria:
            - "<=700"  # if the response time is above 700ms, the result should be a failure
      weight: 1         # weight default value is 1 and is used for calculating the score
    - sli: "error_rate"
      pass:
        - criteria:
            - "<=+5%"
            - "<0.5"
      warning:
        - criteria:
            - "<5"
  total_score:
    pass: "90%"
    warning: "75%"
```

Review the files used to define the SLI. You can find more information about Dynatrace SLI definitions using the Metrics V2 API [here](https://www.dynatrace.com/support/help/dynatrace-api/environment-api/metric-v2/)

```yaml
---
spec_version: '1.0'
indicators:
  throughput:          "metricSelector=builtin:service.requestCount.total:merge(\"dt.entity.service\"):sum&entitySelector=tag(environment:$STAGE),tag(app:$SERVICE),type(SERVICE)"
  error_rate:          "metricSelector=builtin:service.errors.total.count:merge(\"dt.entity.service\"):avg&entitySelector=tag(environment:$STAGE),tag(app:$SERVICE),type(SERVICE)"
  response_time_p50:   "metricSelector=builtin:service.response.time:merge(\"dt.entity.service\"):percentile(50)&entitySelector=tag(environment:$STAGE),tag(app:$SERVICE),type(SERVICE)"
  response_time_p90:   "metricSelector=builtin:service.response.time:merge(\"dt.entity.service\"):percentile(90)&entitySelector=tag(environment:$STAGE),tag(app:$SERVICE),type(SERVICE)"
  response_time_p95:   "metricSelector=builtin:service.response.time:merge(\"dt.entity.service\"):percentile(95)&entitySelector=tag(environment:$STAGE),tag(app:$SERVICE),type(SERVICE)"
```


---

[Previous Step: Write Load Test Script](../05_Write_Load_Test_Script) :arrow_backward: :arrow_forward: [Next Step: Run Performance Tests](../07_Run_Performance_Tests)

:arrow_up_small: [Back to overview](../)
