# Monaco HOT - Exercise Four
Exercise four builds on top of Exercise two - where we used a Jenkins pipeline to manage our Dynatrace configuration using Monaco.

Envision a scenario where you have similar application configurations multiple times - either in the same or in a different Dynatrace environment. You want to uniformily configure these applications so you use the same JSON template. How can you handle a requirement where one of the settings of this application should be different across all the instances of this template - for example UEM coverage percentage.

The goal of this exercise is to introduce variables in our JSON templates to manage this requirement.

During this exercise we will apply a large amount of configuration to our Dynatrace environment using a Jenkins pipeline:


## Step 1 - Explore configuration
### Folder structure
Using gitea, explore the contents of the `monaco/project-four` folder. It is the same as the structure of `monaco/project-two` looks like this:
```
|-- environments.yaml
`-- projects
    |-- global
    |   |-- auto-tag
    |   |   |-- auto-tag.json
    |   |   `-- auto-tag.yaml
    |   |-- request-attributes
    |   |   |-- request-attribute.json
    |   |   `-- request-attribute.yaml
    |   `-- synthetic-location
    |       |-- private-synthetic.json
    |       `-- synthetic-location.yaml
    `-- perform
        |-- app-detection-rule
        |   |-- rule.json
        |   `-- rules.yaml
        |-- application
        |   |-- application.json
        |   `-- application.yaml
        |-- auto-tag
        |   |-- tagging.json
        |   `-- tagging.yaml
        |-- calculated-metrics-service
        |   |-- csm.json
        |   `-- csm.yaml
        |-- dashboard
        |   |-- dashboard.json
        |   `-- dashboard.yaml
        |-- management-zone
        |   |-- management-zone.json
        |   `-- zone.yaml
        `-- synthetic-monitor
            |-- health-check-monitor.json
            `-- synthetic-monitors.yaml
```
### Application configuration
Navigate, in gitea, to the **application** definitions stored within the **perform** project in `monaco/exercise-four/projects/perform/application`.

The `application.json` file or the **configuration template**:
<details>
<summary>Click to expand</summary>

```json
{
    "name": "{{ .name }}",
    "realUserMonitoringEnabled": true,
    "costControlUserSessionPercentage": 10,
    "loadActionKeyPerformanceMetric": "VISUALLY_COMPLETE",
    "xhrActionKeyPerformanceMetric": "VISUALLY_COMPLETE",
    "loadActionApdexSettings": {
    "threshold": 1,
    "toleratedThreshold": 1000,
    "frustratingThreshold": 3000,
    "toleratedFallbackThreshold": 1300,
    "frustratingFallbackThreshold": 3300,
    "considerJavaScriptErrors": true
    },
    "xhrActionApdexSettings": {
    "threshold": 3,
    "toleratedThreshold": 3000,
    "frustratingThreshold": 12000,
    "toleratedFallbackThreshold": 3000,
    "frustratingFallbackThreshold": 12000,
    "considerJavaScriptErrors": true
    },
    "customActionApdexSettings": {
    "threshold": 3,
    "toleratedThreshold": 3000,
    "frustratingThreshold": 12000,
    "toleratedFallbackThreshold": 3000,
    "frustratingFallbackThreshold": 12000,
    "considerJavaScriptErrors": true
    },
    "waterfallSettings": {
    "uncompressedResourcesThreshold": 860,
    "resourcesThreshold": 100000,
    "resourceBrowserCachingThreshold": 50,
    "slowFirstPartyResourcesThreshold": 200000,
    "slowThirdPartyResourcesThreshold": 200000,
    "slowCdnResourcesThreshold": 200000,
    "speedIndexVisuallyCompleteRatioThreshold": 50
    },
    "monitoringSettings": {
    "fetchRequests": true,
    "xmlHttpRequest": true,
    "javaScriptFrameworkSupport": {
        "angular": true,
        "dojo": false,
        "extJS": false,
        "icefaces": false,
        "jQuery": false,
        "mooTools": false,
        "prototype": false,
        "activeXObject": false
    },
    "contentCapture": {
        "resourceTimingSettings": {
        "w3cResourceTimings": true,
        "nonW3cResourceTimings": false,
        "nonW3cResourceTimingsInstrumentationDelay": 50,
        "resourceTimingCaptureType": "CAPTURE_FULL_DETAILS",
        "resourceTimingsDomainLimit": 10
        },
        "javaScriptErrors": true,
        "timeoutSettings": {
        "timedActionSupport": false,
        "temporaryActionLimit": 0,
        "temporaryActionTotalTimeout": 100
        },
        "visuallyCompleteAndSpeedIndex": true
    },
    "excludeXhrRegex": "",
    "injectionMode": "JAVASCRIPT_TAG",
    "libraryFileLocation": "",
    "monitoringDataPath": "",
    "customConfigurationProperties": "",
    "serverRequestPathId": "",
    "secureCookieAttribute": false,
    "cookiePlacementDomain": "",
    "cacheControlHeaderOptimizations": true,
    "advancedJavaScriptTagSettings": {
        "syncBeaconFirefox": false,
        "syncBeaconInternetExplorer": false,
        "instrumentUnsupportedAjaxFrameworks": false,
        "specialCharactersToEscape": "",
        "maxActionNameLength": 100,
        "maxErrorsToCapture": 10,
        "additionalEventHandlers": {
        "userMouseupEventForClicks": false,
        "clickEventHandler": false,
        "mouseupEventHandler": false,
        "blurEventHandler": false,
        "changeEventHandler": false,
        "toStringMethod": false,
        "maxDomNodesToInstrument": 5000
        },
        "eventWrapperSettings": {
        "click": false,
        "mouseUp": false,
        "change": false,
        "blur": false,
        "touchStart": false,
        "touchEnd": false
        },
        "globalEventCaptureSettings": {
        "mouseUp": true,
        "mouseDown": true,
        "click": true,
        "doubleClick": true,
        "keyUp": true,
        "keyDown": true,
        "scroll": true,
        "additionalEventCapturedAsUserInput": ""
        }
    }
    },
    "userActionNamingSettings": {
    "placeholders": [],
    "loadActionNamingRules": [],
    "xhrActionNamingRules": [],
    "ignoreCase": true,
    "splitUserActionsByDomain": true
    },
    "metaDataCaptureSettings": [],
    "conversionGoals": []
}
```
</details>

The `application.yaml` file or the **configuration instances**:
<details>
<summary> Click to expand </summary>

```yaml
config:
    - app-app-one: "application.json"
    - app-app-two: "application.json"
  
app-app-one:
    - name: "app-one"

app-app-two:
    - name: "app-two"
```
</details>

## Step 2 - Introduce variable
The first task to use variables into Monaco is by replacing the value in the JSON object that we want to turn into a variable with `{{ VARIABLE_NAME }}`. In our example, we want to turn UEM coverage percentage, represented in the `application.json` by the field `costControlUserSessionPercentage` in a variable called `uemPercentage`.

To do so, using gitea, find the file and edit it.

On line 4, find the field `costControlUserSessionPercentage` and see that the value is hardcoded to `10`:

```json 
"costControlUserSessionPercentage": 10,
```

Turn the value of that field (`10`) into a variable:

```json 
"costControlUserSessionPercentage": "{{ .uemPercentage }}",
```
**Note**: we need to surround the variable placeholders with double quotes `"`, even if it is not a string value.
**Note**: the `.` in front of `uemPercentage` is required

Commit the changes.

## Step 3 - Reference value and assign a value

Now that we have defined our variable in the JSON template, we can assign values for it in the YAML file that contains the instances of the template to be created. Open the `application.yaml` file and for each instance of the application add the variable and assign a value to it:

```yaml
config:
    - app-app-one: "application.json"
    - app-app-two: "application.json"
  
app-app-one:
    - name: "app-one"
    - uemPercentage: "100"

app-app-two:
    - name: "app-two"
    - uemPercentage: "50"
```

Commit the changes.

## Step 4 - Run the pipeline

In Jenkins, launch the pipeline `Exercise 4 - Update config`.

The pipeline will now update the two application configurations and will change the `costControlUserSessionPercentage` from a fixed value to a parametrized value using Monaco.

## Step 5 - View results in Dynatrace

As a last step, go to your Dynatrace environment and verify that Monaco updated the application "app-two" cost and traffic control % to 50 and "app-one" to 100.

That concludes this lab.
