#!/bin/sh

INGRESS_DOMAIN=$1
ENDPOINT="http://simplenodeservice.canary.$INGRESS_DOMAIN/api/invoke?url=https://www.dynatrace.com"

invoke () {
  printf "\n"
  curl -s -o /dev/null -w "$ENDPOINT returned HTTP status %{http_code}" $ENDPOINT
  printf "\n"
}

echo "Starting load generator..."

while true; do invoke; sleep 0.5; done
