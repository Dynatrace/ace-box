@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    parameters {
        string(
            name: 'RELEASE_PRODUCT',
            defaultValue: 'simplenodeservice',
            description: 'The name of the service to deploy.',
            trim: true
        )
        string(
            name: 'IMAGE_NAME',
            defaultValue: '',
            description: 'The image name of the service to deploy.',
            trim: true
        )
        string(name: 'IMAGE_TAG', defaultValue: '', description: 'The image tag of the service to deploy.', trim: true)
        string(name: 'RELEASE_VERSION', defaultValue: '', description: 'SemVer release version.', trim: true)
        string(
            name: 'RELEASE_BUILD_VERSION',
            defaultValue: '',
            description: 'Release version, including build id.',
            trim: true
        )
        string(
            name: 'RELEASE_STAGE',
            defaultValue: 'staging-jenkins',
            description: 'Namespace service will be deployed in.',
            trim: true
        )
    }
    agent {
        label 'kubegit'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        PROJ_NAME = 'simplenodeproject-jenkins'
    }
    stages {
        stage('Deploy') {
            steps {
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    env.DT_CUSTOM_PROP = sharedLib.readMetaData() + ' ' + generateDynamicMetaData()
                    env.DT_TAGS = sharedLib.readTags() + ' ' + generateDynamicTags()
                }
                container('helm') {
                    sh "helm upgrade --install ${env.RELEASE_PRODUCT} helm/simplenodeservice \
                    --set image=\"${env.IMAGE_NAME}:${env.IMAGE_TAG}\" \
                    --set domain=${env.INGRESS_DOMAIN} \
                    --set version=${env.RELEASE_VERSION} \
                    --set build_version=${env.RELEASE_BUILD_VERSION} \
                    --set dt_tags=\"${env.DT_TAGS}\" \
                    --set dt_custom_prop=\"${env.DT_CUSTOM_PROP}\" \
                    --set ingress.class=${env.INGRESS_CLASS} \
                    --namespace ${env.RELEASE_STAGE} --create-namespace \
                    --wait"
                }
            }
        }
        stage('Dynatrace deployment event') {
            steps {
                script {
                    sleep(time:150, unit:'SECONDS')

                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    event.pushDynatraceDeploymentEvent(
                        tagRule: sharedLib.getTagRulesForPGIEvent(),
                        deploymentName: "${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION} deployed",
                        deploymentVersion: "${env.RELEASE_BUILD_VERSION}",
                        deploymentProject: "${env.RELEASE_PRODUCT}",
                        customProperties : [
                            'Jenkins Build Number': "${env.BUILD_ID}",
                            'Approved by':'ACE'
                        ]
                    )
                }
            }
        }
        stage('Launch tests') {
            steps {
                build job: '3. Test',
                wait: false,
                parameters: [
                    string(name: 'RELEASE_PRODUCT', value: "${env.RELEASE_PRODUCT}"),
                    string(name: 'RELEASE_VERSION', value: "${env.RELEASE_VERSION}"),
                    string(name: 'RELEASE_BUILD_VERSION', value: "${env.RELEASE_BUILD_VERSION}"),
                    string(name: 'RELEASE_STAGE', value: "${env.RELEASE_STAGE}"),
                    string(name: 'IMAGE_TAG', value: "${env.IMAGE_TAG}"),
                    string(name: 'IMAGE_NAME', value: "${env.IMAGE_NAME}"),
                    string(name: 'QG_MODE', value: 'yaml')
                ]
            }
        }
    }
}

def generateDynamicMetaData() {
    String returnValue = ''
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.RELEASE_BUILD_VERSION} "
    returnValue += "Version=${env.RELEASE_VERSION} "
    returnValue += "Image=${env.IMAGE_NAME}:${env.IMAGE_TAG} "
    returnValue += "cloud_automation_project=${env.PROJ_NAME} "
    returnValue += "cloud_automation_service=${env.RELEASE_PRODUCT} "
    returnValue += "cloud_automation_stage=${env.RELEASE_STAGE} "
    returnValue += "url=${env.RELEASE_PRODUCT}-${env.RELEASE_STAGE}.${env.INGRESS_DOMAIN}"
    return returnValue
}

// related to https://github.com/Dynatrace/ace-box/issues/158, can be removed once fixed in Dynatrace (136+)
def generateDynamicTags() {
    String returnValue = ''
    returnValue += "BUILD=${env.RELEASE_BUILD_VERSION} "
    return returnValue
}
