# Events

## Adding deployment events to a pipeline
Add the following stage to the `deployStaging.Jenkinsfile` pipeline
```
stage('DT send deploy event') {
    steps {
        container("curl") {
            script {
                def status = pushDynatraceDeploymentEvent (
                    tagRule : tagMatchRules,
                    deploymentVersion: "${env.BUILD}",
                    customProperties : [
                        [key: 'Jenkins Build Number', value: "${env.BUILD_ID}"],
                        [key: 'Git commit', value: "${env.GIT_COMMIT}"]
                    ]
                )
            }
        }
    }
}
```

NOTE: you will have to also reference the ace library.

## Add test start/stop events
Explore the jenkins ace library and add test start and stop events to the pipeline. You might have to add the tag match rules?