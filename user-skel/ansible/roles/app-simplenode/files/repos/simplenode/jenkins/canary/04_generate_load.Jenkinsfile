pipeline {
    agent any

    stages {
        stage('Run load generator') {
            steps {
                sh "chmod +x load-gen/run.sh"
                sh "cd load-gen && ./run.sh http://simplenodeservice.canary.${env.INGRESS_DOMAIN}/api/invoke?url=https://www.dynatrace.com"
            }
        }
    }
}
