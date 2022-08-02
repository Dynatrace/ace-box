@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	parameters {
		string(name: 'IMAGE_NAME', defaultValue: 'ace/simplenodeservice', description: 'The image name of the service to deploy.', trim: true)
		string(name: 'IMAGE_TAG', defaultValue: '1.0.3', description: 'The image tag of the service to deploy.', trim: true)
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
		booleanParam(name: 'IS_CANARY', defaultValue: false, description: 'Is canary version of service.')
	}
	environment {
		APP_NAME = "simplenodeservice-canary"
		CANARY_VERSION = "${params.IS_CANARY ? 'v2' : 'v1'}"
		RELEASE_NAME = "${env.APP_NAME}-${env.CANARY_VERSION}"
		NAMESPACE = "canary"
		APPLICATION_BUILD_VERSION = "${params.IMAGE_TAG}"
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
		DT_API_TOKEN = credentials('DT_API_TOKEN')
		DT_TENANT_URL = credentials('DT_TENANT_URL')
	}
	agent {
		label 'kubegit'
	}
	stages {
		stage('Deploy via Helm') {
			steps {
				checkout scm
				container('helm') {
					sh "helm upgrade --install ${env.RELEASE_NAME} helm/simplenodeservice \
					--set image=${env.IMAGE_FULL} \
					--set domain=${env.INGRESS_DOMAIN} \
					--set version=${env.CANARY_VERSION} \
					--set build_version=${params.IMAGE_TAG} \
					--set isCanary=${params.IS_CANARY} \
					--set canaryWeight=${params.CANARY_WEIGHT} \
					--namespace ${env.NAMESPACE} --create-namespace \
					--wait"
				}
			}
		}
		stage('Dynatrace deployment event') {
			steps {
				script {
					sleep(time:120,unit:"SECONDS")
		
					def status = event.pushDynatraceDeploymentEvent (
						tagRule: generateTagRules(),
						deploymentName: "${env.RELEASE_NAME} deployed",
						deploymentVersion: "${env.CANARY_VERSION}",
						deploymentProject: "simplenode-app",
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

def generateTagRules() {
	def tagMatchRules = [
		[
			"meTypes": [ "PROCESS_GROUP_INSTANCE" ],
			tags: [
				["context": "ENVIRONMENT", "key": "DT_APPLICATION_BUILD_VERSION", "value": "${env.APPLICATION_BUILD_VERSION}"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "simplenodeservice"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
				["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"]
			]
		]
	]

	return tagMatchRules
}
