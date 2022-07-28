@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
	parameters {
		string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
    string(name: 'REMEDIATION_URL', defaultValue: '', description: 'Remediation script to call if canary release fails', trim: true)
	}
	environment {
		IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${params.IMAGE_NAME}:${params.IMAGE_TAG}"
		RELEASE_NAME = "simplenodeservice-canary-v2"
		NAMESPACE = "canary"
		DT_API_TOKEN = credentials('DT_API_TOKEN')
		DT_TENANT_URL = credentials('DT_TENANT_URL')
	}
	agent {
		label 'kubegit'
	}
	stages {
		stage('Shift traffic') {
			steps {
				container('kubectl') {
					sh "kubectl annotate --overwrite ingress ${env.RELEASE_NAME} nginx.ingress.kubernetes.io/canary-weight='${params.CANARY_WEIGHT}' -n ${env.NAMESPACE}"
				}
			}
		}
		stage('Dynatrace configuration change event') {
      steps {
				script {
					def status = event.pushDynatraceConfigurationEvent (
						tagRule : generateTagRules(),
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

def generateTagRules() {
	def tagMatchRules = [
		[
			"meTypes": [ "SERVICE" ],
			tags: [
				["context": "CONTEXTLESS", "key": "environment", "value": "${env.NAMESPACE}"],
				["context": "CONTEXTLESS", "key": "app", "value": "simplenodeservice"]
			]
		]
	]

	return tagMatchRules
}
