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
            defaultValue: 'jenkins-prod',
            description: 'Namespace service will be deployed in.',
            trim: true
        )
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Deploy') {
            steps {
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    env.DT_CUSTOM_PROP = sharedLib.readMetaData() + ' ' + generateDynamicMetaData()
                    env.DT_TAGS = sharedLib.readTags()
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
        stage('DT send deploy event') {
            steps {
                script {
                    sh 'sleep 150'
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"

                    event.pushDynatraceDeploymentEvent(
                        tagRule: sharedLib.getTagRulesForPGIEvent(),
                        deploymentName: "${env.RELEASE_PRODUCT} ${env.RELEASE_BUILD_VERSION} deployed",
                        deploymentVersion: "${env.RELEASE_BUILD_VERSION}",
                        deploymentProject: "${env.RELEASE_PRODUCT}",
                        customProperties : [
                            'Jenkins Build Number': env.BUILD_ID
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
    returnValue += "Image=${env.TAG_STAGING} "
    returnValue += "url=${env.RELEASE_PRODUCT}-${env.RELEASE_STAGE}.${env.INGRESS_DOMAIN}"
    return returnValue
}
