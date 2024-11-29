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
            defaultValue: 'canary-jenkins',
            description: 'Namespace service will be deployed in.',
            trim: true
        )
        string(
            name: 'CANARY_WEIGHT',
            defaultValue: '0',
            description: 'Weight of traffic that will be routed to service.',
            trim: true
        )
        booleanParam(name: 'IS_CANARY', defaultValue: false, description: 'Is canary version of service.')
    }
    agent {
        label 'kubegit'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
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
                    --set ingress.isCanary=${env.IS_CANARY} \
                    --set ingress.canaryWeight=${env.CANARY_WEIGHT} \
                    --set dt_release_product=\"simplenodeservice\" \
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
    }
}

def generateDynamicMetaData() {
    String returnValue = ''
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.RELEASE_BUILD_VERSION} "
    returnValue += "Version=${env.RELEASE_VERSION} "
    returnValue += "Image=${env.IMAGE_NAME}:${env.IMAGE_TAG} "
    returnValue += "url=${env.RELEASE_PRODUCT}-${env.RELEASE_STAGE}.${env.INGRESS_DOMAIN}"
    return returnValue
}

// related to https://github.com/Dynatrace/ace-box/issues/158, can be removed once fixed in Dynatrace (136+)
def generateDynamicTags() {
    String returnValue = ''
    returnValue += "BUILD=${env.RELEASE_BUILD_VERSION} "
    return returnValue
}
