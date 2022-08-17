def getTagRulesForPGIEvent() {
    def tagMatchRules = [
        [
            "meTypes": ["PROCESS_GROUP_INSTANCE"],
            tags: [
                ["context": "ENVIRONMENT", "key": "DT_RELEASE_BUILD_VERSION", "value": "${env.ART_VERSION}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "${env.APP_NAME}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "${env.APP_NAME}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
                ["context": "CONTEXTLESS", "key": "environment", "value": "${env.TARGET_NAMESPACE}"]
            ]
        ]
    ]

    return tagMatchRules
}

def getTagRulesForServiceEvent() {
    def tagMatchRules = [
        [
            "meTypes": ["SERVICE"],
            tags: [
                ["context": "ENVIRONMENT", "key": "DT_RELEASE_BUILD_VERSION", "value": "${env.ART_VERSION}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/name", "value": "${env.APP_NAME}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/part-of", "value": "${env.APP_NAME}"],
                ["context": "KUBERNETES", "key": "app.kubernetes.io/component", "value": "api"],
                ["context": "CONTEXTLESS", "key": "environment", "value": "${env.TARGET_NAMESPACE}"]
            ]
        ]
    ]

    return tagMatchRules
}

def readMetaData() {
    def conf = readYaml file: "jenkins/shared/dt_meta.yaml"

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
    def conf = readYaml file: "jenkins/shared/dt_meta.yaml"

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

return this