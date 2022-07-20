#!/bin/bash

source ../setEnv.sh

python3 sendEvent.py $ITOP_USER $ITOP_PWD

curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=GarbageCollectionEvery10Seconds&enabled=true"

python3 checkIncidents.py $ITOP_USER $ITOP_PWD
