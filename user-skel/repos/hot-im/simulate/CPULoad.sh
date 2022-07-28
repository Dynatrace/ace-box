#!/bin/bash

checkForNewProblems(){
        echo "Waiting for problem to appear"
        echo "Total Count: $totalCount"
        sleep 10
        MYNEWVAR=$(curl -X GET "$DYNATRACE_URL/api/v2/problems?from=now-15m" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $DYNATRACE_APITOKEN")
        newTotalCount=$(echo "$MYNEWVAR" | jq -r '.totalCount')
        echo "New Total Count: $newTotalCount"
        return $newTotalCount
}

echo "Enabling Slow"
curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=CPULoad&enabled=true"

MYVAR=$(curl -X GET "$DYNATRACE_URL/api/v2/problems?from=now-15m" -H "accept: application/json; charset=utf-8" -H "Authorization: Api-Token $DYNATRACE_APITOKEN")
totalCount=$(echo "$MYVAR" | jq -r '.totalCount')

checkForNewProblems
while [ $totalCount == $newTotalCount ]
do
        checkForNewProblems
done

echo "Total Count: $totalCount"
echo "New Total Count: $newTotalCount"

echo "Disabling Slow"
curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=CPULoad&enabled=false"