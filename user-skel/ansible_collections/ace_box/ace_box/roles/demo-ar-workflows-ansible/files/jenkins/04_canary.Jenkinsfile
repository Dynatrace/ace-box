@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    agent {
        label 'kubegit'
    }
    parameters {
        string(
            name: 'OLD_WEIGHT',
            defaultValue: '0',
            description: 'Weight of traffic that will be routed to service.',
            trim: true
        )
        string(
            name: 'CANARY_WEIGHT',
            defaultValue: '0',
            description: 'Weight of traffic that will be routed to service.',
            trim: true
        )
        string(
            name: 'REMEDIATION_ACTION',
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
    }
    stages {
        stage('Shift traffic') {
            steps {
                container('kubectl') {
                    script { 
                        sh "kubectl -n ${params.RELEASE_STAGE} patch TraefikService simplenodeservice --type merge -p '{\"spec\": {\"weighted\": {\"services\": [{\"name\": \"simplenodeservice-0\", \"weight\": ${params.OLD_WEIGHT} , \"kind\": \"Service\", \"port\": 80 },{\"name\": \"simplenodeservice-1\", \"weight\": ${params.CANARY_WEIGHT} , \"kind\": \"Service\", \"port\": 80}]}}}'"
                    }
                }
            }
        }
        stage('Dynatrace configuration change event') {
            steps {
                container('curl') {
                    script {
                        sh ''' curl -v -g -s -X POST "${DT_TENANT_URL}/api/v2/events/ingest" \
                            -H "accept: application/json; charset=utf-8" \
                            -H "Authorization: Api-Token ${DT_API_TOKEN}" \
                            -H "Content-Type: application/json; charset=utf-8" \
                            -d '{"eventType":"CUSTOM_CONFIGURATION","title": "Canary weight set to '${CANARY_WEIGHT}'", "entitySelector":"type(SERVICE),tag([Environment]DT_RELEASE_PRODUCT:'${RELEASE_PRODUCT}'),tag([Environment]DT_RELEASE_STAGE:'${RELEASE_STAGE}')","properties":{"remediationType":"'${REMEDIATION_TYPE}'","remediationAction":"'${REMEDIATION_ACTION}'"}}'
                        ''' 
                    }
                }
            }
        }
    }
}