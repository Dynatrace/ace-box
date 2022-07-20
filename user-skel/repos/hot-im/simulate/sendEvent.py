import requests, json, logging, os, sys, time
from itoptop import Itop
import http.client as http_client

itop_URL='http://'+os.environ['ITOP_ENDPOINT']
itop_USER=sys.argv[1]
itop_PWD=sys.argv[2]
DT_URL=os.environ['DYNATRACE_URL']
DT_TOKEN=os.environ['DYNATRACE_APITOKEN']

itop = Itop(itop_URL+'/webservices/rest.php', '1.3', itop_USER, itop_PWD)

def getTickets():
    headers={}
    headers["Authorization"] = "Api-Token "+DT_TOKEN
    headers["Content-Type"] = "application/json"

    # Update anomaly detection settings to GC suspension at 10%
    r = requests.get(DT_URL+'/api/config/v1/anomalyDetection/hosts', headers=headers)
    content = r.json()
    content['highGcActivityDetection']["customThresholds"] = {}
    content['highGcActivityDetection']["customThresholds"]['gcTimePercentage'] = 40
    content['highGcActivityDetection']["customThresholds"]['gcSuspensionPercentage'] = 10
    r = requests.put(DT_URL+'/api/config/v1/anomalyDetection/hosts', json.dumps(content), headers=headers)
    
    # Update txt file with number of open tickets
    tickets = len(itop.schema('Incident').find())
    f = open("open-tickets.txt", "w")
    f.write(str(tickets))
    f.close()

    print("Incident txt file updated, number of open tickets: "+str(tickets))

    #Send event to DT related to the new deployment
    # data = {
    #     "eventType": "CUSTOM_DEPLOYMENT",
    #     "title": "ChPe test",
    #     "entitySelector": "type(SERVICE), tag(Application:EasyTravel)",
    #     "properties": {
    #         "CI Tool": "Bitbucket pipelines",
    #         "Bitbucket build number": "#23704",
    #         "Bitbucket commit": "<link to commit>"
    #     }
    # }
    data = {
      "eventType": "CUSTOM_DEPLOYMENT",
      "source": "Bitbucket",
      "deploymentName": "simple-web-app",
      "deploymentVersion": "2.0",
      "attachRules": {
        "tagRule": [{
            "meTypes": ["SERVICE", "PROCESS_GROUP", "PROCESS_GROUP_INSTANCE"],
            "tags":[{
                "context": "CONTEXTLESS",
                "key": "Application",
                "value": "EasyTravel"
            }]
        }]
      }
    }
    data = json.dumps(data)
    r = requests.post(DT_URL+'/api/v1/events', data, headers=headers)
    #r = requests.post(DT_URL+'/api/v2/events/ingest', data, headers=headers)
    if r.status_code == 200:
        print("Deployment event sent to DT entities successfully")
    else:
        print("Error sending Deployment event")
    return True

getTickets()
