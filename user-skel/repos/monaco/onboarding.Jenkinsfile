pipeline {
    parameters {
        string(name: 'MON_PROJECT_NAME', defaultValue: 'simplenodeservice', description: 'The name of the Monaco project to onboard.', trim: true)
        string(name: 'MON_APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the application to onboard.', trim: true)
        string(name: 'MON_ENDPOINT', defaultValue: 'https://dynatrace.com', description: 'The application URL for UEM.', trim: true)
        string(name: 'MON_UEM_COVERAGE', defaultValue: '75', description: 'UEM coverage percentage.', trim: true)
        booleanParam(name: 'MON_SKIP_APP', defaultValue: false, description: 'Skip the creation of the application.')
        string(name: 'MON_NAMESPACE', defaultValue: 'simplenode-staging', description: 'Which kubernetes namespace is this application running in.', trim: true)
        string(name: 'MON_WEB_CHECK', defaultValue: 'https://dynatrace.com', description: 'Which URL you want to create a HTTP monitor against.', trim: true)
        booleanParam(name: 'MON_SKIP_WEB_CHECK', defaultValue: false, description: 'Skip the deployment of the HTTP monitor.')
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
                              sh "git checkout -B onboarding/${env.MON_PROJECT_NAME}"
                    sh "mkdir -p projects/${env.MON_PROJECT_NAME}/base"
                    sh "cp -r _template/. projects/${env.MON_PROJECT_NAME}/base"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml'"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#APPLICATION_NAME_PLACEHOLDER#${env.MON_APP_NAME}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#APPLICATION_URL_PLACEHOLDER#${env.MON_ENDPOINT}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#UEM_PERCENTAGE_PLACEHOLDER#${env.MON_UEM_COVERAGE}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#KUBERNETES_NAMESPACE_PLACEHOLDER#${env.MON_NAMESPACE}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#PROJECT_NAME_PLACEHOLDER#${env.MON_PROJECT_NAME}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#SKIP_APPLICATION_PLACEHOLDER#${env.MON_SKIP_APP}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#WEBCHECK_URL_PLACEHOLDER#${env.MON_WEB_CHECK}#g' {} +"
                    sh "find projects/${env.MON_PROJECT_NAME}/base/ -type f -name '*.yaml' -exec sed -i 's#SKIP_WEBCHECK_PLACEHOLDER#${env.MON_SKIP_APP}#g' {} +"
                    sh "git add ."
                    sh "git commit -m 'Created project config for: ${env.MON_PROJECT_NAME}'"
                    sh "git push ${GIT_PROTOCOL}://${GIT_USERNAME}:${encodedPassword}@${GIT_DOMAIN}/${env.GIT_ORG_DEMO}/monaco.git"
                }
            }
          }
        }
    }
}