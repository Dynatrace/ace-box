pipeline {
  agent {
    label "ace"
  }
  parameters {
    string(name: "BUILD_NUMBER_ARTIFACT", defaultValue: "build_number.txt", description: "Path to file specifying current build number", trim: true)
  }
  stages {
    stage("Detect build number") {
      steps {
        script {
          env.BUILD_NUMBER = sh(
            returnStdout: true,
            script: '''#!/bin/sh

            if [ -f "$BUILD_NUMBER_ARTIFACT" ]; then
              cat $BUILD_NUMBER_ARTIFACT | xargs
            else
              echo "1"
            fi
            '''
          ).trim()
        }
        script {
          sh "echo 'Using BUILD_NUMBER=$BUILD_NUMBER'"
        }
      }
    }
    stage('Trigger build') {
      steps {
        build job: "../1. Build",
        wait: false,
        parameters: [
          string(name: 'BUILD', value: env.BUILD_NUMBER)
        ]
      }
    }
  }
}