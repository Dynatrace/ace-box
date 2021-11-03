ENVS_FILE = "monaco/environments.yaml"

pipeline {
	agent none
	stages {
		stage('Retrieve AWX meta') {
			agent {
				label "kubegit"
			}
			steps {
				container('kubectl') {
					script {
						env.AWX_ADMIN_USER = "admin"
						env.AWX_ADMIN_PASSWORD = sh(returnStdout: true, script: "kubectl -n awx get secret awx-admin-password -o jsonpath='{ .data.password }'|base64 -d")
						env.AWX_REMEDIATION_URL = sh(returnStdout: true, script: "kubectl -n awx get configmap awx-meta -o jsonpath='{ .data.remediation_template_url }'")
						env.AWX_REMEDIATION_TEMPLATE_ID = AWX_REMEDIATION_URL[-1..-1]
					}
				}
			}
		}
		stage('Dynatrace base config - Validate') {
			agent {
				label "monaco-runner"
			}
			steps {
				container('monaco') {
					script {
						sh "monaco -v -dry-run -e=$ENVS_FILE -p=infrastructure monaco/projects"
					}
				}
			}
		}
		stage('Dynatrace base config - Deploy') {
			agent {
				label "monaco-runner"
			}
			steps {
				container('monaco') {
					script {
						sh "monaco -v -e=$ENVS_FILE -p=infrastructure monaco/projects"
						sh "sleep 60"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Validate') {
			agent {
				label "monaco-runner"
			}
			steps {
				container('monaco') {
					script {
						sh "monaco -v -dry-run -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
		stage('Dynatrace ACE project - Deploy') {
			agent {
				label "monaco-runner"
			}
			steps {
				container('monaco') {
					script {
						sh "monaco -v -e=$ENVS_FILE -p=ace monaco/projects"
					}
				}
			}
		}
	}
}
