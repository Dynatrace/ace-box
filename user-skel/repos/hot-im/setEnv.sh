#!/bin/bash

export NEW_CLI=1
export DYNATRACE_URL="https://abc12345.sprint.dynatracelabs.com"
export DYNATRACE_PAASTOKEN=""
export DYNATRACE_APITOKEN=""
export ITOP_IP=$(wget -qO- ifconfig.me/ip)
export ITOP_ENDPOINT=$ITOP_IP:"8000"
export ITOP_USER="<itop-user>"
export ITOP_PWD="<itop-pwd>"
