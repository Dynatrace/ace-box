#!/bin/bash
cd monaco
sudo chmod +x monaco
./monaco deploy -e environment.yaml
cd ..
#./monaco deploy -e environment.yaml -p EasyTravel EasyTravel-config/
