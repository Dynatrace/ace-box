### Use case: Canary + auto remediation

# Intro

As part of this use case a *simplenodeservice* application will be deployed. This version, considered "live", is based on a healthy image (*build 1*). Mimicking a bug that was introduced, a second, faulty image (*build 4*) is available. Once exposed to traffic, the faulty image will show a decrease in response time and increase in request failures compared to the healthy version.

This unhealthy build will be canary deployed, i.e. it will receive an increasing amount of live traffic ("traffic weight").

An increasing amount of traffic to the faulty application will result in an increasing amount of failures which will be detected by Dynatrace. Automatically, Dynatrace then triggers a remediation action which will undo the traffic shift.

By having tooling in place that's capable associating problems with changes and providing an appropriate remediation action everytime a change is made (e.g. canary deployment), a fully automated way of operating cloud workloads is established.

# Technical implementation

Before getting started, let's familiarize ourselves with the demo setup.

First, a dashboard has been deployed and is available at `http(s)://dashboard.<ingress domain>` . Basic auth credentials were provided at the end of the provisioning process. The dashboard is where you can find all relevant links and credentials.

All code and docs have been made available in the *demo* organization on *Gitlab* ( `http(s)://gitlab.<ingress domain>/demo` ):

- *ar-workflows-gitlab* contains all application source code, Gitlab pipelines and Monaco resources.
- *ar-workflows-gitlab-docs* contains step-by-step instructions for the use case (the one you're probably reading right now).

>Note: the name of the organization might be different depending on the deployment of the ace-box.

*Gitlab* is our CI/CD tool of choice and is available at `http(s)://gitlab.<ingress domain>`. All pipelines that we use as part of this use case can be found in repo *ar-workflows-gitlab*.

*Dynatrace* will monitor our demo application and is the source of truth for deployment and configuration change events. In addition, Dynatrace's AutomationEngine workflows provide all capabilities needed for auto remediation.

All demo applications as well as tools are deployed on *Kubernetes* (*Microk8s*). An NGINX ingress is used to expose services. [NGINX's canary annotations](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary) are used to direct traffic to specific application versions.

# Steps

As part of this use case we will cover:

1. [Preparations](/01_preparations)
2. [Shift canary traffic](/02_canary)
3. [Inspect traffic shift and auto remediation](/03_auto_remediation)
