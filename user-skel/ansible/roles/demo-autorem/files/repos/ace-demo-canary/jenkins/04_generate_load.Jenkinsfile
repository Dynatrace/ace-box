pipeline {
    agent any

    stages {
        stage('Run load generator') {
            steps {
                sh "chmod +x load-gen/run.sh"
                sh "cd load-gen && ./run.sh ${env.INGRESS_DOMAIN}"
            }
        }
    }
}
