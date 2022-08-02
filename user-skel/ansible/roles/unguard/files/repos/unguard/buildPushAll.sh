#!/bin/bash

if [ -z $1 ] || [ -z $2 ]
then
  echo "Usage:"
  echo "buildpush.sh DOCKERHUBREPO TAG "
  echo "Example: buildpush.sh dynatraceace 1.0.0"
  exit 1
fi

declare -a reposArray=("ad-service" "frontend" "microblog-service" "proxy-service" "user-auth-service" "user-simulator")

for repo in "${reposArray[@]}"; do
    echo "Building $repo..."
    cd $repo

    docker build -t $1/unguard-$repo:$2 .

    echo "Pushing $repo to $1/unguard-$repo:$2 ..."

    docker push $1/unguard-$repo:$2
    cd ..
done
