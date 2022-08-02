## Security Gates

During this lab we will cover a very important aspect of securing applications against known third party vulnerabilities: detecting and stopping these vulnerabilities earlier in the SDLC and building an automated security gate from stopping vulnerabilities from being promoted to production.

### Background
For this lab, we will be leveraging the previously deployed SimpleNodeService application.
This application has a few different builds, and depending on the build we have various problem patterns embedded.
One build introduces a known security vulnerability that we will stop in its tracks leveraging Dynatrace AppSec and Cloud Automation.

### Step 1 - deploying of a vulnerable build
Before we get into the specifics, lets deploy the vulnerable build. The building and testing of this can easily take 20 mins so we do not want to wait for that later-on. To deploy this app, go back to the dashboard of Jenkins, and navigate to the `demo-appsec` folder. Click on the *play* button next to the pipeline called `1. Build`, and when asked for a build number make sure to select `5`, and click on `Build`.

![](../../assets/images/2-9-jenkins-demo-appsec.png)

### Anatomy of a vulnerable app
As mentioned, our app has a few different builds (1-5), introducing specific problems. Build number `5` specifically introduces a vulnerability in our NodeJs app.

Let's take a look at the source code of our app.

Navigate to gitea, and open the `demo/ace` repository.
This repository contains everything that is needed to operationalise our app:
- Application Source Code and package definition
- Jenkins pipelines to build, deploy, test and evaluation our application
- Quality specification to which our app needs to adhere regarding performance and security
- Test scripts
- Helm charts
- ...

Specifically to our app and the vulnerability, two files are important:

- **package.json**:

  In the package.json file, the dependencies of our application are defined. The `@brikcss/merge` dependency with the known vulnerability is always there.

	```json
	{
		"name": "SimpleNodeJsService",
		"version": "0.0.1",
		"private": true,
		"dependencies": {
			"semver": "4.3.0",
			"@brikcss/merge": "1.3.0"
		},
		"scripts": {
			"start": "node app.js"
		}
	}
	```
- **app.js**: (dedacted to only show the important part)
	
	```js
	...
	switch(buildNumber) {
		case 2:
			//failInvokeRequestPercentage = 50;
			minSleep = 600;
			break;
		case 4: 
			minSleep = minSleep * 2;
			if(inProduction) {
				failInvokeRequestPercentage = 20;
			}
			break;
		case 5:
			// introduce HIGH appsec vulnerability
			var merge = require("@brikcss/merge")
			var obj = {}
			var malicious_payload = '{"__proto__":{"polluted":"Yes! Its Polluted"}}';
			console.log("Before: " + {}.polluted);
			merge({}, JSON.parse(malicious_payload));
			console.log("After : " + {}.polluted);
			break;
		default:
			// everything normal here
			failInvokeRequestPercentage = 0;		
			break;
	}
	...
	```

	In the application, a decision point (`switch`) based on the build number controls whether or not the `@brikcss/merge` library that is listed as a dependency is actually loaded (the loading is done using `require("@brikcss/merge")`).

	Builds `2` and `4` introduce regressions to the performance of the application.

	Build number `5`, however, will load a library with a known security vulnerability: `@brikcss/merge`

	It is the loading of the library that will cause Dynatrace AppSec to report it. In other words, if libraries are *just referenced* but never *loaded*, we do not report on them as this would cause too much noise! 

### Building a Quality Gate

As Dynatrace AppSec detects new vulnerabilities in our application, we want to leverage that information to automatically stop a build from being promoted to the next stage.

For that, we will leverage **Dynatrace Cloud Automation** that will allow us to define Service Level Objectives around any characteristic of our application's behavior, including Third Party Vulnerabilities, and leverage the outcome of those objectives to drive automation workflows.

The flow looks like the below:

![](../../assets/images/5-3-demoflow.png)

Each time we deploy a new build of our application, a suite of (performance) tests are being executed.
After the tests have executed, we request a new evaluation of our application that includes service level objectives around vulnerabilities.
If our objectives are not met, i.e. we have detected a new vulnerability, we will stop our build from being promoted and the pipeline will fail.

### Step 2 - Analyzing our newly deployed version

Roughly about 20mins after we deployed build `5`, we will see that the test pipeline has finished with a failure:

![](../../assets/images/7-demo-appsec-folder.png)

Clicking on **3. Test** shows us that the pipeline failed in the **Quality Gate** step

![](../../assets/images/7-test-pipeline-failure.png)

Let's see what Dynatrace can tell us about this failure.

Open up your Dynatrace environment, and navigate to the **Releases** screen

![](../../assets/images/7-releases-overview.png)

This view can be filtered by the management zone **monaco-mz-staging** that was created from the Jenkins pipeline using Monaco.

We will see here both the old version (Release version 1.0.0) and the new version (Release version 5.0.0) deployed here.

Click on the **simplenodeservice.staging** entry that corresponds with **Release version 5.0.0** within the Release inventory. This opens the **Release details** screen:

![](../../assets/images/7-release-details.png)

There we can already see that in context of this release, Dynatrace AppSec detected two open Vulnerabilities.

Additionally, we also see an event that shows that our **Evaluation failed**, we will get back to that later.

Click on the number **2** next to **Security vulnerabilties** in the left panel on the screen. This opens the **Vulnerabilties** screen in context of this release:

![](../../assets/images/7-vulnerability-details.png)

We see here that our newly deployed version loads the `@brikcss/merge` library, another library was also present (in both builds) of a lower severity.

You can now click on the Vulnerability to further analyse the impact and also see how we can resolve it.

> Question: what is the CVE for this vulnerability and how can we fix it?

### Step 3 - The Security Gate Explained

Go back to the **Release details** screen and expand the **Evaluation result: fail** event in the right panel on the screen:

![](../../assets/images/7-evaluation-results-event.png)

This event contains a lot of information:

1. The result of the evaluation
2. The evaluation score
3. A link back to the CI job (in Jenkins) that triggered the evaluation
4. A link to the evaluation details (called the **Bridge**)

> Note: links in this screen will become clickable in future releases

For now, copy the link next to the **Keptns Bridge** label and open it in a new tab in your browser. This might trigger a basic authentication login screen. For the credentials, go back to the ACE Dashboard and select the **Keptn** tab where you can copy the username and password:

![](../../assets/images/7-ace-dashboard-keptn-creds.png)

After entering the credentials, the evaluation sequence overview is shown. Here we get a quick overview of past evaluations and can we also click down to the details:

![](../../assets/images/7-bridge-sequence.png)

![](../../assets/images/7-bridge-details.png)

On the details screen we can see all of the **Service Level Indicators** that we have defined along with for each indicator the result (pass/warn/fail) that we get for the **Service Level Objectives**.

Underneath the graph, we can see the details for each indicator along with the values that were found, the aforementioned objectives and the score we get for this indicator.

In our case, what triggered the failure of the build was us looking for **High and Critical Vulnerabilities** and setting an objective of 0 => we did not want those in our service. By marking them as **Key SLIs** we can say that if we find vulnerabilities we will always mark the build as failed, essentially stopping unsecure code from reaching the next stage and production.

At this point you might be wondering where this SLI and SLO definitions are stored and how it is linked to our new build.

For that we have two yaml definition files stored in our **demo/ace repository**:

- cloudautomation/sli_appsec.yaml: (dedacted)
	
	```yaml
	---
	spec_version: '1.0'
	indicators:
	... 
	app_sec_high:        "SECPV2;securityProblemSelector=riskLevel(HIGH),pgiTags([Environment]DT_RELEASE_BUILD_VERSION:$LABEL.DT_RELEASE_BUILD_VERSION)"
	app_sec_critical:    "SECPV2;securityProblemSelector=riskLevel(CRITICAL),pgiTags([Environment]DT_RELEASE_BUILD_VERSION:$LABEL.DT_RELEASE_BUILD_VERSION)"
	app_sec_medium:      "SECPV2;securityProblemSelector=riskLevel(MEDIUM),pgiTags([Environment]DT_RELEASE_BUILD_VERSION:$LABEL.DT_RELEASE_BUILD_VERSION)"
	app_sec_low:         "SECPV2;securityProblemSelector=riskLevel(LOW),pgiTags([Environment]DT_RELEASE_BUILD_VERSION:$LABEL.DT_RELEASE_BUILD_VERSION)"
	```

	Here we formulate what information we want to retrieve from Dynatrace. Each line is a different indicator definition, focusing on a different sevirty (`riskLevel(HIGH)`) and targeting a specific **Process Group Instance** (`pgiTags([Environment]DT_RELEASE_BUILD_VERSION:$LABEL.DT_RELEASE_BUILD_VERSION)`) linked to the individual **build** that we have deployed.

- cloudautomation/slo_appsec.yaml: (dedacted)

	```yaml
	---
	spec_version: "0.1.1"
	comparison:
	aggregate_function: "avg"
	compare_with: "single_result"
	include_result_with_score: "pass"
	number_of_comparison_results: 1
	filter:
	objectives:
	...
	- sli: "app_sec_high"
		displayName: "Security Vulnerabilities - High"
		pass:
		- criteria:
		- <=0
		key_sli: true
	- sli: "app_sec_critical"
		displayName: "Security Vulnerabilities - Critical"
		pass:
		- criteria:
		- <=0
		key_sli: true
	- sli: "app_sec_medium"
		displayName: "Security Vulnerabilities - Medium"
		key_sli: false
		pass:
		- criteria:
		- <=+2
	- sli: "app_sec_low"
		displayName: "Security Vulnerabilities - Low"
		key_sli: false
		pass:
		- criteria:
		- <=+2
	total_score:
	pass: "90%"
	warning: "75%"
	```

	Here we can specify for each indicator what our desired behaviour (objective) should be. Additionally we set `key_sli: true` to mark indicators that should always produce a pass score.