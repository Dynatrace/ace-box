import requests, json, logging, os, sys, time
from itoptop import Itop
import http.client as http_client

DT_URL=os.environ['DYNATRACE_URL']
DT_TOKEN=os.environ['DYNATRACE_APITOKEN']

headers={}
headers["Authorization"] = "Api-Token "+DT_TOKEN
headers["Content-Type"] = "application/json"

# Update anomaly detection settings to GC suspension at 10%
r = requests.get(DT_URL+'/api/config/v1/anomalyDetection/hosts', headers=headers)
print(r)
content = r.json()
content['highGcActivityDetection']["customThresholds"] = {}
content['highGcActivityDetection']["customThresholds"]['gcTimePercentage'] = 40
content['highGcActivityDetection']["customThresholds"]['gcSuspensionPercentage'] = 10
r = requests.put(DT_URL+'/api/config/v1/anomalyDetection/hosts', json.dumps(content), headers=headers)
print(r)

# Update anomaly detection settings to GC suspension at 10%
r = requests.get(DT_URL+'/api/config/v1/anomalyDetection/services', headers=headers)
print(r)
content = r.json()
content['responseTimeDegradation']["automaticDetection"]["loadThreshold"] = "ONE_REQUEST_PER_MINUTE"
content['failureRateIncrease']["automaticDetection"]["loadThreshold"] = "ONE_REQUEST_PER_MINUTE"
r = requests.put(DT_URL+'/api/config/v1/anomalyDetection/services', json.dumps(content), headers=headers)
print(r)