#!/bin/bash

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
apt-get install python3-pip -y

# Upgrade pip
python3 -m pip --version
python3 -m pip install --upgrade pip -q

# Ansible
echo "INIT - Installing Ansible..."
python3 -m pip install ansible
ln -s /home/$ACE_BOX_USER/.local/bin/ansible /usr/bin/ansible
ln -s /home/$ACE_BOX_USER/.local/bin/ansible-galaxy /usr/bin/ansible-galaxy
ln -s /home/$ACE_BOX_USER/.local/bin/ansible-playbook /usr/bin/ansible-playbook

echo "INIT - Installing Ansible requirements..."
sudo -u $ACE_BOX_USER ansible-galaxy install -r /home/$ACE_BOX_USER/ansible/requirements.yml

# Install ACE-Box collections
sudo -u $ACE_BOX_USER ansible-galaxy collection install /home/$ACE_BOX_USER/ansible_collections/ace_box/ace_box

# Setup ace-cli
echo "INIT - Setting up ACE-CLI..."

# Install as root. Packages will be available for all users
python3 -m pip install -r /home/$ACE_BOX_USER/.ace/requirements.txt

cp /home/$ACE_BOX_USER/.ace/ace /usr/local/bin/ace
chmod 0755 /usr/local/bin/ace

# Remove Windows-style newline characters
sed -i 's/\r$//' /usr/local/bin/ace

# Set up user groups
addgroup --system docker
adduser $ACE_BOX_USER docker
