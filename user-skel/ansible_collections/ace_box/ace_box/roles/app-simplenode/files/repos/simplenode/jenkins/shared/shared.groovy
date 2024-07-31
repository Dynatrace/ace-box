// Copyright 2024 Dynatrace LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

def getTagRulesForPGIEvent() {
    def tagMatchRules = [
        [
            'meTypes': ['PROCESS_GROUP_INSTANCE'],
            tags: [
                ['context': 'ENVIRONMENT', 'key': 'DT_RELEASE_BUILD_VERSION', 'value': "${env.RELEASE_BUILD_VERSION}"],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/name', 'value': "${env.RELEASE_PRODUCT}"],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/part-of', 'value': 'simplenodeservice'],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/component', 'value': 'webservice'],
                ['context': 'CONTEXTLESS', 'key': 'environment', 'value': "${env.RELEASE_STAGE}"]
            ]
        ]
    ]

    return tagMatchRules
}

def getTagRulesForServiceEvent() {
    def tagMatchRules = [
        [
            'meTypes': ['SERVICE'],
            tags: [
                ['context': 'ENVIRONMENT', 'key': 'DT_RELEASE_BUILD_VERSION', 'value': "${env.RELEASE_BUILD_VERSION}"],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/name', 'value': "${env.RELEASE_PRODUCT}"],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/part-of', 'value': 'simplenodeservice'],
                ['context': 'KUBERNETES', 'key': 'app.kubernetes.io/component', 'value': 'webservice'],
                ['context': 'CONTEXTLESS', 'key': 'environment', 'value': "${env.RELEASE_STAGE}"]
            ]
        ]
    ]

    return tagMatchRules
}

def getTagRulesForApplicationEvent(applicationTag) {
    def tagMatchRules = [
        [
            'meTypes': ['APPLICATION'],
            tags: [
                ['context': 'CONTEXTLESS', 'key': applicationTag]
            ]
        ]
    ]

    return tagMatchRules
}

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

def readMetaData() {
    def conf = readYaml file: 'jenkins/shared/dt_meta.yaml'

    def return_meta = ''
    for (meta_entry in conf.metadata) {
        if (meta_entry.key != null &&  meta_entry.key != '') {
            def curr_meta = ''
            curr_meta = meta_entry.key.replace(' ', '_')
            if (meta_entry.value != null &&  meta_entry.value != '') {
                curr_meta += '='
                curr_meta += meta_entry.value.replace(' ', '_')
            }
            echo curr_meta
            return_meta += curr_meta + ' '
        }
    }
    return return_meta
}

def readTags() {
    def conf = readYaml file: 'jenkins/shared/dt_meta.yaml'

    def return_tag = ''
    for (tag_entry in conf.tags) {
        if (tag_entry.key != null &&  tag_entry.key != '') {
            def curr_tag = ''
            curr_tag = tag_entry.key.replace(' ', '_')
            if (tag_entry.value != null &&  tag_entry.value != '') {
                curr_tag += '='
                curr_tag += tag_entry.value.replace(' ', '_')
            }
            echo curr_tag
            return_tag += curr_tag + ' '
        }
    }
    echo return_tag
    return return_tag
}

return this
