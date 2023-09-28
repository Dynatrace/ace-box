pipeline {
  agent {
    label "ace"
  }
  stages {
    stage('Trigger build') {
      steps {
        build job: "../1. Build images",
        wait: false
      }
    }
  }
}
