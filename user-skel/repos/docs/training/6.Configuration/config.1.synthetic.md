# Configuration
One of the key elements of MaaS is the ability to consitently and automatically configure the envionment.
In this first exercise you will learn how to automatically configure a synthetic test.

## Step 1 - Create a synthetic location
If you had chosen to do so, the scripts to create the ace-box also installed a synthetic-enabled activegate.
Go in Dynatrace and make a Private Synthetic Location from this activegate.

## Step 2 - Fetch the locationid
Once the location has been created, you need to get its location id in order to use it for synthetic tests.
Check out the APIs, there might be one to retrieve it?
In a real world environment, this step would need to be automated!

## Step 3 - Add a synthetic test
In the Deploy Staging pipeline, add a stage where you will automatically create the synthetic test for the staging service.
You will most likely have to break it down in two sections:
1. Get the correct ip/port for the service in staging (kubectl to the rescue). For the hostname, use ace-box. For the port use kubectl
2. Schedule a synthetic test
Check out https://github.com/dynatrace-ace-sockshop/carts/blob/master/Jenkinsfile for some inspiration.