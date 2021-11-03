ENVS_FILE = "monaco/environments.yaml"

pipeline {
    agent {
        label 'ace'
    }
    stages {
        stage('Dynatrace base config - Validate') {
			steps {
                container('ace') {
                    script{
                        sh "monaco -v -dry-run -e=$ENVS_FILE -p=infrastructure mac/projects"
                    }
                }
			}
		}
        stage('Dynatrace base config - Deploy') {
			steps {
                container('ace') {
                    script {
				        sh "monaco -v -e=$ENVS_FILE -p=infrastructure mac/projects"
                    }
                }
			}
		}       
        stage('Dynatrace ACE project - Validate') {
			steps {
                container('ace') {
                    script{
                        sh "monaco -v -dry-run -e=$ENVS_FILE -p=ace mac/projects"
                    }
                }
			}
		}
        stage('Dynatrace ACE project - Deploy') {
			steps {
                container('ace') {
                    script {
				        sh "monaco -v -e=$ENVS_FILE -p=ace mac/projects"
                    }
                }
			}
		}       
    }
}