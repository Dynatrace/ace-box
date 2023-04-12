pipeline {
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
        stage('Docker build and push') {
            parallel {
                stage('Build 1') {
                    environment {
                        BUILD = '1'
                        GIT_COMMIT_SHORT = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
                        // Release product may not end in string, as Dynatrace won't merge
                        // services required to be merged for canary baselining
                        RELEASE_PRODUCT = 'simplenodeservice-0'
                        RELEASE_VERSION = "${env.BUILD}.0.0"
                        RELEASE_BUILD_VERSION = "${env.RELEASE_VERSION}-${env.GIT_COMMIT_SHORT}"
                        IMAGE_TAG = "${env.RELEASE_BUILD_VERSION}"
                        IMAGE_NAME = "${env.DOCKER_REGISTRY_URL}/${env.RELEASE_PRODUCT}"
                        IS_CANARY = false
                        CANARY_WEIGHT = '0'
                    }
                    stages {
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
                        stage('Deploy good build') {
                            steps {
                                build job: 'demo-auto-remediation/3. Deploy',
                                wait: false,
                                parameters: [
                                    string(name: 'RELEASE_PRODUCT', value: "${env.RELEASE_PRODUCT}"),
                                    string(name: 'RELEASE_VERSION', value: "${env.RELEASE_VERSION}"),
                                    string(name: 'RELEASE_BUILD_VERSION', value: "${env.RELEASE_BUILD_VERSION}"),
                                    string(name: 'RELEASE_STAGE', value: 'canary-jenkins'),
                                    string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                                    string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
                                    booleanParam(name: 'IS_CANARY', value: "${env.IS_CANARY}"),
                                    string(name: 'CANARY_WEIGHT', value: "${env.CANARY_WEIGHT}")
                                ]
                            }
                        }
                    }
                }
                stage('Build 4') {
                    environment {
                        BUILD = '4'
                        GIT_COMMIT_SHORT = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
                        // Release product may not end in string, as Dynatrace won't merge
                        // services required to be merged for canary baselining
                        RELEASE_PRODUCT = 'simplenodeservice-1'
                        RELEASE_VERSION = "${env.BUILD}.0.0"
                        RELEASE_BUILD_VERSION = "${env.RELEASE_VERSION}-${env.GIT_COMMIT_SHORT}"
                        IMAGE_TAG = "${env.RELEASE_BUILD_VERSION}"
                        IMAGE_NAME = "${env.DOCKER_REGISTRY_URL}/${env.RELEASE_PRODUCT}"
                        IS_CANARY = true
                        CANARY_WEIGHT = '0'
                    }
                    stages {
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
                        stage('Deploy faulty build') {
                            steps {
                                build job: 'demo-auto-remediation/3. Deploy',
                                wait: false,
                                parameters: [
                                    string(name: 'RELEASE_PRODUCT', value: "${env.RELEASE_PRODUCT}"),
                                    string(name: 'RELEASE_VERSION', value: "${env.RELEASE_VERSION}"),
                                    string(name: 'RELEASE_BUILD_VERSION', value: "${env.RELEASE_BUILD_VERSION}"),
                                    string(name: 'RELEASE_STAGE', value: 'canary-jenkins'),
                                    string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                                    string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
                                    booleanParam(name: 'IS_CANARY', value: "${env.IS_CANARY}"),
                                    string(name: 'CANARY_WEIGHT', value: "${env.CANARY_WEIGHT}")
                                ]
                            }
                        }
                    }
                }
            }
        }
        stage('Monaco') {
            steps {
                build job: 'demo-auto-remediation/2. Monaco',
                wait: false
            }
        }
    }
}
