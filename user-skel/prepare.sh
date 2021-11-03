#!/bin/bash

# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.

# set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

print_help() {
    echo "Usage: "
    echo "./prepare.sh"
    echo "  arguments:"
    echo "    -i= | --ingress-domain=      custom domain VM can be reached at (required)"
    echo "    -p= | --ingress-protocol=    ingress protocol (required)"
}

ingress_domain=""
ingress_protocol="http"
hosts_file_path='./ansible/hosts'

for i in "$@"; do
  case $i in
    -i=*|--ingress-domain=*)
      ingress_domain="${i#*=}"
      shift # past argument=value
      ;;
    -p=*|--ingress-protocol=*)
      ingress_protocol="${i#*=}"
      shift # past argument=value
      ;;
    *)
      # unknown option
      ;;
  esac
done

echo "INIT - Start Initial Install"
sudo apt-get update -y
sudo apt-get upgrade -y

echo "INIT - Installing packages and dependencies..."
sudo apt-get install python3.8 python3-pip -y

python3.8 -m pip --version
python3.8 -m pip install --upgrade pip -q

# Sudo required in order to properly set up symlinks, etc.
sudo python3.8 -m pip install ansible -q

ansible --version

echo "INIT - Persisting Ansible hosts config..."

# Set up Ansible hosts file
echo "localhost ingress_domain=$ingress_domain ingress_protocol=$ingress_protocol" > $hosts_file_path

echo "INIT - Successfully initialized host."
