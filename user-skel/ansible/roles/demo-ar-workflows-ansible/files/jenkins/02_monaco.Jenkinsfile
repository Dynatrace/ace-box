@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    agent {
        label 'monaco-runner'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = "${env.DYNATRACE_URL_GEN3}"
        DT_OAUTH_CLIENT_ID = credentials('DT_OAUTH_CLIENT_ID')
        DT_OAUTH_CLIENT_SECRET = credentials('DT_OAUTH_CLIENT_SECRET')
        DT_OAUTH_SSO_ENDPOINT = credentials('DT_OAUTH_SSO_ENDPOINT')
        AWX_ADMIN_USER = credentials('AWX_ADMIN_USER')
        AWX_ADMIN_PASSWORD = credentials('AWX_ADMIN_PASSWORD')
        // As of June 2023, MONACO_FEAT_AUTOMATION_RESOURCES flag required as feature is in preview
        MONACO_FEAT_AUTOMATION_RESOURCES = '1'
        // Monaco variables
        DT_OWNER_IDENTIFIER = 'demo-ar-workflows-ansible'
        RELEASE_PRODUCT = 'simplenodeservice'
        RELEASE_STAGE = 'canary-jenkins'
    }
    stages {
        stage('Dynatrace global project - Validate') {
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy monaco/manifest.yaml -p global -d'
                    }
                }
            }
        }
        stage('Dynatrace global project - Deploy') {
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy monaco/manifest.yaml -p global'
                    }
                }
            }
        }
        stage('Dynatrace app project - Validate') {
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy monaco/manifest.yaml -p app -d'
                    }
                }
            }
        }
        stage('Dynatrace app project - Deploy') {
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy monaco/manifest.yaml -p app'
                    }
                }
            }
        }
        stage('Dynatrace configuration event') {
            steps {
                script {
                    // Give Dynatrace a couple seconds to tag host according to current config
                    sleep(time:120, unit:'SECONDS')

                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    event.pushDynatraceConfigurationEvent(
                        tagRule: sharedLib.getTagRulesForHostEvent('ace-demo-canary'),
                        description: 'Monaco deployment successful: ace-demo-canary',
                        configuration: 'ace-demo-canary',
                        customProperties: [
                            'Approved by': 'ACE'
                        ]
                    )
                }
            }
        }
    }
}
