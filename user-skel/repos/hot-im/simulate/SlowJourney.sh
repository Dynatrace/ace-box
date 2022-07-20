#!/bin/bash

echo "Enabling Slow"
curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=JourneyUpdateSlow&enabled=true"

MYVAR=$(curl -X GET "$DYNATRACE_URL/api/v2/problems?from=now-15m" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $DYNATRACE_APITOKEN")
totalCount=$(echo "$MYVAR" | jq -r '.totalCount')
echo "Total Count: $totalCount"

while [ $totalCount != 1 ]
do
   echo "Waiting for problem to appear"
   echo "Total Count: $totalCount"
   sleep 10
   MYVAR=$(curl -X GET "$DYNATRACE_URL/api/v2/problems?from=now-15m" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $DYNATRACE_APITOKEN")
   totalCount=$(echo "$MYVAR" | jq -r '.totalCount')
done

echo "Disabling Slow"
curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=JourneyUpdateSlow&enabled=false"
