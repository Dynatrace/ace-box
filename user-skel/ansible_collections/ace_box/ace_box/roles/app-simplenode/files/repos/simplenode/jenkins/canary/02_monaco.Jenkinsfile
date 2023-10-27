@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

ENVS_FILE = 'monaco/environments.yaml'

pipeline {
    agent {
        label 'ace'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
    }
    stages {
        stage('Retrieve AWX meta') {
            steps {
                container('ace') {
                    script {
                        env.AWX_ADMIN_USER = sh(returnStdout: true, script: "kubectl -n awx get secret awx-admin-creds -o jsonpath='{ .data.username }'|base64 -d")
                        env.AWX_ADMIN_PASSWORD = sh(returnStdout: true, script: "kubectl -n awx get secret awx-admin-creds -o jsonpath='{ .data.password }'|base64 -d")
                        env.AWX_REMEDIATION_URL = sh(returnStdout: true, script: "kubectl -n awx get configmap awx-meta-canary -o jsonpath='{ .data.remediation_template_url }'")
                        env.AWX_REMEDIATION_TEMPLATE_ID = sh(returnStdout: true, script: "kubectl -n awx get configmap awx-meta-canary -o jsonpath='{ .data.remediation_template_id }'")
                    }
                }
            }
        }
        stage('Dynatrace base config - Validate') {
            steps {
                container('ace') {
                    script {
                        sh "monaco -v -dry-run -e=$ENVS_FILE -p=infrastructure monaco/projects"
                    }
                }
            }
        }
        stage('Dynatrace base config - Deploy') {
            steps {
                container('ace') {
                    script {
                        sh "monaco -v -e=$ENVS_FILE -p=infrastructure monaco/projects"
                        sh 'sleep 60'
                    }
                }
            }
        }
        stage('Dynatrace ACE project - Validate') {
            steps {
                container('ace') {
                    script {
                        sh "monaco -v -dry-run -e=$ENVS_FILE -p=canary monaco/projects"
                    }
                }
            }
        }
        stage('Dynatrace ACE project - Deploy') {
            steps {
                container('ace') {
                    script {
                        sh "monaco -v -e=$ENVS_FILE -p=canary monaco/projects"
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
