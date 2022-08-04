@Library('ace@v1.1') _ 

def event = new com.dynatrace.ace.Event()

pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
        string(name: 'BUILD', defaultValue: '', description: 'The build of the service to deploy.', trim: true)
        string(name: 'ART_VERSION', defaultValue: '', description: 'The artefact version to be deployed.', trim: true)
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        STAGING_NAMESPACE = "simplenodeappsec-staging"
        TARGET_NAMESPACE = "simplenodeappsec-production"
		RELEASE_NAME = "${env.APP_NAME}-production"
    }
    agent {
        label 'kubegit'
    }
    stages {
        stage('Update production artefact') {
            steps {
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    env.DT_CUSTOM_PROP = sharedLib.readMetaData() + " " + generateDynamicMetaData()
                    env.DT_TAGS = sharedLib.readTags()
                }
                container('kubectl') {
                    sh "sed -e \"s|DOMAIN_PLACEHOLDER|${env.INGRESS_DOMAIN}|\" \
                    -e \"s|CONTAINER_IMAGE_PLACEHOLDER|${env.CONTAINER_IMAGE}|\" \
                    -e \"s|ENVIRONMENT_PLACEHOLDER|${env.TARGET_NAMESPACE}|\" \
                    -e \"s|IMAGE_PLACEHOLDER|`kubectl -n ${env.STAGING_NAMESPACE} get deployment -o jsonpath='{.items[*].spec.template.spec.containers[0].image}' --field-selector=metadata.name=${env.APP_NAME}`|\" \
                    -e \"s|VERSION_PLACEHOLDER|${env.ART_VERSION}|\" \
                    -e \"s|BUILD_PLACEHOLDER|${env.ART_VERSION}|\" \
                    -e \"s|DT_TAGS_PLACEHOLDER|${env.DT_TAGS}|\" \
                    -e \"s|DT_CUSTOM_PROP_PLACEHOLDER|${env.DT_CUSTOM_PROP}|\" \
                    helm/simplenodeservice/values.yaml > helm/simplenodeservice/values-gen.yaml"
                }
                container('helm') {
                    sh "cat helm/simplenodeservice/values-gen.yaml"
                    sh "helm upgrade -i ${env.RELEASE_NAME} helm/simplenodeservice -f helm/simplenodeservice/values-gen.yaml --namespace ${env.TARGET_NAMESPACE} --create-namespace --wait"
                }
            }
        }
        stage('DT send deploy event') {
            steps {
                script {
                    sh "sleep 150"
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"

                    def status = event.pushDynatraceDeploymentEvent (
                        tagRule: sharedLib.getTagRulesForPGIEvent(),
                        deploymentName: "${env.APP_NAME} ${env.ART_VERSION} deployed",
                        deploymentVersion: "${env.ART_VERSION}",
                        deploymentProject: "${env.APP_NAME}",
                        customProperties : [
                            "Jenkins Build Number": env.BUILD_ID
                        ]
                    )
                }
            }
        }
    }
}

def generateDynamicMetaData(){
    String returnValue = "";
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.BUILD} "
    returnValue += "Image=${env.TAG_STAGING} "
    //returnValue += "keptn_project=simplenodeproject "
    //returnValue += "keptn_service=${env.APP_NAME} "
    //returnValue += "keptn_stage=staging "
    returnValue += "url=${env.APP_NAME}.${env.TARGET_NAMESPACE}.${env.INGRESS_DOMAIN}"
    return returnValue;
}
