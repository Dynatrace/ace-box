#!/bin/bash
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


if [ -z $1 ] || [ -z $2 ]
then
  echo "Usage:"
  echo "buildpush.sh DOCKERHUBREPO TAG "
  echo "Example: buildpush.sh dynatraceace/ace-box-dashboard 1.0.0"
  exit 1
fi

docker build -t $1:$2 .
docker push $1:$2
