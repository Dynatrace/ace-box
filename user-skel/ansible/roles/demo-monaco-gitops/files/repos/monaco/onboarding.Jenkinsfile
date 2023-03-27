pipeline {
    environment {
        // Input parameters
        TEMPLATE_APP_NAME = "${params['App Name']}"
        TEMPLATE_APP_ENVIRONMENT = "${params['Environment']}"
        TEMPLATE_K8S_NAMESPACE = "${params['Kubernetes Namespace']}"
        TEMPLATE_APP_URL_PATTERN = "${params['Application URL pattern']}"
        TEMPLATE_HEALTH_CHECK_URL = "${params['Health check URL']}"
        TEMPLATE_SLO_AVAILABILITY = "${params['Availability SLO']}"
        TEMPLATE_SLO_WARN_AVAILABILITY = "${params['Availability SLO Warning']}"
    }
    agent any
    stages {
        stage('Push') {
          steps {
            script {
                withCredentials([usernamePassword(credentialsId: 'git-creds-ace', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    def encodedPassword = URLEncoder.encode("$GIT_PASSWORD",'UTF-8')
                    sh "git config --global user.email ${env.GITHUB_USER_EMAIL}"
                    sh "git config user.name ${GIT_USERNAME}"
                    sh "git checkout -B onboarding/${env.TEMPLATE_APP_NAME}"
                    sh "mkdir -p projects/${env.TEMPLATE_APP_NAME}"
                    sh "cp -r _template/. projects/${env.TEMPLATE_APP_NAME}"
                    sh "sed -i 's#TEMPLATE_APP_NAME#${env.TEMPLATE_APP_NAME}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_APP_ENVIRONMENT#${env.TEMPLATE_APP_ENVIRONMENT}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_K8S_NAMESPACE#${env.TEMPLATE_K8S_NAMESPACE}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_APP_URL_PATTERN#${env.TEMPLATE_APP_URL_PATTERN}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_HEALTH_CHECK_URL#${env.TEMPLATE_HEALTH_CHECK_URL}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_SLO_AVAILABILITY#${env.TEMPLATE_SLO_AVAILABILITY}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "sed -i 's#TEMPLATE_SLO_WARN_AVAILABILITY#${env.TEMPLATE_SLO_WARN_AVAILABILITY}#g' projects/${env.TEMPLATE_APP_NAME}/_config.yaml"
                    sh "git add ."
                    sh "git commit -m 'Created project config for: ${env.MON_PROJECT_NAME}'"
                    sh "git push ${GIT_PROTOCOL}://${GIT_USERNAME}:${encodedPassword}@${GIT_DOMAIN}/${env.GIT_ORG_DEMO}/monaco-gitops.git"
                }
            }
          }
        }
    }
}