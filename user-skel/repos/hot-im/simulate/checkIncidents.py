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
    # Read open tickets in the past
    f = open("open-tickets.txt", "r")
    tickets_before = int(f.read())
    
    # Get open ticket in Itop now
    tickets_after = len(itop.schema('Incident').find())
    
    # If past is lower than now
    if tickets_before<tickets_after:
        # Update number of open tickets
        f.close()
        f = open("open-tickets.txt", "w")
        f.write(str(tickets_after))
        f.close()

        # Get ticket information
        ticket = itop.schema('Incident').find()[0]
        ticket_id = ticket['id']
        dt_problem = ticket['description'].split("pid=")[1].split("</")[0]
    
        ticket_url = itop_URL+'/pages/UI.php?operation=details&class=Incident&id='+ticket_id+'&c[menu]=Incident%3AOverview'
        data = {"message": ticket_url, "context": "Itop ITSM ticket reference"}

        headers={}
        headers["Authorization"] = "Api-Token "+DT_TOKEN
        headers["Content-Type"] = "application/json"
        
        data = json.dumps(data)
        r = requests.post(DT_URL+'/api/v2/problems/'+dt_problem+'/comments', data, headers=headers)
        return False
    return True

http_client.HTTPConnection.debuglevel = 1

flag = True
while flag:
    flag = getTickets()
    print("Checking for new open tickets...")
    time.sleep(10)
print("DT Problem updated with ticket information")


