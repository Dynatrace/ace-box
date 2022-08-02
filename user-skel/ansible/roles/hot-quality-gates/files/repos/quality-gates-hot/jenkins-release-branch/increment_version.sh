#!/bin/bash

minor_version=`cat version | cut -d'.' -f2`
echo "Minor version: $minor_version"
new_minor_version=$((minor_version+1))
echo "New Minor version: $new_minor_version"
sed -i 's/\.'"$minor_version"'\..*/\.'"$new_minor_version"'\.0/' version