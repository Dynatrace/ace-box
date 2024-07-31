#!/bin/sh

#
# Google's addlicense CLI is used to automatically add license headers to source code files.
# 
# To install:
# go install github.com/google/addlicense@latest
# 
# More info:
# https://github.com/google/addlicense
#

addlicense -f LICENSE -ignore tools/addlicenseheader.sh .
