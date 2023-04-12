pipeline {
    agent {
        label 'ace'
    }
    stages {
        stage('Run load generator') {
            steps {
                container('ace') {
                    script {
                        sh 'chmod +x load-gen/run.sh'
                        sh "cd load-gen && ./run.sh ${env.INGRESS_PROTOCOL}://simplenodeservice-canary-jenkins.${env.INGRESS_DOMAIN}/api/invoke?url=https://www.dynatrace.com"
                    }
                }
            }
        }
    }
}
