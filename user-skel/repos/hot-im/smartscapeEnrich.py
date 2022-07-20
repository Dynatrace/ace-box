import requests, json, logging, os, sys
from itoptop import Itop
import http.client as http_client

itop_URL='http://'+os.environ['ITOP_ENDPOINT']
itop_USER=sys.argv[1]
itop_PWD=sys.argv[2]
DT_URL=os.environ['DYNATRACE_URL']
DT_TOKEN=os.environ['DYNATRACE_APITOKEN']

itop = Itop(itop_URL+'/webservices/rest.php', '1.3', itop_USER, itop_PWD)

def updateOrganization(schema):
    query = {'id': 1}
    update = {'name': 'EasyTravel', 'code': "ET"}
    itop.schema(schema).update(query, update, multi=True, upsert=True)

def tagEntity(entityId, tagId):
    headers={}
    headers["Authorization"] = "Api-Token "+DT_TOKEN
    headers["Content-Type"] = "application/json"
    api_url=DT_URL+"/api/v2/tags"

    # Delete previous tag
    parameters = {
        "key": "ITOP_ID",
        "deleteAllWithKey": True,
        "entitySelector": "entityId("+entityId+")",
    }

    r = requests.delete(api_url, headers=headers, params=parameters)
    print(r.text)


    # Create new tag
    parameters = {
        "entitySelector": "entityId("+entityId+")",
    }

    data = {
        "tags": [
            {
                "key": "ITOP_ID",
                "value": tagId
            }
        ]
    }
    
    r = requests.post(api_url, json.dumps(data), headers=headers, params=parameters)

def getEntityDT(entitySelector):
    headers={}
    headers["Authorization"] = "Api-Token "+DT_TOKEN
    api_url=DT_URL+"/api/v2/entities"
    parameters = {
        "entitySelector": entitySelector,
        "from":"now-2h",
        "fields": "toRelationships"
    }
    r = requests.get(api_url, headers=headers, params=parameters);
    content = r.json()
    return content

def getServices(listOfServices, hostId, processId):
    i=0
    while i<len(listOfServices):
        dtService = getEntityDT("entityId("+listOfServices[i]['id']+")")
        name = dtService['entities'][0]['displayName']
        serviceId = dtService['entities'][0]['entityId']

        # Create WebServer on ITOP
        query = {'name': name}
        if not itop.schema('WebServer').find(query):
            insert = {'name': name, 'org_id':1, 'system_id': hostId}
            itop.schema('WebServer').insert(insert)
        
        # Tag entity with CI id
        tagId = itop.schema('WebServer').find(query)['id']
        tagEntity(serviceId, tagId)

        # Tag also the process related
        tagEntity(processId, tagId)

        i+=1

def getProcessGroupInstances(listOfProcesses, hostName):
    query = {'name': hostName}
    hostId = itop.schema('Server').find(query)['id']
    i=0
    while i<len(listOfProcesses):
        dtProcess = getEntityDT("entityId("+listOfProcesses[i]['id']+")")
        name = dtProcess['entities'][0]['displayName']
        processId = dtProcess['entities'][0]['entityId']
        
        if "runsOnProcessGroupInstance" in dtProcess["entities"][0]['toRelationships']:
            getServices(dtProcess["entities"][0]['toRelationships']["runsOnProcessGroupInstance"], hostId, processId)

        i+=1

def updateHostItop(entity):
    i=0
    while i<len(entity['entities']):
        # Get properties
        name = entity['entities'][i]['displayName']
        hostId = entity['entities'][i]['entityId']
        entityType = entity['entities'][i]['type']
        dtUrl = DT_URL+'/#newhosts/hostdetails;id='+hostId
        
        # Create hosts in ITOP
        query = {'name': name}
        if not itop.schema('Server').find(query):
            data = {'name': name, 'org_id': 1, 'description': "Id="+hostId+" Url="+dtUrl}
            itop.schema('Server').insert(data)
        
        # Tag entity with CI id
        tagId = itop.schema('Server').find(query)['id']
        tagEntity(hostId, tagId)

        # Get processes of hosts
        getProcessGroupInstances(entity['entities'][i]['toRelationships']['isProcessOf'], name)

        i+=1

def openTicket():
    query = {'name': 'incident-mgmt-lab.c.acetaskforceemea.internal'}
    hostId = itop.schema('Server').find(query)['id']
    json_data = {
                'operation': 'core/create',
                'class': 'Incident',
                'fields': {
                        'title': 'Ticket name',
                        'description': 'whatever',
                        'org_id': '1',
                        'functionalcis_list': [ {
                                'functionalci_id': hostId,
                                'impact_code': 'manual',
                        }]
                },
                'comment': 'created from python',
                'output_fields': 'id',
        }
    encoded_data = json.dumps(json_data)
    r = requests.post(itop_URL+'/webservices/rest.php?version=1.3', data={'auth_user': itop_USER, 'auth_pwd': itop_PWD, 'json_data': encoded_data})
    print(r.content)
    print(r.text)
    result = json.loads(r.text);
    print(result)

def getTickets():
    json_data = {
                'operation': 'core/get',
                'class': 'Incident',
                'key': 49
        }
    encoded_data = json.dumps(json_data)
    r = requests.post(itop_URL+'/webservices/rest.php?version=1.3', data={'auth_user': itop_USER, 'auth_pwd': itop_PWD, 'json_data': encoded_data})
    print(r.content)
    print(r.text)
    result = json.loads(r.text);
    print(result)

http_client.HTTPConnection.debuglevel = 1

# You must initialize logging, otherwise you'll not see debug output.
# logging.basicConfig()
# logging.getLogger().setLevel(logging.DEBUG)
# requests_log = logging.getLogger("requests.packages.urllib3")
# requests_log.setLevel(logging.DEBUG)
# requests_log.propagate = True

#openTicket()
#getTickets()

# Update Organization name to EasyTravel
updateOrganization('Organization')

# CDMB Enrichment
hosts = getEntityDT("type(HOST)")
updateHostItop(hosts)

