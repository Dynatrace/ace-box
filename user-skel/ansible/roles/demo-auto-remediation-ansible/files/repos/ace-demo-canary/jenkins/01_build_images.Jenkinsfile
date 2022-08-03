pipeline {
	environment {
		IMAGE_NAME = "ace/simplenodeservice"
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
		stage('Docker build and push') {
			parallel {
				stage('Build 1') {
					environment {
						BUILD = "1"
						IMAGE_TAG = "${env.BUILD}.0.3"
						IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
					}
					stages {
						stage('Docker build') {
							steps {
								container('docker') {
									sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.IMAGE_FULL} ."
								}
							}
						}
						stage('Docker push') {
							steps {
								container('docker') {
									sh "docker push ${env.IMAGE_FULL}"
								}
							}
						}
						stage('Deploy good build'){
							steps {
								build job: "demo-auto-remediation/3. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}")
								]
							}
						}
					}
				}
				stage('Build 4') {
					environment {
						BUILD = "4"
						IMAGE_TAG = "${env.BUILD}.0.3"
						IMAGE_FULL = "${env.DOCKER_REGISTRY_URL}/${env.IMAGE_NAME}:${env.IMAGE_TAG}"
					}
					stages {
						stage('Docker build') {
							steps {
								container('docker') {
									sh "docker build --build-arg BUILD_NUMBER=${env.BUILD} -t ${env.IMAGE_FULL} ."
								}
							}
						}
						stage('Docker push') {
							steps {
								container('docker') {
									sh "docker push ${env.IMAGE_FULL}"
								}
							}
						}
						stage('Deploy faulty build'){
							steps {
								build job: "demo-auto-remediation/3. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
									booleanParam(name: 'IS_CANARY', value: true),
									string(name: 'CANARY_WEIGHT', value: "0")
								]
							}
						}
					}
				}
			}
		}
		stage('Monaco') {
			steps {
				build job: "demo-auto-remediation/2. Monaco",
				wait: false
			}
		}
	}
}
