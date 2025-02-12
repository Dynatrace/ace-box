
# Sample application Simplenodeservice

This sample app is a modified version of the Node.js sample app from the [AWS Elastic Beanstalk Tutorial](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-getstarted.html)

I mainly use it to demonstrate continuous delivery, automated quality gates and self-healing of the Open Source project [Keptn](www.keptn.sh) as well as the monitoring capabilities of [Dynatrace](www.dynatrace.com)

## Demo flow
This repo comes with everything to demonstrate an end to end flow for **Monitoring as a Service**, **Monitoring as Code** and **Quality Gates**. Check out [demo](demo/Readme.md) for instructions and details.

For a standard demo flow incl. **Monitoring as a Service**, **Monitoring as Code/Monaco** and **Quality Gates** using Jenkins and Gitea: [demo-default](demo/Readme.md)

For a Security Gates demo based on the standard demo above: [demo-appsec](demo/appsec/Readme.md)

For a standard demo but using **GitLab**: [demo-gitlab](demo/gitlab/Readme.md)

## Extended Feature Set
I've modified and extended it with a couple of additional API calls such as:
* echo a string
* invoke a server-side URL and return the byte size
* "login" with a username
* get the currently running version

![](images/simplenodesersviceui.png)

## 4 Builds with different behavior

I've also built-in an option to slow down server-side code execution or to simulate failed requests.
The app also comes with 4 built-in "build number" behaviors - meaning - if you launch the app and tell it to run as Build 1, 2, 3 or 4 it shows slightly different behavior. You can also launch the application in Production or Non-Production Mode:

| Build | Behavior |
| ----- | --------- |
| 1 | Everything good |
|2|Slow down introduced |
|3|Everything good|
|4|20% Failure Rate of /api/invoke and twice as slow when running in production mode|
|5|Performance good, introduce Application Security Vulnerability |

Every build shows the build number and has its own color:
![](images/4buildoverview.png)

## How to run it

There are different options on how to run / deploy that app

| Run where | How |
| --------- | --- |
| Local     | npm start |
| Docker    | docker build -t simplenodeservice:1.0.2 . && docker run simplenodeservice:1.0.2 |
| k8s       | https://github.com/grabnerandi/keptn-qualitygate-examples |

## Build it yourself

You can build the app yourself and also use the buildpush.sh for building the container and pushing it to your own container registry!

