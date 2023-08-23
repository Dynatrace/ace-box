pipeline {
    agent {
        label 'monaco-v2-runner'
    }
    environment {
        MONACO_MANIFEST = 'manifest.yaml'
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
    }
    stages {
        stage('Dry Run on Validation') {
            when {
                expression {
                    return env.BRANCH_NAME ==~ 'onboarding/.*'
                }
            }
            steps {
                script {
                    env.MON_APP = env.BRANCH_NAME.substring(env.BRANCH_NAME.indexOf('/') + 1, env.BRANCH_NAME.length())
                }
                container('monaco') {
                    script {
                        sh "echo $env.MON_APP"
                        sh "monaco deploy $MONACO_MANIFEST -g validation --dry-run"
                    }
                }
            }
        }

        stage('Deploy to Validation') {
            when {
                expression {
                    return env.BRANCH_NAME ==~ 'onboarding/.*'
                }
            }
            steps {
                script {
                    env.MON_APP = env.BRANCH_NAME.substring(env.BRANCH_NAME.indexOf('/') + 1, env.BRANCH_NAME.length())
                }
                container('monaco') {
                    script {
                        sh "echo $env.MON_APP"
                        sh "monaco deploy $MONACO_MANIFEST -g validation"
                    }
                }
            }
        }

        stage('Approval') {
            when {
                expression {
                    return env.BRANCH_NAME ==~ 'onboarding/.*'
                }
            }
            steps {
                script {
                    env.MON_APP = env.BRANCH_NAME.substring(env.BRANCH_NAME.indexOf('/') + 1, env.BRANCH_NAME.length())

                    timeout(time:15, unit:'MINUTES') {
                        env.CREATE_PR = input message: 'Are you happy with the configuration in Validation?', ok: 'Continue', parameters: [choice(name: 'CREATE_PR', choices: 'YES\nNO', description: 'Create Pull Request?')]
                    }
                }
            }
        }

        stage('Create PR') {
            when {
                expression {
                    return env.BRANCH_NAME ==~ 'onboarding/.*' && env.CREATE_PR == 'YES'
                }
            }
            steps {
                script {
                    def requestBody = """{
                        | "base": "main",
                        | "body": "PR to merge ${env.BRANCH_NAME} back in with main",
                        | "head": "${env.BRANCH_NAME}",
                        | "title": "Merge ${env.BRANCH_NAME} with main"
                    }""".stripMargin()
                    withCredentials([string(credentialsId: 'git-access-token', variable: 'GIT_TOKEN')]) {
                        def encodedPassword = URLEncoder.encode("$GIT_TOKEN", 'UTF-8')
                        def response = httpRequest contentType: 'APPLICATION_JSON',
                            httpMode: 'POST',
                            requestBody: requestBody,
                            url: "${GIT_PROTOCOL}://${GIT_DOMAIN}/api/v1/repos/${GIT_ORG_DEMO}/monaco-gitops/pulls",
                            customHeaders: [[maskValue: true, name: 'Authorization', value: "token ${encodedPassword}"]],
                            validResponseCodes: '100:201',
                            ignoreSslErrors: true
                    }
                }
            }
        }

        stage('Dry Run on Production') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy manifest.yaml -g production --dry-run'
                    }
                }
            }
        }

        stage('Deploy to Production') {
            when {
                expression {
                    return env.BRANCH_NAME == 'main'
                }
            }
            steps {
                container('monaco') {
                    script {
                        sh 'monaco deploy manifest.yaml -g production'
                    }
                }
            }
        }
    }
}
