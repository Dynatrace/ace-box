#!/bin/bash

set -e
trap "exit" TERM

# check if frontend address is set
if [[ -z "${FRONTEND_ADDR}" ]] ; then
  echo >&2 "FRONTEND_ADDR not specified"
  exit 1
fi

# removing surrounding quotes if there are any
int_wait_time=$(echo "$WAIT_TIME" | sed -e 's/^"//' -e 's/"$//')
# regular expression for integer
regex='^[0-9]+$'
# check if wait time input variable is an integer
if ! [[ $int_wait_time =~ $regex ]] ; then
   echo >&2 "WAIT_TIME is not a number"
   exit 1
fi

set -x

# code 000 is the response from curl if the service is not available
# if the request to the frontend fails, then exit
statuscode=$(curl --silent --output /dev/stderr --write-out "%{http_code}" http://${FRONTEND_ADDR})
if test $statuscode -eq 000; then
  echo "Error: Could not reach frontend - Status code: ${statuscode}"
  exit 1
fi

# else, run load generator with locust on host without the web interface with default 10 users
WAIT_TIME=${int_wait_time:-1800} locust --host http://${FRONTEND_ADDR} --locustfile locustfile.py --headless --users ${USERS:-1} --spawn-rate 1 2>&1