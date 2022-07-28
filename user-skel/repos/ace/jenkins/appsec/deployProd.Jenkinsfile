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
                    sh "helm upgrade -i ${env.APP_NAME}-production helm/simplenodeservice -f helm/simplenodeservice/values-gen.yaml --namespace ${env.TARGET_NAMESPACE} --create-namespace --wait"
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

// def readMetaData() {
//     def conf = readYaml file: "manifests/staging/dt_meta.yaml"

//     def return_meta = ""
//     for (meta_entry in conf.metadata) {
//         if (meta_entry.key != null &&  meta_entry.key != "") {
//             def curr_meta = ""
//             curr_meta = meta_entry.key.replace(" ", "_")
//             if (meta_entry.value != null &&  meta_entry.value != "") {
//                 curr_meta += "="
//                 curr_meta += meta_entry.value.replace(" ", "_")
//             }
//             echo curr_meta
//             return_meta += curr_meta + " "
//         }
//     }
//     return return_meta
// }

// def readTags() {
//     def conf = readYaml file: "manifests/staging/dt_meta.yaml"

//     def return_tag = ""
//     for (tag_entry in conf.tags) {
//         if (tag_entry.key != null &&  tag_entry.key != "") {
//             def curr_tag = ""
//             curr_tag = tag_entry.key.replace(" ", "_")
//             if (tag_entry.value != null &&  tag_entry.value != "") {
//                 curr_tag += "="
//                 curr_tag += tag_entry.value.replace(" ", "_")
//             }
//             echo curr_tag
//             return_tag += curr_tag + " "
//         }
//     }
//     echo return_tag
//     return return_tag
// }

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