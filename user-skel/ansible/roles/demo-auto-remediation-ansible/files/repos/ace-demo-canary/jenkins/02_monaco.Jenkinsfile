ENVS_FILE = "monaco/environments.yaml"

pipeline {
	agent {
		label 'ace'
	}
	environment {
    KUBE_BEARER_TOKEN = credentials('KUBE_BEARER_TOKEN')
		DT_API_TOKEN = credentials('DT_API_TOKEN')
		DT_TENANT_URL = credentials('DT_TENANT_URL')
	}
	stages {
		stage('Retrieve AWX meta') {
			steps {
				container('ace') {
					script {
						env.AWX_ADMIN_USER = sh(returnStdout: true, script: "kubectl -n awx get secret awx-admin-creds -o jsonpath='{ .data.AWX_ADMIN_USER }'|base64 -d")
						env.AWX_ADMIN_PASSWORD = sh(returnStdout: true, script: "kubectl -n awx get secret awx-admin-creds -o jsonpath='{ .data.AWX_ADMIN_PASSWORD }'|base64 -d")
						env.AWX_REMEDIATION_URL = sh(returnStdout: true, script: "kubectl -n awx get configmap awx-meta -o jsonpath='{ .data.remediation_template_url }'")
						env.AWX_REMEDIATION_TEMPLATE_ID = AWX_REMEDIATION_URL[-1..-1]
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
						sh "sleep 60"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Validate') {
			steps {
				container('ace') {
					script {
						sh "monaco -v -dry-run -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Deploy') {
			steps {
				container('ace') {
					script {
						sh "monaco -v -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
	}
}
