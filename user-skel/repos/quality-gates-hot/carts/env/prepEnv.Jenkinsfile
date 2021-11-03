pipeline {
	agent {
		label 'kubectl'
	}
  stages {
    stage('Create namespaces') {
      steps {
        container('kubectl') {
          sh "kubectl apply -f env/namespaces.yaml"
        }
      }
    }
    stage('Create pvc') {
      steps {
        container('kubectl') {
          sh "kubectl apply -f env/maven-pvc.yaml"
        }
      }
    }
    stage('Deploy carts-db') {
      steps {
        container('kubectl') {
          sh "kubectl apply -f manifest/carts-db.yml"
        }
      }
    }
  }
}