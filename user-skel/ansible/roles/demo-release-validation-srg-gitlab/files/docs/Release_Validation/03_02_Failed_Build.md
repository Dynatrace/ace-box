# 2. Failed Build

During this step, we will deploy a Build of poor quality (i.e. a decrease in response time and an increase in request failures) that will be stopped by an automated Release Validation and not be promoted to production environment.

## Deploying a bad build

1. Navigate to `CI/CD` on the left menu and click on the the blue `Run pipeline` button.
   
    ![gitlab-cicd](assets/gitlab_pipe_run_build.png)

2. Set the `BUILD_ID` variable to `2`. This will control the deployment of the bad build. Click on `Run pipeline`. 
    > Note: This process will take about 10 minutes to complete. For a customer demo it is recommended to launch this step prior to the start of the session, this will result in it completing during the demonstration.

    ![demo_gitlab_cicd_build_2](assets/demo_gitlab_cicd_build_2.png)

## A failed build

1. After about 10 minutes, you will notice that the pipeline has failed:
   
    ![failed-run](assets/gitlab_cicd_pipeline_failed.png)

2. Click on the failed pipeline to open the details. Notice how the `Validate Release with SRG` job in the `Validate Release` stage failed. 
   
    ![failed-run](assets/gitlab_cicd_pipeline_failed_stages.png)

3. Click on the `Validate Release with SRG` job to open the details. This will produce the console output of the agent running the job.
   
    ![failed-run](assets/gitlab_cicd_pipeline_failed_jobdetails_1.png)
    ![failed-run](assets/gitlab_cicd_pipeline_failed_jobdetails_2.png)

4. Near the end of the output, you can see the details of the evaluation. Notice the `Status: fail` message at the end. 

## (Optional): Deploying a successful build again

If wanted, you can follow the steps outlined in [Deploying a bad build](#deploying-a-bad-build) to deploy a fast build by setting the `BUILD_ID` variable to `1` or `3`

## Next Steps
Navigate to [3. Evaluation Explained](03_03_Evaluation_Explained.md) to gather details on how the Evaluation is Performed.