#!/usr/bin/env bash

# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.


print_help() {
    echo "Usage: "
    echo "./install.sh"
    echo "  arguments:"
    echo "    -i= | --ip=               public IP of VM (required)"
    echo "    -u= | --user=             non-root user for configuration (required)"
    echo "    -d= | --custom-domain=    (Opt) custom domain"
}

ip=""
non_root_user=""
custom_domain=""
use_custom_domain="false"

for i in "$@"; do
  case $i in
    -i=*|--ip=*)
      ip="${i#*=}"
      shift # past argument=value
      ;;
    -u=*|--user=*)
      non_root_user="${i#*=}"
      shift # past argument=value
      ;;
    -d=*|--custom-domain=*)
      custom_domain="${i#*=}"
      shift # past argument=value
      ;;
    *)
      # unknown option
      ;;
  esac
done

set -euo pipefail

if [[ "$ip" = "" ]]; then
    echo "No IP Address specified"
    print_help
    exit 1
fi

if [[ "$non_root_user" = "" ]]; then
    echo "No non-root user specified"
    print_help
    exit 1
fi

if [[ "$custom_domain" != "" ]]; then
    use_custom_domain="true"
fi


echo "Public IP address: $ip"
echo "Non-root user: $non_root_user"
echo "Use Custom domain: $custom_domain"
echo "Custom domain: $use_custom_domain"

export DEBIAN_FRONTEND=noninteractive

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

echo "INIT - Setting up structure..."
sudo rm -rf /vagrant
sudo mkdir /vagrant
sudo cp -R ~/ace-box/microk8s/* /vagrant

echo "INIT - Run Ansible Playbook"
ansible-playbook -vv /vagrant/ansible/initial.yml --extra-vars "public_ip=$ip acebox_provisioner=terraform non_root_user=$non_root_user use_custom_domain=$use_custom_domain custom_domain=$custom_domain"

