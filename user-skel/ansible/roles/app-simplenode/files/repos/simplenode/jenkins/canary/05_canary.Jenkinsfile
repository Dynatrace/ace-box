@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    agent {
        label 'kubegit'
    }
    parameters {
        string(name: 'CANARY_WEIGHT', defaultValue: '0', description: 'Weight of traffic that will be routed to service.', trim: true)
        string(name: 'REMEDIATION_URL', defaultValue: '', description: 'Remediation script to call if canary release fails', trim: true)
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        RELEASE_STAGE = 'canary-jenkins'
        APP_NAME = 'simplenodeservice'
        RELEASE_PRODUCT = "${env.APP_NAME}-canary-v2"
    }
    stages {
        stage('Retrieve canary metadata') {
            steps {
                container('kubectl') {
                    script {
                        env.CANARY_NAME = sh(returnStdout: true, script: "kubectl -n ${env.RELEASE_STAGE} get ingress -o=jsonpath='{.items[?(@.metadata.annotations.nginx\\.ingress\\.kubernetes\\.io/canary==\"true\")].metadata.name}'")
                        // env.NON_CANARY_NAME = sh(returnStdout: true, script: "kubectl -n ${env.RELEASE_STAGE} get ingress -o=jsonpath='{.items[?(@.metadata.annotations.nginx\\.ingress\\.kubernetes\\.io/canary==\"false\")].metadata.name}'")
                    }
                }
            }
        }
        stage('Shift traffic') {
            steps {
                container('kubectl') {
                    sh "kubectl -n ${env.RELEASE_STAGE} annotate ingress ${env.CANARY_NAME} nginx.ingress.kubernetes.io/canary-weight='${params.CANARY_WEIGHT}' --overwrite"
                }
            }
        }
        stage('Dynatrace configuration change event') {
            steps {
                script {
                    def rootDir = pwd()
                    def sharedLib = load "${rootDir}/jenkins/shared/shared.groovy"
                    event.pushDynatraceConfigurationEvent(
                        tagRule : sharedLib.getTagRulesForServiceEvent(),
                        description : "${env.RELEASE_PRODUCT} canary weight set to ${params.CANARY_WEIGHT}%",
                        source : 'Jenkins',
                        configuration : 'Load Balancer',
                        customProperties : [
                            'remediationAction': "${params.REMEDIATION_URL}"
                        ]
                    )
                }
            }
        }
    }
}
