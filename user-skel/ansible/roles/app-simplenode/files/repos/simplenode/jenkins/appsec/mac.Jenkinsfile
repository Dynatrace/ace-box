@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

ENVS_FILE = "monaco/environments.yaml"

pipeline {
    agent {
        label 'ace'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
    }
    stages {
        stage('Dynatrace base config - Validate') {
			steps {
                container('ace') {
                    script{
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
                        sh "sleep 60"
                    }
                }
			}
		}       
        stage('Dynatrace ACE project - Validate') {
			steps {
                container('ace') {
                    script{
                        sh "monaco -v -dry-run -e=$ENVS_FILE -p=simplenode-appsec monaco/projects"
                    }
                }
			}
		}
        stage('Dynatrace ACE project - Deploy') {
			steps {
                container('ace') {
                    script {
				        sh "monaco -v -e=$ENVS_FILE -p=simplenode-appsec monaco/projects"
                    }
                }
			}
		} 
        stage('Dynatrace configuration event') {
            steps {
                script {
                    // Give Dynatrace a couple seconds to tag host according to current config
                    sleep(time:120,unit:"SECONDS")
                    
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    def status = event.pushDynatraceConfigurationEvent (
                        tagRule: sharedLib.getTagRulesForHostEvent("simplenodeappsec-staging"),
                        description: "Monaco deployment successful: simplenodeappsec-staging",
                        configuration: "simplenodeappsec-staging",
                        customProperties: [
                            "Approved by": "ACE"
                        ]
                    )
                }
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    def status = event.pushDynatraceConfigurationEvent (
                        tagRule: sharedLib.getTagRulesForHostEvent("simplenodeappsec-prod"),
                        description: "Monaco deployment successful: simplenodeappsec-prod",
                        configuration: "simplenodeappsec-prod",
                        customProperties: [
                            "Approved by": "ACE"
                        ]
                    )
                }
            }
        }      
    }
}