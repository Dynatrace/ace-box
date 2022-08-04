@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

pipeline {
    parameters {
        string(name: 'APP_NAME', defaultValue: 'simplenodeservice', description: 'The name of the service to deploy.', trim: true)
        string(name: 'TAG_STAGING', defaultValue: '', description: 'The image of the service to deploy.', trim: true)
        string(name: 'BUILD', defaultValue: '', description: 'The version of the service to deploy.', trim: true)
        string(name: 'ART_VERSION', defaultValue: '', description: 'The Artefact Version', trim: true)
    }
    agent {
        label 'kubegit'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        TARGET_NAMESPACE = "simplenodeappsec-staging"
        PROJ_NAME = "simplenodeproject-appsec"
		RELEASE_NAME = "${env.APP_NAME}-staging"
    }
    stages {
        stage('Update spec') {
            steps {
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    env.DT_CUSTOM_PROP = sharedLib.readMetaData() + " " + generateDynamicMetaData()
                    env.DT_TAGS = sharedLib.readTags() + " " + generateDynamicTags()
                }
            }
        }     
        stage('Deploy via Helm') {
            steps {
                checkout scm
                container('helm') {
                    sh "sed -e \"s|DOMAIN_PLACEHOLDER|${env.INGRESS_DOMAIN}|\" -e \"s|ENVIRONMENT_PLACEHOLDER|${env.TARGET_NAMESPACE}|\" -e \"s|IMAGE_PLACEHOLDER|${env.TAG_STAGING}|\" -e \"s|VERSION_PLACEHOLDER|${env.BUILD}.0.0|\" -e \"s|BUILD_PLACEHOLDER|${env.ART_VERSION}|\" -e \"s|DT_TAGS_PLACEHOLDER|${env.DT_TAGS}|\" -e \"s|DT_CUSTOM_PROP_PLACEHOLDER|${env.DT_CUSTOM_PROP}|\" helm/simplenodeservice/values.yaml > helm/simplenodeservice/values-gen.yaml"
                    sh "helm upgrade -i ${env.RELEASE_NAME} helm/simplenodeservice -f helm/simplenodeservice/values-gen.yaml --namespace ${env.TARGET_NAMESPACE} --create-namespace --wait"
                }
            }
        }
            
        stage('Dynatrace deployment event') {
            steps {
                script {
                    sleep(time:150,unit:"SECONDS")
                    
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    def status = event.pushDynatraceDeploymentEvent (
                        tagRule: sharedLib.getTagRulesForPGIEvent(),
                        deploymentName: "${env.APP_NAME} ${env.ART_VERSION} deployed",
                        deploymentVersion: "${env.ART_VERSION}",
                        deploymentProject: "${env.APP_NAME}",
                        customProperties : [
                            "Jenkins Build Number": "${env.BUILD_ID}",
                            "Approved by":"ACE"
                        ]
                    )
                }
            }
        }

        stage('Launch tests') {
            steps {
                build job: "3. Test",
                wait: false,
                parameters: [
                    string(name: 'APP_NAME', value: "${env.APP_NAME}"),
                    string(name: 'BUILD', value: "${env.BUILD}"),
                    string(name: 'ART_VERSION', value: "${env.ART_VERSION}"),
                    string(name: 'QG_MODE', value: "yaml")
                ]
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
    returnValue += "keptn_project=${env.PROJ_NAME} "
    returnValue += "keptn_service=${env.APP_NAME} "
    returnValue += "keptn_stage=${env.TARGET_NAMESPACE} "
    returnValue += "url=simplenode.staging.${env.INGRESS_DOMAIN}"
    return returnValue;
}
// related to https://github.com/Dynatrace/ace-box/issues/158, can be removed once fixed in Dynatrace (136+)
def generateDynamicTags() {
    String returnValue = "";
    returnValue += "BUILD=${env.ART_VERSION} "
    return returnValue;
}



// def getTagRules() {
//     def tagMatchRules = [
//         [
//             "meTypes": [ "PROCESS_GROUP_INSTANCE"],
//             tags: [
//                 ["context": "ENVIRONMENT", "key": "DT_RELEASE_BUILD_VERSION", "value": "${env.ART_VERSION}"],
//                 ["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "${env.APP_NAME}"],
//                 ["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
//                 ["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
//                 ["context": "CONTEXTLESS", "key": "environment", "value": "${env.TARGET_NAMESPACE}"]
//             ]
//         ]
//     ]

//     return tagMatchRules
// }