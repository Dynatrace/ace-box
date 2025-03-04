# health-check

This role is used to deploy a health check service for the Ace-Box roles

## Application Availability Health Check

The `application-availability` role checks the availability and accessibility of an application by sending HTTP requests to the application's URL and validating the response codes. It also verifies the validity and domain matching of the SSL certificate if the application uses HTTPS. If the application is not accessible or the SSL certificate does not match the domain, the role fails, ensuring that any issues are promptly identified.

### Usage

```yaml
- include_role:
    name: health-check
    tasks_from: application-availability
  vars:
    application_domain: "<application domain url>" # e.g. easytrade.demo-sprint.ace-innovation.com
```

### When to use?

When adding a new application deployment role on Ace-Box that includes a user interface accessible via ingress, ensure to include this task at the end of the role implementation in its `tasks/main.yml` file.

## Use case health checks

The health check roles for use cases involving various tools and applications ensure that the respective pipelines or jobs are triggered, monitored, and validated. If any pipeline or job fails, the roles retry the entire process up to a specified number of times, with a delay between retries. This approach helps handle transient issues gracefully and improves the reliability of the health check process.


### Use case health check that has Gitlab pipeline

The `usecase-health-check-gitlab` role performs a health check for a GitLab use case by triggering a pipeline, monitoring its status, and validating the result. If the pipeline fails, the role retries the entire process up to a specified number of times, with a delay between retries.


```yaml
- include_role:
    name: health-check
    tasks_from: usecase-health-check-gitlab
  vars:
    usecase_group_name: "<gitlab group name>"
    usecase_repo_name: "<gitlab repo name>"
    usecase_git_ref: "<gitlab branch name>" # e.g. main
    wait_before_trigger_pipeline: "<wait seconds to trigger the pipeline>" # e.g. 180 seconds wait not to override the default pipeline execution
```

### Use case health check that has Jenkins pipeline

The `usecase-health-check-jenkins` role performs a health check for a Jenkins use case by triggering a job, monitoring its status, and validating the result. If the pipeline fails, the role retries the entire process up to a specified number of times.

```yaml
- include_role:
    name: health-check
    tasks_from: usecase-health-check-jenkins
  vars:
    usecase_job_path: "<jenkins job name>" #e.g. "/demo-ar-workflows-ansible/job/1. Build images"
    wait_before_trigger_pipeline: "<wait seconds to trigger the pipeline>" # e.g. 180 seconds wait not to override the default pipeline execution
```

### Use case health check that has AWX jobs

The `usecase-health-check-awx` role performs a health check for an AWX use case by executing a job, monitoring its status, and validating the result. If the job fails, the role retries the entire process up to a specified number of times.

```yaml
- include_role:
    name: health-check
    tasks_from: usecase-health-check-jenkins
  vars:
    usecase_job_template_id: "<AWX job name>" # e.g. "Demo Job Template"
    wait_before_trigger_pipeline: "<wait seconds to trigger the pipeline>" # e.g. 180 seconds wait not to override the default pipeline execution
```