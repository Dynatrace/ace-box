@Library('ace@v1.1')
def event = new com.dynatrace.ace.Event()

pipeline {
    agent {
        label 'monaco-runner'
    }
    environment {
        DT_API_TOKEN = credentials('DT_API_TOKEN')
        DT_TENANT_URL = "${env.DYNATRACE_URL_GEN3}"
        DT_OAUTH_CLIENT_ID = credentials('DYNATRACE_CLIENT_ID')
        DT_OAUTH_CLIENT_SECRET = credentials('DYNATRACE_SECRET')
        DT_OAUTH_SSO_ENDPOINT = credentials('DYNATRACE_SSO_URL')
        // As of June 2023, MONACO_FEAT_AUTOMATION_RESOURCES flag required as feature is in preview
        MONACO_FEAT_AUTOMATION_RESOURCES = '1'
        // Monaco variables
        DT_OWNER_IDENTIFIER = 'release-validation-jenkins'
        RELEASE_PRODUCT = 'simplenodeservice'
        RELEASE_STAGE = 'staging'
        DEMO_IDENTIFIER = "srg-jenkins"
        SRG_EVALUATION_STAGE = "staging"
        TEST_TIMEFRAME = "5m"
    }
    stages {
        stage('Workflow and SRG configurations - Validate') {
            steps {
                container('monaco') {
                    script {
                        sh """
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project infrastructure --group staging --dry-run
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project app --group staging --dry-run
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project srg --group staging --dry-run
                        """
                    }
                }
            }
        }
        stage('Dynatrace global project - Deploy') {
            steps {
                container('monaco') {
                    script {
                        sh """
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project infrastructure --group staging
                            sleep 20 # You can adjust the wait time if this is not enough
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project app --group staging
                            MONACO_FEAT_AUTOMATION_RESOURCES=1 monaco deploy monaco/manifest.yaml --project srg --group staging
                            sleep 90
                        """
                    }
                }
            }
        }

        stage('Dynatrace configuration event') {
            steps {
                script {
                    // Give Dynatrace a couple seconds to tag host according to current config
                    sleep(time:120, unit:'SECONDS')

                    event.pushDynatraceConfigurationEvent(
                        tagRule: getTagRulesForHostEvent('ace-demo-staging'),
                        description: 'Monaco deployment successful: ace-demo-staging',
                        configuration: 'ace-demo-staging',
                        customProperties: [
                            'Approved by': 'ACE'
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
def getTagRulesForHostEvent(hostTag) {
    def tagMatchRules = [
        [
            'meTypes': ['HOST'],
            tags: [
                ['context': 'CONTEXTLESS', 'key': hostTag]
            ]
        ]
    ]

    return tagMatchRules
}
