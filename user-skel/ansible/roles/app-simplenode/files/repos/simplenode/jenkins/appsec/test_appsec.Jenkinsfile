@Library('ace@v1.1') ace
@Library('jenkinstest@v1.3.0') jenkinstest

def event = new com.dynatrace.ace.Event()
def jmeter = new com.dynatrace.ace.Jmeter()
 
pipeline {

    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
        string(name: 'BUILD', defaultValue: '', description: 'The build version to deploy.', trim: true)
        string(name: 'ART_VERSION', defaultValue: '', description: 'Artefact version that is being deployed.', trim: true)
        choice(name: 'QG_MODE', choices: ['yaml','dashboard'], description: 'Use yaml or dashboard for QG')
    }
    environment {
        TARGET_NAMESPACE = 'simplenode-appsec-staging'
        PROJECT = 'simplenode-appsec'
        MONITORING = 'dynatrace'
        VU = 1
        TESTDURATION = 840
        COMPONENT = 'api'
        PARTOF = 'simplenodeservice'
        CLOUD_AUTOMATION_API_TOKEN = credentials('CA_API_TOKEN')
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')

        // cloudautomation tool params
        CLOUD_AUTOMATION_PROJECT = 'simplenode-appsec'
        CLOUD_AUTOMATION_SERVICE = 'simplenodeservice'
        CLOUD_AUTOMATION_STAGE = 'staging'
        CLOUD_AUTOMATION_SOURCE = 'gitea'
        CLOUD_AUTOMATION_MONITORING = 'dynatrace'
        SHIPYARD_FILE = 'cloudautomation/shipyard.yaml'
        SLO_FILE = 'cloudautomation/slo_appsec.yaml'
        SLI_FILE = 'cloudautomation/sli_appsec.yaml'
        DT_CONFIG_FILE = 'cloudautomation/dynatrace.conf.yaml'

    }
    agent {
        label 'kubegit'
    }
    stages {
        stage ('Quality Gate Init') {
            agent {
                    label 'cloud-automation-runner' 
                  }
            steps {
                checkout scm
                container('cloud-automation-runner') {
                    sh '/cloud_automation/cloud_automation_init.sh'
                }
                stash includes: 'cloud_automation.init.json', name: 'cloud_automation-init' 
            }           
        }
        stage('DT Test Start') {
            steps {
                    script {
                        def rootDir = pwd()
                        def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                        def status = event.pushDynatraceInfoEvent (
                            tagRule: sharedLib.getTagRulesForPGIEvent(),
                            title: "Jmeter Start ${env.APP_NAME} ${env.ART_VERSION}",
                            description: "Performance test started for ${env.APP_NAME} ${env.ART_VERSION}",
                            source : "jmeter",
                            customProperties : [
                                "Jenkins Build Number": env.BUILD_ID,
                                "Virtual Users" : env.VU,
                                "Test Duration" : env.TESTDURATION
                            ]
                        )
                    }
            }
        }
        stage('Run performance test') {     
            steps {
                
                 container('jmeter') {
                    sh 'echo $(date --utc +%FT%T.000Z) > cloud_automation.test.starttime'
                }
                stash includes: 'cloud_automation.test.starttime', name: 'cloud_automation.test.starttime' 
                checkout scm
                container('jmeter') {
                    script {
                        def status = jmeter.executeJmeterTest ( 
                            scriptName: "jmeter/simplenodeservice_test_by_duration.jmx",
                            resultsDir: "perfCheck_${env.APP_NAME}_staging_${BUILD_NUMBER}",
                            serverUrl: "simplenodeservice.${env.TARGET_NAMESPACE}", 
                            serverPort: 80,
                            checkPath: '/health',
                            vuCount: env.VU.toInteger(),
                            testDuration: env.TESTDURATION.toInteger(),
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

               container('jmeter') {
                    sh 'echo $(date --utc +%FT%T.000Z) > cloud_automation.test.endtime'
                }
                stash includes: 'cloud_automation.test.endtime', name: 'cloud_automation.test.endtime' 
            }
        }
        stage('DT Test Stop') {
            steps {
                    script {

                        def rootDir = pwd()
                        def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                        def status = event.pushDynatraceInfoEvent (
                            tagRule: sharedLib.getTagRulesForPGIEvent(),
                            title: "Jmeter Stop ${env.APP_NAME} ${env.ART_VERSION}",
                            description: "Performance test stopped for ${env.APP_NAME} ${env.ART_VERSION}",
                            source : "jmeter",
                            customProperties : [
                                "Jenkins Build Number": env.BUILD_ID,
                                "Virtual Users" : env.VU,
                                "Test Duration" : env.TESTDURATION
                            ]
                         )
                    }
            }
        }

        stage('Quality Gate') {
            agent {
                    label 'cloud-automation-runner' 
                  }
            steps {
                    unstash 'cloud_automation-init'
                    unstash 'cloud_automation.test.starttime'
                    unstash 'cloud_automation.test.endtime'

                    container('cloud-automation-runner') {
                        sh """   
                            export CLOUD_AUTOMATION_LABELS='[{"DT_RELEASE_VERSION":"'${env.BUILD}.0.0'"},{"DT_RELEASE_BUILD_VERSION":"'${env.ART_VERSION}'"},{"DT_RELEASE_STAGE":"'${env.TARGET_NAMESPACE}'"},{"DT_RELEASE_PRODUCT":"'${env.PARTOF}'"}]'
                            
                            export CI_PIPELINE_IID="${BUILD_ID}"
                            export CI_JOB_NAME="${JOB_NAME}"
                            export CI_JOB_URL="${JOB_URL}"
                            export CI_PROJECT_NAME="${env.PROJECT}"

                            /cloud_automation/cloud_automation_eval.sh
                        """
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

                            def status = event.pushDynatraceErrorEvent (
                                tagRule: getTagRules(),
                                title: "Quality Gate failed for ${env.APP_NAME} ${env.ART_VERSION}",
                                description: "Quality Gate evaluation failed for ${env.APP_NAME} ${env.ART_VERSION}",
                                source : "jenkins",
                                customProperties : [
                                    "Jenkins Build Number": env.BUILD_ID
                                ]
                            )
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
                build job: "4. Deploy production",
                    wait: false,
                    parameters: [
                        string(name: 'APP_NAME', value: "${env.APP_NAME}"),
                        string(name: 'BUILD', value: "${env.BUILD}"),
                        string(name: 'ART_VERSION', value: "${env.ART_VERSION}")
                    ]
            }
        }  
    }
}
