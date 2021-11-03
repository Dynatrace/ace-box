# ace-box - Jenkins
This lab will have you log in to Jenkins, add the `ace jenkins library` and trigger a first build.

## Step 1 - log in to jenkins
Open the `ace dashboard` and click on the Jenkins link. You can log in to Jenkins using the following credentials:
- username: `admin`
- password: `dynatrace`

## Step 2 - Add the `ace jenkins library`
The `ace jenkins library` is a collection of pipeline functions that can be loaded in any Jenkins environment. It provides easy to use functions for some of the following:
- send events to Dynatrace
- create synthetic tests in Dynatrace
- create management zones in Dynatrace
- create application definitions in Dynatrace
- ...

This library is constantly getting updated so make sure to refresh it from time to time.
In order to add it to Jenkins, perform the following:
1. log in to jenkins
1. Click on `Manage Jenkins` (left side)
1. Click on `Configure System`
1. Find a section `Global Pipeline Libraries`
1. Add a new `Global Pipeline Library`
1. Specify the following details for the library (anything not mentioned can be kept default)
   1. Name: `ace`
   2. Retrieval method: `Modern SCM`
   3. Source Code Management: `GitHub`. *Git is also OK*
   4. Credentials: not required
   5. Repository HTTPS URL: `https://github.com/dynatrace-ace/ace-jenkins-extensions`
   6. Validate connection
2. Click `Save`

## Step 3 - Check out the `ace jenkins library`
Navigate to https://github.com/dynatrace-ace/ace-jenkins-extensions/tree/master/vars and check out the functions that exist there.

## Step 4 - Run the build pipeline
### A. Prepared pipelines
In Jenkins, you should have 4 pipelines already created for you:
1. Build (using `build.Jenkinsfile`)
2. Deploy (using `deployStaging.Jenkinsfile`)
3. Test (using `test.Jenkinsfile`)
4. Deploy production (using `deployProduction.Jenkinsfile`)

These pipelines should link up to the forked repository in the correct org already. 

### B. 4 Builds with different behavior

For the HoT day we will be using Andi Grabner's `simplenodeservice` blatantly forked from https://github.com/grabnerandi/simplenodeservice.
The app comes with 4 built-in "build number" behaviors - meaning - if you launch the app and tell it to run as Build 1, 2, 3 or 4 it shows slightly different behavior. You can also launch the application in Production or Non-Production Mode:

| Build | Behavior |
| ----- | --------- |
| 1 | Everything good |
|2|50% Failure Rate of /api/invoke|
|3|Everything good|
|4|20% Failure Rate of /api/invoke and twice as slow when running in production mode|

Every build shows the build number and has its own color:
![](img/4buildoverview.png)

### C. Trigger a pipeline for Build 1
In the Jenkins main view, select the `1. Build` job and select the `Build with parameters` action. Select `BUILD 1` (selected by default) and launch the job.
Triggering the `1. Build` job will automatically call the other jobs in succession as well. There is currently a manual approval step after `3. Test` before promoting to production.
The first build will take some time to complete as the executor pods need to be spun up, as well as all the base images need to be downloaded.