#!/usr/bin/env bash

# Install needed packages
#sudo apt update -y && sudo apt -y upgrade
#sudo apt install -y git vim wget curl openjdk-8-jre apt-transport-https software-properties-common
#sudo snap install jq

# Download easyTravel and install
cd /tmp
wget -O dynatrace-easytravel-linux-x86_64.jar https://etinstallers.demoability.dynatracelabs.com/latest/dynatrace-easytravel-linux-x86_64.jar
java -jar dynatrace-easytravel-linux-x86_64.jar -y

# Update config file to auto start Standard scenario
sed -i "s|^config.autostart=.*|config.autostart=Standard|g" easytravel-2.0.0-x64/resources/easyTravelConfig.properties
#sed -i "s|config.autostartGroup=.*|config.autostartGroup=UEM|g" easytravel-2.0.0-x64/resources/easyTravelConfig.properties

# For RUM traffic, not needed for now
#cd /tmp/easytravel-2.0.0-x64/resources/
#chmod +x ./installChromeDeps.sh
#sudo ./installChromeDeps.sh

# easytravel.service configuration and start
(
cat <<-EOF
  [Unit]
  Description=easytravel launcher
  Requires=network-online.target
  After=network-online.target

  [Service]
  Restart=on-failure
  ExecStart=/tmp/easytravel-2.0.0-x64/runEasyTravelNoGUI.sh
  ExecReload=/bin/kill -HUP $MAINPID

  [Install]
  WantedBy=multi-user.target
EOF
) | sudo tee /etc/systemd/system/easytravel.service

sudo systemctl enable easytravel.service
sudo systemctl start easytravel

timeout 240 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' http://localhost:8079)" != "200" ]]; do echo "waiting for the easyTravel app to finish deploying..." &&  sleep 5; done'
