@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	agent {
		label 'kubegit'
	}
	parameters {
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
    string(name: 'REMEDIATION_URL', defaultValue: '', description: 'Remediation script to call if canary release fails', trim: true)
	}
	environment {
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
		TARGET_NAMESPACE = "canary"
		DT_API_TOKEN = credentials('DT_API_TOKEN')
		DT_TENANT_URL = credentials('DT_TENANT_URL')
		APP_NAME = "simplenodeservice"
		RELEASE_NAME = "${env.APP_NAME}-canary-v2"
	}
	stages {
		stage('Retrieve canary metadata') {
			steps {
				container('kubectl') {
					script {
						env.ART_VERSION = sh(returnStdout: true, script: "kubectl -n ${env.TARGET_NAMESPACE} get deployment ${env.RELEASE_NAME} -o jsonpath='{.metadata.labels.app\\.kubernetes\\.io/version}'")
					}
				}
			}
		}
		stage('Shift traffic') {
			steps {
				container('kubectl') {
					sh "kubectl annotate --overwrite ingress ${env.RELEASE_NAME} nginx.ingress.kubernetes.io/canary-weight='${params.CANARY_WEIGHT}' -n ${env.TARGET_NAMESPACE}"
				}
			}
		}
		stage('Dynatrace configuration change event') {
      steps {
				script {
					def rootDir = pwd()
					def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
					def status = event.pushDynatraceConfigurationEvent (
						tagRule : sharedLib.getTagRulesForServiceEvent(),
						description : "${env.RELEASE_NAME} canary weight set to ${params.CANARY_WEIGHT}%",
						source : "Jenkins",
						configuration : "Load Balancer",
						customProperties : [
							"remediationAction": "${params.REMEDIATION_URL}"
						]
					)
				}
      }
    }
	}
}
