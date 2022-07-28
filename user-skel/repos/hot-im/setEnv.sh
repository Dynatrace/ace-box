#!/bin/bash

export NEW_CLI=1
export DYNATRACE_URL=$(sed -nE 's/^dynatrace_tenant_url: "([^"]+)".*/\1/p' ~/ansible/ace.config.yml)
export DYNATRACE_PAASTOKEN=$(sed -nE 's/^dynatrace_paas_token: "([^"]+)".*/\1/p' ~/ansible/ace.config.yml)
export DYNATRACE_APITOKEN=$(sed -nE 's/^dynatrace_api_token: "([^"]+)".*/\1/p' ~/ansible/ace.config.yml)
export ITOP_IP=$(wget -qO- ifconfig.me/ip)
export ITOP_ENDPOINT=$ITOP_IP:"8000"
export ITOP_USER="<itop-user>"
export ITOP_PWD="<itop-pwd>"