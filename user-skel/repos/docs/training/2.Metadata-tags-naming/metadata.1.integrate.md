# Metadata / tagging / naming
This first lab is all about ecosystem metadata integration. How can we use metadata in such a way that it is being fed from other systems and is appropriately used in Dynatrace.

## Loading static metadata
Open the `deployStaging.Jenkinsfile` pipeline.
In the stage `Update Deployment and Service specification` there are two main areas where metadata is getting loaded

```
script {
    env.DT_CUSTOM_PROP = readFile "manifests/staging/dt_meta" 
    env.DT_CUSTOM_PROP = env.DT_CUSTOM_PROP + " " + generateDynamicMetaData()
}
```
Here a file in the repository is being loaded and the contents are put in a variable. 

## Loading dynamic metadata
Afterwards a method gets called that dynamically fills in build-specific information:
```
def generateDynamicMetaData(){
    String returnValue = "";
    returnValue += "SCM=${env.GIT_URL} "
    returnValue += "Branch=${env.GIT_BRANCH} "
    returnValue += "Build=${env.BUILD} "
    returnValue += "Image=${env.TAG_STAGING} "
    return returnValue;
}
```

Add in the following meta data (and others you can think of) in the `dt_meta` file and make sure it is commited and pushed to the repo:
```
Owner=ace@dynatrace.com FriendlyName=simplenode SERVICE_TYPE=FRONTEND Project=simpleproject DesignDocument=https://simple-corp.com/stories/simplenodeservice Tier=1 Class=Gold
```
**Note that the file is being read as-is so ensure proper `key=value` seperated by `spaces` are in place, spaces in the key or value themselves are not possible**

## Trigger the build **pipeline**