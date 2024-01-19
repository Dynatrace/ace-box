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
            defaultValue: 'staging-jenkins',
            description: 'Namespace service will be tested in.',
            trim: true
        )
        choice(name: 'QG_MODE', choices: ['yaml', 'dashboard'], description: 'Use yaml or dashboard for QG')
    }
    environment {
        // Testing
        VU = 1
        TESTDURATION = 180

        // DT params
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        DYNATRACE_URL_GEN3 = "${env.DYNATRACE_URL_GEN3}"
        ACCOUNT_URN = credentials('ACCOUNT_URN')
        DYNATRACE_CLIENT_ID = credentials('DYNATRACE_CLIENT_ID')
        DYNATRACE_SECRET = credentials('DYNATRACE_SECRET')
        DYNATRACE_SSO_URL = credentials('DYNATRACE_SSO_URL')
        SRG_EVALUATION_SERVICE = 'simplenodeservice'
        SRG_EVALUATION_STAGE = 'staging'        

    }
    agent {
        label 'kubegit'
    }
    stages {

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
                    sh 'echo $(date --utc +%FT%T.000Z) > srg.test.starttime'
                }
                stash includes: 'srg.test.starttime', name: 'srg.test.starttime'
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
                    sh 'echo $(date --utc +%FT%T.000Z) > srg.test.endtime'
                }
                stash includes: 'srg.test.endtime', name: 'srg.test.endtime'
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

        stage('Release Validation with SRG') {
            agent {
                    label 'dta-runner'
            }

            steps {
                    unstash 'srg.test.starttime'
                    unstash 'srg.test.endtime'

                    container('dta') {
                        script {
                         sh """                            
                            eval_start=\$(cat srg.test.starttime)
                            eval_end=\$(cat srg.test.endtime)
                            dta srg evaluate --service $SRG_EVALUATION_SERVICE --stage $SRG_EVALUATION_STAGE --start-time=\$eval_start --end-time=\$eval_end --stop-on-failure
                         """
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
                        string(name: 'RELEASE_STAGE', value: 'prod-jenkins'),
                        string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                        string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
                    ]
            }
        }
    }
}
