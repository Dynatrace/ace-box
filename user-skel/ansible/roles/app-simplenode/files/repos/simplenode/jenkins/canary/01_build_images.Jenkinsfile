pipeline {
	environment {
		IMAGE_NAME = "ace/simplenodeservice-canary"
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
                script {
									env.GIT_HASH_SHORT = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
								}
								build job: "demo-auto-remediation/3. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                  string(name: 'RELEASE_BUILD_VERSION', value: "${env.IMAGE_TAG}-${env.GIT_HASH_SHORT}")
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
                script {
									env.GIT_HASH_SHORT = sh(returnStdout: true, script: "echo ${env.GIT_COMMIT} | cut -c1-6 | tr -d '\n'")
								}
								build job: "demo-auto-remediation/3. Deploy",
								wait: false,
								parameters: [
									string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
									string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
									booleanParam(name: 'IS_CANARY', value: true),
									string(name: 'CANARY_WEIGHT', value: "0"),
                  string(name: 'RELEASE_BUILD_VERSION', value: "${env.IMAGE_TAG}-${env.GIT_HASH_SHORT}")
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
		stage('Generate Load') {
			steps {
				build job: "demo-auto-remediation/4. Generate Load",
				wait: false
			}
		}
	}
}
