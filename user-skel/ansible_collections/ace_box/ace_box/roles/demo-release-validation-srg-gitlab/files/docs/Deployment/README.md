# 5. Deployment of Simplenode Application

This sample app is a modified version of the Node.js sample app from the [AWS Elastic Beanstalk Tutorial](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html)

## Extended Feature Set
It has been modified and extended it with a couple of additional API calls such as:
* echo a string
* invoke a server-side URL and return the byte size
* "login" with a username
* get the currently running version

![](assets/simplenodesersviceui.png)

## Builds with different behavior

The app has 4 built-in "build number" behaviors - meaning - if you launch the app and tell it to run as Build 1, 2, 3 or 4 it shows slightly different behavior. You can also launch the application in Production or Non-Production Mode:

| Build | Behavior |
| ----- | --------- |
| 1 | Everything good |
|2|Slow down introduced |
|3|Everything good|
|4|20% Failure Rate of /api/invoke and twice as slow when running in production mode|
|5|Performance good, introduce Application Security Vulnerability |

Every build shows the build number and has its own color:
![](assets/4buildoverview.png)

## Continue to the Pipeline Stages
- [6. Configure Dynatrace](../Monaco/README.md) to deep dive into Dynatrace configurations via Monaco
- [4. Test Stage](../Performance_Test/README.md) to gather details on how the Performance Test is performed.
