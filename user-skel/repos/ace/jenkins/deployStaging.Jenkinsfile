@Library('ace@v1.1') ace 
def event = new com.dynatrace.ace.Event()

def tagMatchRules = [
    [
        "meTypes": [ "PROCESS_GROUP_INSTANCE"],
        tags: [
            ["context": "ENVIRONMENT", "key": "DT_APPLICATION_BUILD_VERSION", "value": "${env.ART_VERSION}"],
            ["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "${env.APP_NAME}"],
            ["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "simplenode-app"],
            ["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
            ["context": "CONTEXTLESS", "key": "environment", "value": "staging"]
        ]
    ]
]
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
    stages {   
        stage('Deploy via Helm') {
            steps {
                checkout scm
                container('helm') {
                    sh "helm upgrade --install simplenodeservice-staging helm/simplenodeservice \
                    --set image=${env.TAG_STAGING} \
                    --set domain=${env.INGRESS_DOMAIN} \
                    --set version=${env.BUILD}.0.0 \
                    --set build_version=${env.ART_VERSION} \
                    --namespace staging --create-namespace \
                    --wait"
                }
            }
        }
            
        stage('Dynatrace deployment event') {
            steps {
                script {
                    sleep(time:120,unit:"SECONDS")
                    
                    def status = event.pushDynatraceDeploymentEvent (
                        tagRule: tagMatchRules,
                        deploymentName: "simplenodeservice ${env.ART_VERSION} deployed",
                        deploymentVersion: "${env.ART_VERSION}",
                        deploymentProject: "simplenode-app",
                        customProperties : [
                            "Jenkins Build Number": "${env.BUILD_ID}",
                            "Approved by": "ACE"
                        ]
                    )
                }
            }
        }

        stage('Launch tests') {
            steps {
                build job: "ace-demo/3. Test",
                wait: false,
                parameters: [
                    string(name: 'APP_NAME', value: "${env.APP_NAME}"),
                    string(name: 'BUILD', value: "${env.BUILD}"),
                    string(name: 'ART_VERSION', value: "${env.ART_VERSION}")
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