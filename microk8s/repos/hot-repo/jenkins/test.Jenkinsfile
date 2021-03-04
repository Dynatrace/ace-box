@Library('ace@master') ace
@Library('keptn-library@3.4') keptnlib
import sh.keptn.Keptn
def keptn = new sh.keptn.Keptn()

def tagMatchRules = [
  [
    "meTypes": [
      ["meType": "SERVICE"]
    ],
    tags : [
      ["context": "CONTEXTLESS", "key": "app", "value": "simplenodeservice"],
      ["context": "CONTEXTLESS", "key": "environment", "value": "staging"]
    ]
  ]
]

pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
    }
    environment {
        ENVIRONMENT = 'staging'
        PROJECT = 'simplenodeproject'
        MONITORING = 'dynatrace'
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage ('Keptn Init') {
            steps {
                script {
                    keptn.keptnInit project:"${env.PROJECT}", service:"${env.APP_NAME}", stage:"${env.ENVIRONMENT}", monitoring:"${env.MONITORING}" , shipyard:'keptn/shipyard.yaml'
                    keptn.keptnAddResources('keptn/sli.yml','dynatrace/sli.yaml')
                    keptn.keptnAddResources('keptn/slo.yml','slo.yaml')
                    keptn.keptnAddResources('keptn/dynatrace.conf.yaml','dynatrace/dynatrace.conf.yaml')
                }
            }
        }
        stage('DT Test Start') {
            steps {
                container("curl") {
                    script {
                        def status = pushDynatraceInfoEvent (
                            tagRule : tagMatchRules,
                            source: "Jmeter",
                            description: "Performance test started for ${env.APP_NAME}",
                            title: "Jmeter Start",
                            customProperties : [
                                [key: 'VU Count', value: "1"],
                                [key: 'Loop Count', value: "100"]
                            ]
                        )
                    }
                }
            }
        }
        stage('Run performance test') {
            steps {
                script {
                    keptn.markEvaluationStartTime()
                }
                checkout scm
                container('jmeter') {
                    script {
                    def status = executeJMeter ( 
                        scriptName: "jmeter/simplenodeservice_load.jmx",
                        resultsDir: "perfCheck_${env.APP_NAME}_staging_${BUILD_NUMBER}",
                        serverUrl: "simplenodeservice.staging", 
                        serverPort: 80,
                        checkPath: '/health',
                        vuCount: 1,
                        loopCount: 100,
                        LTN: "perfCheck_${env.APP_NAME}_${BUILD_NUMBER}",
                        funcValidation: false,
                        avgRtValidation: 4000
                    )
                    if (status != 0) {
                        currentBuild.result = 'FAILED'
                        error "Performance test in staging failed."
                    }
                    }
                }
            }
        }
        stage('DT Test Stop') {
            steps {
                container("curl") {
                    script {
                        def status = pushDynatraceInfoEvent (
                            tagRule : tagMatchRules,
                            source: "Jmeter",
                            description: "Performance test stopped for ${env.APP_NAME}",
                            title: "Jmeter Stop",
                            customProperties : [
                                [key: 'VU Count', value: "1"],
                                [key: 'Loop Count', value: "100"]
                            ]
                        )
                    }
                }
            }
        }

        stage('Keptn Evaluation') {
            steps {
                script {
                    def keptnContext = keptn.sendStartEvaluationEvent starttime:"", endtime:"" 
                    echo keptnContext
                    result = keptn.waitForEvaluationDoneEvent setBuildResult:true, waitTime:3

                    res_file = readJSON file: "keptn.evaluationresult.${keptnContext}.json"

                    echo res_file.toString();
                }
            }
        }

        stage('Release approval') {
            // no agent, so executors are not used up when waiting for approvals
            agent none
            steps {
                script {
                    switch(currentBuild.result) {
                        case "SUCCESS": 
                            env.DPROD = true;
                            break;
                        case "UNSTABLE": 
                            try {
                                timeout(time:3, unit:'MINUTES') {
                                    env.APPROVE_PROD = input message: 'Promote to Production', ok: 'Continue', parameters: [choice(name: 'APPROVE_PROD', choices: 'YES\nNO', description: 'Deploy from STAGING to PRODUCTION?')]
                                    if (env.APPROVE_PROD == 'YES'){
                                        env.DPROD = true
                                    } else {
                                        env.DPROD = false
                                    }
                                }
                            } catch (error) {
                                env.DPROD = false
                                echo 'Timeout has been reached! Deploy to PRODUCTION automatically stopped'
                            }
                            break;
                        case "FAILURE":
                            env.DPROD = false;
                            break;
                    }
                }
            }
        }

        stage('Promote to production') {
            // no agent, so executors are not used up when waiting for other job to complete
            agent none
            when {
                expression {
                    return env.DPROD == 'true'
                }
            }
            steps {
                build job: "ace-demo/4. Deploy production",
                    wait: false,
                    parameters: [
                        string(name: 'APP_NAME', value: "${env.APP_NAME}")
                    ]
            }
        }  
    }
}
