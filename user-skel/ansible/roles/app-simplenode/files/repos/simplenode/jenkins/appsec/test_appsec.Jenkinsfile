@Library('ace@v1.1')
@Library('jenkinstest@v1.3.0')

def event = new com.dynatrace.ace.Event()
def jmeter = new com.dynatrace.ace.Jmeter()

pipeline {
    parameters {
        string(
            name: 'RELEASE_PRODUCT',
            defaultValue: 'simplenodeservice',
            description: 'The name of the service to test.',
            trim: true
        )
        string(
            name: 'IMAGE_NAME',
            defaultValue: '',
            description: 'The image name of the service to test.',
            trim: true
        )
        string(name: 'IMAGE_TAG', defaultValue: '', description: 'The image tag of the service to test.', trim: true)
        string(name: 'RELEASE_VERSION', defaultValue: '', description: 'SemVer release version.', trim: true)
        string(
            name: 'RELEASE_BUILD_VERSION',
            defaultValue: '',
            description: 'Release version, including build id.',
            trim: true
        )
        string(
            name: 'RELEASE_STAGE',
            defaultValue: 'staging-jenkins-appsec',
            description: 'Namespace service will be tested in.',
            trim: true
        )
        choice(name: 'QG_MODE', choices: ['yaml', 'dashboard'], description: 'Use yaml or dashboard for QG')
    }
    environment {
        // Testing
        VU = 1
        TESTDURATION = 840

        // DT params
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')

        // Keptn params
        CLOUD_AUTOMATION_API_TOKEN = credentials('KEPTN_API_TOKEN')
        CLOUD_AUTOMATION_ENDPOINT = "${env.KEPTN_ENDPOINT}"
        CLOUD_AUTOMATION_PROJECT = "${env.RELEASE_PRODUCT}-appsec"
        CLOUD_AUTOMATION_SERVICE = "${env.RELEASE_PRODUCT}"
        CLOUD_AUTOMATION_STAGE = 'staging' // For the sake of this demo, "staging" is preferred over "${env.RELEASE_STAGE}".
        CLOUD_AUTOMATION_SOURCE = 'jenkins'
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
        stage('Quality Gate Init') {
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
                        event.pushDynatraceInfoEvent(
                            tagRule: sharedLib.getTagRulesForPGIEvent(),
                            title: "Jmeter Start ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                            description: "Performance test started for ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                            source : 'jmeter',
                            customProperties : [
                                'Jenkins Build Number': env.BUILD_ID,
                                'Virtual Users' : env.VU,
                                'Test Duration' : env.TESTDURATION
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
                        def status = jmeter.executeJmeterTest(
                            scriptName: 'jmeter/simplenodeservice_test_by_duration.jmx',
                            resultsDir: "perfCheck_${env.RELEASE_PRODUCT}_staging_${BUILD_NUMBER}",
                            serverUrl: "${env.RELEASE_PRODUCT}.${env.RELEASE_STAGE}",
                            serverPort: 80,
                            checkPath: '/health',
                            vuCount: env.VU.toInteger(),
                            testDuration: env.TESTDURATION.toInteger(),
                            LTN: "perfCheck_${env.RELEASE_PRODUCT}_${BUILD_NUMBER}",
                            funcValidation: false,
                            avgRtValidation: 4000
                        )
                        if (status != 0) {
                            currentBuild.result = 'FAILED'
                            error 'Performance test in staging failed.'
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
                        event.pushDynatraceInfoEvent(
                            tagRule: sharedLib.getTagRulesForPGIEvent(),
                            title: "Jmeter Stop ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                            description: "Performance test stopped for ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                            source : 'jmeter',
                            customProperties : [
                                'Jenkins Build Number': env.BUILD_ID,
                                'Virtual Users' : env.VU,
                                'Test Duration' : env.TESTDURATION
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
                            export CLOUD_AUTOMATION_LABELS='[{"DT_RELEASE_VERSION":"'${env.RELEASE_VERSION}'"},{"DT_RELEASE_BUILD_VERSION":"'${env.RELEASE_BUILD_VERSION}'"},{"DT_RELEASE_STAGE":"'${env.RELEASE_STAGE}'"},{"DT_RELEASE_PRODUCT":"'${env.RELEASE_PRODUCT}'"}]'

                            export CI_PIPELINE_IID="${BUILD_ID}"
                            export CI_JOB_NAME="${JOB_NAME}"
                            export CI_JOB_URL="${JOB_URL}"
                            export CI_PROJECT_NAME="${env.RELEASE_PRODUCT}"

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
                    switch (currentBuild.result) {
                        case 'SUCCESS':
                            env.DPROD = true
                            break
                        case 'UNSTABLE':
                            try {
                                timeout(time:3, unit:'MINUTES') {
                                    env.APPROVE_PROD = input message: 'Promote to Production', ok: 'Continue', parameters: [choice(name: 'APPROVE_PROD', choices: 'YES\nNO', description: 'Deploy from STAGING to PRODUCTION?')]
                                    if (env.APPROVE_PROD == 'YES') {
                                        env.DPROD = true
                                    } else {
                                        env.DPROD = false
                                    }
                                }
                            } catch (error) {
                                env.DPROD = false
                                echo 'Timeout has been reached! Deploy to PRODUCTION automatically stopped'
                            }
                            break
                        case 'FAILURE':
                            env.DPROD = false

                            event.pushDynatraceErrorEvent(
                                tagRule: getTagRules(),
                                title: "Quality Gate failed for ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                                description: "Quality Gate evaluation failed for ${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION}",
                                source : 'jenkins',
                                customProperties : [
                                    'Jenkins Build Number': env.BUILD_ID
                                ]
                            )
                            break
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
                build job: '4. Deploy production',
                    wait: false,
                    parameters: [
                        string(name: 'RELEASE_PRODUCT', value: "${env.RELEASE_PRODUCT}"),
                        string(name: 'RELEASE_VERSION', value: "${env.RELEASE_VERSION}"),
                        string(name: 'RELEASE_BUILD_VERSION', value: "${env.RELEASE_BUILD_VERSION}"),
                        string(name: 'RELEASE_STAGE', value: 'prod-jenkins-appsec'),
                        string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                        string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
                    ]
            }
        }
    }
}
