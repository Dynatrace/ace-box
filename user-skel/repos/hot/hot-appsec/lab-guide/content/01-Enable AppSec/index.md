## Enable App Sec
### Verify access to environment
In Dynatrace University you will find the information on how to access the Environment required for the lab. Please make sure you can:
- Access the Dynatrace Environment using a web browser
- Connect to the bastion host using SSH

![Environment](../../assets/images/1-1-environment.png)
### Verify access to Dashboard
To access your dashboard, you need it's URL. In order to get it, on your University event, open the `Environments` tab and click on `Open terminal`. This will open a terminal in your VM. In the terminal run the following command:

`kubectl get ingress -A`

This will give you the links to the resources used during this HOT session.

Start by opening the URL containing `dashboard`. It will open the dashboard displayed in the screenshot below from which you will be able to access your Dynatrace environment, the Jenkins instance that manages our pipelines, as well as a Gitea repository that stores all the source code we will be using to run the pipelines.

![Dashboard](../../assets/images/1-6-dashboard.png)

### Enable runtime vulnerability detection

To enable Application Security,  go to *Application Security > Vulnerabilities* and select Activate settings.

![vulnerabilities](../../assets/images/1-2-vulnerabilities.png)

> Alternatively can also directly go to Settings > Application Security > Runtime vulnerability detection.

On the Runtime vulnerability detection page that opens, select *Enable runtime vulnerability detection*. 

![enable runtime vulnerability detection](../../assets/images/1-3-enable_vulnerability_detection.png)

> You also have the option to restrict it to certain technologies. 

### Enable OneAgent Features
After enabling runtime vulnerability detection, you need to enable OneAgent Java vulnerable function reporting. This is specifically just for vulnerable functions. The reporting of vulnerable components in general is generally available and running out of the box now.
- Under Settings > Service Side Service Monitoring > Deep Monitoring
- Scroll down to New OneAgent features and expand that section

![one agent features](../../assets/images/1-4-new-oneagent-features.png)

Filter by *reporting* and enable the following features
- Java Vulnerable Function Reporting


![software component reporting](../../assets/images/1-5-function-reporting1.png)