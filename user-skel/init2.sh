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


# This script will be triggered by Terraform as part of the provisioning process.
# It can also be triggered manually on a VM.

# Run:
# $ sudo ACE_BOX_USER=dtu_training /home/dtu_training/init.sh


# Don't check for cloud init when deploying via DTU
# https://github.com/Dynatrace/ace-box/issues/400
if [[ -z "${DTU_ENVIRONMENT_NAME}" ]]; then
  echo "Not deploying via DTU, wait for cloud init to finish if applicable"
  # If applicable: Wait for cloud init to finish
  # See https://github.com/Dynatrace/ace-box/issues/272
  cloud-init status --wait || echo "Skipping cloud-init wait..."
else
  echo "Deploying via DTU..."
fi

ACE_BOX_USER="${ACE_BOX_USER:-$USER}"

# Prevent input prompts by specifying frontend is not interactive
echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

echo "INIT - Update apt-get and upgrade already install packages..."
apt-get update && apt-get dist-upgrade -y

echo "INIT - Setting up Python..."
apt-get install software-properties-common -y
add-apt-repository --yes --update ppa:ansible/ansible
apt-get install python3 python3-pip python3-venv -y
# if using ubuntu 22 we need to upgrade pip 
pip3 install --upgrade pip

# Ansible
echo "INIT - Installing Ansible..."
apt-get install ansible -y
ln -s /home/$ACE_BOX_USER/.local/bin/ansible /usr/bin/ansible
ln -s /home/$ACE_BOX_USER/.local/bin/ansible-galaxy /usr/bin/ansible-galaxy
ln -s /home/$ACE_BOX_USER/.local/bin/ansible-playbook /usr/bin/ansible-playbook

# Python deps for Ansible Kubernetes modules
echo "INIT - Installing Python Kubernetes clients (kubernetes, openshift)..."
apt-get install -y python3-kubernetes python3-openshift || true
# Ensure availability even if apt packages are missing or outdated
python3 -m pip install --break-system-packages -U kubernetes openshift || true

echo "INIT - Installing Ansible requirements..."
sudo -u $ACE_BOX_USER ansible-galaxy install -r /home/$ACE_BOX_USER/.ace/ansible_requirements.yml

# Install ACE-Box collections
sudo -u $ACE_BOX_USER ansible-galaxy collection install /home/$ACE_BOX_USER/ansible_collections/ace_box/ace_box
sudo rm -rf /home/$ACE_BOX_USER/ansible_collections

# Setup ace-cli
echo "INIT - Setting up ACE-CLI..."

# Install as root. Packages will be available for all users
python3 -m pip install --break-system-packages -r /home/$ACE_BOX_USER/.ace/requirements.txt

cp /home/$ACE_BOX_USER/.ace/ace /usr/local/bin/ace
chmod 0755 /usr/local/bin/ace

# Remove Windows-style newline characters
sed -i 's/\r$//' /usr/local/bin/ace

# Set up user groups
addgroup --system docker
adduser $ACE_BOX_USER docker
