@Library('ace@master') ace
@Library('keptn-library@5.0') keptnlib
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
                    keptn.keptnAddResources('keptn/jmeter.conf.yaml','jmeter/jmeter.conf.yaml')
                    keptn.keptnAddResources('jmeter/simplenodeservice_load.jmx','jmeter/simplenodeservice_load.jmx')
                }
            }
        }
        stage('Keptn Performance as a Self Service') {
            steps {
                script {
                    def keptnContext = keptn.sendDeploymentFinishedEvent testStrategy:"performance", deploymentURI:"http://simplenodeservice.staging"
                    result = keptn.waitForEvaluationDoneEvent setBuildResult:true, waitTime:15

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
