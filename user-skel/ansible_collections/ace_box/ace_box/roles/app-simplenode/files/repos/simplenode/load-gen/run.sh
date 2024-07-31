#!/bin/sh
# Copyright 2024 Dynatrace LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


#INGRESS_DOMAIN=$1
#ENDPOINT="$INGRESS_PROTOCOL://simplenodeservice-canary.$INGRESS_DOMAIN/api/invoke?url=https://www.dynatrace.com"
ENDPOINT=$1

invoke () {
  printf "\n"
  curl -s -o /dev/null -w "$ENDPOINT returned HTTP status %{http_code}" $ENDPOINT
  printf "\n"
}

echo "Starting load generator..."

while true; do invoke; sleep 0.5; done
