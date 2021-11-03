pipeline {
    parameters {
        choice(name: 'BUILD', choices: ['1','2','3','4'], description: 'Select the build you want to deploy (affects application behavior, github.com/grabnerandi/simplenodeservice for more details)')
    }
    environment {
        APP_NAME = "simplenodeservice"
        ARTEFACT_ID = "ace/" + "${env.APP_NAME}"
        TAG = "${env.DOCKER_REGISTRY_URL}/${env.ARTEFACT_ID}:${env.BUILD}.0.0-${env.GIT_COMMIT}"
    }
    agent {
        label 'nodejs'
    }
    stages {
       
        stage('Node build') {
            steps {
                checkout scm
                container('nodejs') {
                    sh 'npm install'
                }
            }
        } 
        stage('Docker build') {
            steps {
                container('docker') {
                    sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.TAG} ."
                }
            }
        }
        stage('Docker push') {
            steps {
                container('docker') {
                    sh "docker push ${env.TAG}"
                }
            }
        }
    
        stage('Deploy and observe') {
            parallel {
                stage('ace-demo/Deploy to staging'){
                    steps {
                        script { env.V_TAG = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'") }
                        build job: "2. Deploy",
                        wait: false,
                        parameters: [
                            string(name: 'APP_NAME', value: "${env.APP_NAME}"),
                            string(name: 'TAG_STAGING', value: "${env.TAG}"),
                            string(name: 'BUILD', value: "${env.BUILD}"),
                            string(name: 'ART_VERSION', value: "${env.BUILD}.0.0-${env.V_TAG}")
                        ]
                    }
                }
                stage('ace-demo/Monitoring as Code') {
                    steps {
                        build job: "Monitoring as Code",
                        wait: false
                    }
                }
            }
        }
    }
}