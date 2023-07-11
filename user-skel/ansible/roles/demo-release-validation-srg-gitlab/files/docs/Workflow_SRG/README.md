# Site Reliability Guardian (SRG) and Workflow

To configure the initial Site Reliability Guardian for a CI/CD usage follow the steps:

Pre-requisites:

- One agent already monitoring at least one host.

## 1. Install the Site Reliability Guardian

Search in the Dynatrace Hub for the Site Reliability Guardian and install it in your Dynatrace Environment.

<img src="./assets/install-SRG.png"  width="1200" height="450">

## 2. Create a new Guardian

Locate the Site Reliability Guardian app in the sidebar and click `+ guardian` button.

<img src="./assets/srg-create-ui.png"  width="550" height="200">

After installing the application, you are ready to configure a guardian yourself. However, for this demo activity, you don´t need to do anything manually. When the demo environment is provisioned, the Gitlab pipeline automatically triggers a Monaco job (`1-Configure DT Staging - Monaco` under the stage `Deploy Staging`).

![gitlab-cicd](assets/gitlab_pipeline_srg_job.png)


If you open the Site Reliability Guardian `Simplenode Guardian for ACE Demo`, you will see below screen:

![gitlab-cicd](assets/srg_edit_name.png)

There are multiple objectives attached to this SRG using the type [DQL](https://www.dynatrace.com/support/help/platform/grail/dynatrace-query-language/dql-guide) or [SLO](../SLI_SLO/README.md). 

![gitlab-cicd](assets/srg_objective_1.png)
![gitlab-cicd](assets/srg_objective_2.png)


## 3. Create a Dynatrace Workflow

Create a **Dynatrace Workflow** that includes the Site Reliability Guardian application.

![gitlab-cicd](assets/simplenode_wf.png)

Notice the Event trigger:

```
type == "guardian.validation.triggered" AND tag.service == "your-service-name" AND tag.stage == "you-stage-name"
```

> Note: The values for `tag.service` and `tag.stage` will be used as parameters during the CLI execution.

The start time and end time expression _is already added to the SRG task_ like in the image:
`{{event()['timeframe.from']}}` and end time `{{event()['timeframe.to']}}`

![gitlab-cicd](assets/simplenode_wf_srg_definition.png)

## DQL and SLO Details
- [DQL](https://www.dynatrace.com/support/help/platform/grail/dynatrace-query-language/dql-guide) to gather details about DQL
- [SLO](../SLI_SLO/README.md) to deep dive into SLO definitions in Dynatrace

