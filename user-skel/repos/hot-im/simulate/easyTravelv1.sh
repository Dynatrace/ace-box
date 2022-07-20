#!/bin/bash
curl -v "http://localhost:8091/services/ConfigurationService/setPluginEnabled?name=GarbageCollectionEvery10Seconds&enabled=false"
