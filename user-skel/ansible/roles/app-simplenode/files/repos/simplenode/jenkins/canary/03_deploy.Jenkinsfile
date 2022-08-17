@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	parameters {
		string(name: 'IMAGE_NAME', defaultValue: 'ace/simplenodeservice', description: 'The image name of the service to deploy.', trim: true)
		string(name: 'IMAGE_TAG', defaultValue: '1.0.3', description: 'The image tag of the service to deploy.', trim: true)
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
		booleanParam(name: 'IS_CANARY', defaultValue: false, description: 'Is canary version of service.')
    string(name: 'RELEASE_BUILD_VERSION', defaultValue: '', description: 'Unique id describing the build', trim: true)
	}
	environment {
		CANARY_VERSION = "${params.IS_CANARY ? 'v2' : 'v1'}"
		TARGET_NAMESPACE = "canary"
		APPLICATION_BUILD_VERSION = "${params.IMAGE_TAG}"
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
		DT_API_TOKEN = credentials('DT_API_TOKEN')
		DT_TENANT_URL = credentials('DT_TENANT_URL')
		APP_NAME = "simplenodeservice"
		RELEASE_NAME = "${env.APP_NAME}-canary-${env.CANARY_VERSION}"
		// ART_VERSION only required for shared.groovy
		ART_VERSION = "${params.RELEASE_BUILD_VERSION}"
	}
	agent {
		label 'kubegit'
	}
	stages {
		stage('Deploy via Helm') {
			steps {
				checkout scm
				container('helm') {
					sh "helm upgrade --install ${env.RELEASE_NAME} helm/simplenodeservicecanary \
					--set image=${env.IMAGE_FULL} \
					--set domain=${env.INGRESS_DOMAIN} \
					--set version=${env.CANARY_VERSION} \
					--set build_version=${params.RELEASE_BUILD_VERSION} \
					--set ingress.class=public \
					--set ingress.isCanary=${params.IS_CANARY} \
					--set ingress.canaryWeight=${params.CANARY_WEIGHT} \
					--namespace ${env.TARGET_NAMESPACE} --create-namespace \
					--wait"
				}
			}
		}
		stage('Dynatrace deployment event') {
			steps {
				script {
					sleep(time:150,unit:"SECONDS")
		
					def rootDir = pwd()
					def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
					def status = event.pushDynatraceDeploymentEvent (
						tagRule: sharedLib.getTagRulesForPGIEvent(),
						deploymentName: "${env.RELEASE_NAME} deployed",
						deploymentVersion: "${env.CANARY_VERSION}",
						deploymentProject: "simplenodeservice",
						customProperties : [
							"Jenkins Build Number": "${params.IMAGE_TAG}",
							"Approved by": "ACE"
						]
					)
				}
			}
		}      
	}
}
