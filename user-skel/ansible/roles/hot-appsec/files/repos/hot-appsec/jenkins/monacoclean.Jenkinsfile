ENVS_FILE = "monaco/environments.yaml"

pipeline {
    agent {
        label 'monaco-runner'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
    }
    stages {
        stage('Dynatrace Unguard config - Clean Up') {
            steps {
                container('monaco') {
                    script {
                        sh "monaco -v -e=$ENVS_FILE monaco/cleanup"
                    }
                }
            }
        }
    }
}