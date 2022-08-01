#!/bin/bash

#Install ITOP
docker run -d -p 8000:80 --name=my-itop europe-west2-docker.pkg.dev/acetaskforceemea/images/itop:3.0.0-beta
echo "Started ITOP. Waiting 30s until installation."
sleep 30

#Configure ITOP with some choice curl commands -- requires no parameters.
echo "Configuring Itop..."
chmod +x install_itop.sh
sed -i 's/\r$//' install_itop.sh
./install_itop.sh

#########################
# Install EasyTravel K8 #
#########################
# cd k8-easytravel/scripts
# chmod +x create_easytravel.sh
# sed -i 's/\r$//' create_easytravel.sh
# ./create_easytravel.sh
# chmod +x start_loadgen.sh
# sed -i 's/\r$//' start_loadgen.sh
# ./start_loadgen.sh
# cd ../../

#apt-get install python3-pip -y
python3 -m pip install itoptop

#####################################
### Old - For local (non ace-box) ###
#####################################
# Install dependencies
sudo apt-get update
sudo apt install wget -y

#Install OneAgent
wget -O Dynatrace-OneAgent-Linux-latest.sh "$DYNATRACE_URL/api/v1/deployment/installer/agent/unix/default/latest?arch=x86&flavor=default" --header="Authorization: Api-Token $DYNATRACE_PAASTOKEN"
sudo /bin/sh Dynatrace-OneAgent-Linux-latest.sh --set-host-group=EasyTravel_APPID00274628_PROD_US

# chmod scripts
chmod +x ./simulate/CPULoad.sh
sed -i 's/\r$//' ./simulate/CPULoad.sh
chmod +x ./simulate/easyTravelv1.sh
sed -i 's/\r$//' ./simulate/easyTravelv1.sh
chmod +x ./simulate/disableSlowUserLogin.sh
sed -i 's/\r$//' ./simulate/disableSlowUserLogin.sh
chmod +x ./simulate/enableSlowUserLogin.sh
sed -i 's/\r$//' ./simulate/enableSlowUserLogin.sh
chmod +x ./simulate/easyTravelv2.sh
sed -i 's/\r$//' ./simulate/easyTravelv2.sh

# Set environment variables
sed -i 's/\r$//' setEnv.sh
chmod +x ./setEnv.sh
source ./setEnv.sh

python3 updateAnomalyDetection.py

#Run Monaco initial config
echo "Running Dynatrace Monitoring as Code..."
chmod +x executeMonaco.sh
sed -i 's/\r$//' executeMonaco.sh
source ./executeMonaco.sh

#echo "Installing EasyTravel"
chmod +x easyTravel.sh
sed -i 's/\r$//' easyTravel.sh
./easyTravel.sh