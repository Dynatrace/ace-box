pipeline {
    agent {
        label 'kubegit'
    }
    stages {
        stage('Delete Namespace') {
            steps {
                checkout scm
                container('kubectl') {
                    sh "kubectl delete ns unguard --ignore-not-found=true"
                }
            }
        }
    }
}