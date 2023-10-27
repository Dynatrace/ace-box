pipeline {
    parameters {
        choice(
            name: 'BUILD',
            choices: ['1', '2', '3', '4', '5'],
            description: '''
                Select the build you want to deploy
                (affects application behavior, github.com/grabnerandi/simplenodeservice for more details)'
            '''
        )
    }
    environment {
        GIT_COMMIT_SHORT = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
        RELEASE_PRODUCT = 'simplenodeservice'
        RELEASE_VERSION = "${params.BUILD}.0.0"
        RELEASE_BUILD_VERSION = "${env.RELEASE_VERSION}-${env.GIT_COMMIT_SHORT}"
        IMAGE_TAG = "${env.RELEASE_BUILD_VERSION}"
        IMAGE_NAME = "${env.DOCKER_REGISTRY_URL}/${env.RELEASE_PRODUCT}"
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
                    sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.IMAGE_NAME}:${env.IMAGE_TAG} ."
                }
            }
        }
        stage('Docker push') {
            steps {
                container('docker') {
                    sh "docker push ${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                }
            }
        }
        stage('Deploy and observe') {
            parallel {
                stage('Deploy to staging') {
                    steps {
                        build job: '2. Deploy',
                        parameters: [
                            string(name: 'RELEASE_PRODUCT', value: "${env.RELEASE_PRODUCT}"),
                            string(name: 'RELEASE_VERSION', value: "${env.RELEASE_VERSION}"),
                            string(name: 'RELEASE_BUILD_VERSION', value: "${env.RELEASE_BUILD_VERSION}"),
                            string(name: 'RELEASE_STAGE', value: 'staging-jenkins-appsec'),
                            string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                            string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}")
                        ],
                        wait: false
                    }
                }
                stage('Monitoring as Code') {
                    steps {
                        build job: 'Monitoring as Code',
                        wait: false
                    }
                }
            }
        }
    }
}
