@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    agent {
        label 'kubegit'
    }
    parameters {
        string(
            name: 'CANARY_WEIGHT',
            defaultValue: '0',
            description: 'Weight of traffic that will be routed to service.',
            trim: true
        )
        string(
            name: 'REMEDIATION_URL',
            defaultValue: '',
            description: 'Remediation script to call if canary release fails',
            trim: true
        )
        string(
            name: 'REMEDIATION_TYPE',
            defaultValue: '',
            description: 'Remediation type to target specific remediation handler',
            trim: true
        )
        string(
            name: 'RELEASE_STAGE',
            defaultValue: 'canary-jenkins',
            description: 'Namespace service will be deployed in.',
            trim: true
        )
        string(
            name: 'RELEASE_PRODUCT',
            defaultValue: 'simplenodeservice',
            description: 'The name of the service to deploy.',
            trim: true
        )
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = credentials('DT_TENANT_URL')
        // RELEASE_STAGE = 'canary-jenkins'
        // RELEASE_PRODUCT = 'simplenodeservice'
    }
    stages {
        stage('Retrieve canary metadata') {
            steps {
                container('kubectl') {
                    script {
                        env.CANARY_NAME = sh(returnStdout: true, script: "kubectl -n ${params.RELEASE_STAGE} get ingress -o=jsonpath='{.items[?(@.metadata.annotations.nginx\\.ingress\\.kubernetes\\.io/canary==\"true\")].metadata.name}'")
                        // env.NON_CANARY_NAME = sh(returnStdout: true, script: "kubectl -n ${env.RELEASE_STAGE} get ingress -o=jsonpath='{.items[?(@.metadata.annotations.nginx\\.ingress\\.kubernetes\\.io/canary==\"false\")].metadata.name}'")
                    }
                }
            }
        }
        stage('Shift traffic') {
            steps {
                container('kubectl') {
                    sh "kubectl -n ${params.RELEASE_STAGE} annotate ingress ${env.CANARY_NAME} nginx.ingress.kubernetes.io/canary-weight='${params.CANARY_WEIGHT}' --overwrite"
                }
            }
        }
        stage('Dynatrace configuration change event') {
            steps {
                script {
                    // env.RELEASE_BUILD_VERSION = sh(returnStdout: true, script: "kubectl -n ${env.RELEASE_STAGE} get deployment ${env.CANARY_NAME} -o=jsonpath='{.metadata.labels.app\\.kubernetes\\.io/version}'")
                    // sh "echo ${env.RELEASE_BUILD_VERSION}"

                    event.pushDynatraceConfigurationEvent(
                        tagRule : getTagRulesForServiceEvent(),
                        description : "${params.RELEASE_PRODUCT} canary weight set to ${params.CANARY_WEIGHT}%",
                        source : 'Jenkins',
                        configuration : 'Load Balancer',
                        customProperties : [
                            'remediationAction': "${params.REMEDIATION_URL}",
                            'remediationType': "${params.REMEDIATION_TYPE}"
                        ]
                    )
                }
            }
        }
    }
}

//
// Legacy tag rules function can be removed with availabilty of dta feature
//
def getTagRulesForServiceEvent() {
    def tagMatchRules = [
        [
            'meTypes': ['SERVICE'],
            tags: [
                ['context': 'ENVIRONMENT', 'key': 'DT_RELEASE_PRODUCT', 'value': "${params.RELEASE_PRODUCT}"],
                ['context': 'ENVIRONMENT', 'key': 'DT_RELEASE_STAGE', 'value': "${params.RELEASE_STAGE}"]
            ]
        ]
    ]

    return tagMatchRules
}
