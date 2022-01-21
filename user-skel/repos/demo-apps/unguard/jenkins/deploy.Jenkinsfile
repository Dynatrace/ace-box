@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

def tagMatchRules = [
    [
        "meTypes": [ "PROCESS_GROUP_INSTANCE"],
        tags: [
            ["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "unguard"],
            ["context": "CONTEXTLESS", "key": "environment", "value": "unguard"]
        ]
    ]
]
pipeline {
    agent {
        label 'kubegit'
    }
    stages {
        stage('Prepare dependencies') {
            steps {
                checkout scm
                container('kubectl') {
                    sh "kubectl delete ns unguard --ignore-not-found=true"
                }
                container('helm') {
                    sh "helm repo add bitnami https://charts.bitnami.com/bitnami"
                    sh "helm repo update"
                    sh "helm upgrade -i unguard-mariadb bitnami/mariadb --namespace unguard --create-namespace --wait"
                }
            }
        }     
        stage('Deploy via Helm') {
            steps {
                checkout scm
                container('helm') {
                    sh "helm upgrade -i unguard helm/unguard -f helm/unguard/values.yaml --namespace unguard --set ingress.domain=${env.INGRESS_DOMAIN} --wait"
                }
            }
        }
            
        stage('Dynatrace deployment event') {
            steps {
                script {
                    sleep(time:150,unit:"SECONDS")
                    
                    def status = event.pushDynatraceDeploymentEvent (
                        tagRule: tagMatchRules,
                        deploymentName: "unguard deployed",
                        deploymentVersion: "0.0.1",
                        deploymentProject: "unguard",
                        customProperties : [
                            "Jenkins Build Number": "${env.BUILD_ID}",
                            "Approved by":"ACE"
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
    returnValue += "keptn_project=simplenodeproject "
    returnValue += "keptn_service=${env.APP_NAME} "
    returnValue += "keptn_stage=staging "
    returnValue += "url=simplenode.staging.${env.INGRESS_DOMAIN}"
    return returnValue;
}

def readMetaData() {
    def conf = readYaml file: "manifests/staging/dt_meta.yaml"

    def return_meta = ""
    for (meta_entry in conf.metadata) {
        if (meta_entry.key != null &&  meta_entry.key != "") {
            def curr_meta = ""
            curr_meta = meta_entry.key.replace(" ", "_")
            if (meta_entry.value != null &&  meta_entry.value != "") {
                curr_meta += "="
                curr_meta += meta_entry.value.replace(" ", "_")
            }
            echo curr_meta
            return_meta += curr_meta + " "
        }
    }
    return return_meta
}

def readTags() {
    def conf = readYaml file: "manifests/staging/dt_meta.yaml"

    def return_tag = ""
    for (tag_entry in conf.tags) {
        if (tag_entry.key != null &&  tag_entry.key != "") {
            def curr_tag = ""
            curr_tag = tag_entry.key.replace(" ", "_")
            if (tag_entry.value != null &&  tag_entry.value != "") {
                curr_tag += "="
                curr_tag += tag_entry.value.replace(" ", "_")
            }
            echo curr_tag
            return_tag += curr_tag + " "
        }
    }
    echo return_tag
    return return_tag
}