#!/bin/bash

# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.

# set -euo pipefail

echo "INSTALL - Checking Ansible version..."
ansible --version

echo "INSTALL - Running Ansible playbook..."
ansible-playbook -vv -i ./ansible/hosts ./ansible/initial.yml
