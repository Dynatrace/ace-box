# Configure Keptn & Dynatrace integration
In order to use Keptn with Dynatrace for the quality gates we need to install the Dynatrace service and the Dynatrace SLI service.

## Step 1: Configure the Dynatrace Service for Keptn

 We need to install the Dynatrace Service for keptn which will allow keptn to communicate with Dynatrace for sending events and comments to Problems.

1. Execute the following command from your home directory to install the Dynatrace Service for Keptn

    ```bash
    (bastion)$ cd
    (bastion)$ ./bootstrap/box/scripts/installDynatraceServiceForKeptn.sh
    ```

1. This script will perform the following steps:
    - Configure automated tagging rules in Dynatrace for environment, service and test-subject
    - Configure a problem notification in Dynatrace for sending events to the keptn api
    - Set up the Dynatrace Service in keptn

## Step 2: Install Dynatrace SLI service
In order to allow Keptn to use Dynatrace as an SLI provider we will need to install the [Dynatrace SLI Service](https://github.com/keptn-contrib/dynatrace-sli-service) for Keptn. This would allow us to write SLI definitions to obtain metrics from the Dynatrace API and use them as part of the evaluations.

    (bastion)$ kubectl apply -n keptn -f https://raw.githubusercontent.com/keptn-contrib/dynatrace-sli-service/0.7.0/deploy/service.yaml 

You should get as a response the following message

    serviceaccount/keptn-dynatrace-sli-service created
    role.rbac.authorization.k8s.io/keptn-dynatrace-sli-service-secrets created
    rolebinding.rbac.authorization.k8s.io/keptn-dynatrace-sli-service-secrets created
    deployment.apps/dynatrace-sli-service created
    service/dynatrace-sli-service created

[Previous Step: Install Keptn](../01_Install_Keptn) :arrow_backward: :arrow_forward: [Next Step: Configure Jenkins Library](../03_Configure_Jenkins_Library)

:arrow_up_small: [Back to overview](../)