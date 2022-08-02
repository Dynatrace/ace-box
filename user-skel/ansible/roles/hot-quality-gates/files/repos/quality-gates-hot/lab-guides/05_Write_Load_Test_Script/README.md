# Write Load Test Script for Performance Validation

In this lab you will write a JMeter load test that stresses a service with a bulk of requests. 

This load test needs a list of parameters:
* **SERVER_URL** - The domain of the service.
* **SERVER_PORT** - The port of the service.
* **CHECK_PATH** - The endpoint to send the requests to.
* **DT_LTN** - The Load Test Name uniquely identifies a test execution.
* **VUCount** - The number of virtual users. 
* **LoopCount** - The number of loops each virtual user performs.

Each request needs to be correctly tagged in order to identify them later on. Therefore, we generate the **x-dynatrace-test** header as defined in a [best practice](https://www.dynatrace.com/support/help/integrations/test-automation-frameworks/how-do-i-integrate-dynatrace-into-my-load-testing-process/) and containing the following key-value pairs:
* **VU** - Virtual User ID of the unique user who sent the request.
* **TSN** - Test Step Name is a logical test step within your load testing script (for example, Login or Add to cart.
* **LSN** - Load Script Name - name of the load testing script. This groups a set of test steps that make up a multi-step transaction (for example, an online purchase).
* **LTN** - The Load Test Name uniquely identifies a test execution (for example, 6h Load Test – June 25)

## Step 1: Open Performance Test Template
1. Replace the xxx.xxx.xxx.xxx with your instance IP from DTU and navigate to: http://gitea.xxx.xxx.xxx.xxx.nip.io/perform/k8s-deploy-staging/src/branch/master/jmeter/carts_perfcheck.jmx
1. In this file, locate the XML tag `<stringProp name="script">`, which contains the following Java code fragment:
    ```
    import org.apache.jmeter.util.JMeterUtils;
    import org.apache.jmeter.protocol.http.control.HeaderManager;
    import java.io;
    import java.util;

    // -------------------------------------------------------------------------------------
    // Generate the x-dynatrace-test header 
    // -------------------------------------------------------------------------------------
    

    // -------------------------------------------
    // Set header
    // -------------------------------------------

    ```

## Step 2: Generate the x-dynatrace-test header
1. Add the following snippet after the comment section: **// Generate the x-dynatrace-test header**. (click the pencil icon on the top right corner to enter edit mode)
    ```
    String LTN=JMeterUtils.getProperty(&quot;DT_LTN&quot;);
    if((LTN == null) || (LTN.length() == 0)) {
        if(vars != null) {
            LTN = vars.get(&quot;DT_LTN&quot;);
        }
    }
    if(LTN == null) LTN = &quot;NoTestName&quot;;

    String LSN = (bsh.args.length &gt; 0) ? bsh.args[0] : &quot;Test Scenario&quot;;
    String TSN = sampler.getName();
    String VU = ctx.getThreadGroup().getName() + ctx.getThreadNum();
    String headerValue = &quot;LSN=&quot;+ LSN + &quot;;TSN=&quot; + TSN + &quot;;LTN=&quot; + LTN + &quot;;VU=&quot; + VU + &quot;;&quot;;
    ```

## Step 3: Set header on each request
1. Add the following snippet after the comment section: **// Set header**.
    ```
    HeaderManager hm = sampler.getHeaderManager();
    hm.removeHeaderNamed(&quot;x-dynatrace-test&quot;);
    hm.add(new org.apache.jmeter.protocol.http.control.Header(&quot;x-dynatrace-test&quot;, headerValue));  
    ```

## Step 4: Commit changes
1. Commit the changes by scrolling down and click commit changes.

---

[Previous Step: Define Request Attributes](../04_Define_Request_Attributes) :arrow_backward: :arrow_forward: [Next Step: Define Pipeline](../06_Define_Pipeline)

:arrow_up_small: [Back to overview](../)
