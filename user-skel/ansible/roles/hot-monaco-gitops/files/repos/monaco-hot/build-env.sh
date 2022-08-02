##########################################
#  VARIABLES                             #
##########################################
monaco_version="v1.2.0" 
source_repo="https://github.com/dynatrace-ace/perform2021-vhot-monaco" 
clone_folder="bootstrap"
domain="nip.io"
jenkins_chart_version="1.27.0"
git_org="perform"
git_repo="perform"
git_user="dynatrace"
git_pwd="dynatrace"
git_email="perform2021@dt-perform.com"
shell_user="dtu_training"

# These need to be set as environment variables prior to launching the script
#export DYNATRACE_ENVIRONMENT_ID=     # only the environmentid (abc12345) is needed. script assumes a sprint tenant 
#export DYNATRACE_TOKEN=              # for Perform vHOT we get a token that is both an API and PaaS token

##########################################
#  DO NOT MODIFY ANYTHING IN THIS SCRIPT #
##########################################

home_folder="/home/$shell_user"

echo "Installing packages"
snap install jq 
snap install docker
chmod 777 /var/run/docker.sock

echo "Retrieving Dynatrace Environment details"
# Retrieve token  management token
# Comes from pipeline as $DYNATRACE_TOKEN

# Retrieve environment. Available from DTU pipeline as $DYNATRACE_ENVIRONMENT_ID
# DT_TENANT MUST be set without leading https:// or trailing slashes
DT_TENANT=https://$DYNATRACE_ENVIRONMENT_ID.sprint.dynatracelabs.com

VM_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
HOSTNAME=$(curl -s http://169.254.169.254/latest/meta-data/hostname)
echo "Virtual machine IP: $VM_IP"
echo "Virtual machine Hostname: $HOSTNAME"
ingress_domain="$VM_IP.$domain"
echo "Ingress domain: $ingress_domain"

cd 

##############################
# Download Monaco + add PATH #
##############################
wget https://github.com/dynatrace-oss/dynatrace-monitoring-as-code/releases/download/$monaco_version/monaco-linux-amd64 -O $home_folder/monaco
chmod +x $home_folder/monaco
cp $home_folder/monaco /usr/local/bin

##############################
# Clone repo                 #
##############################
cd $home_folder
mkdir "$clone_folder"
cd "$home_folder/$clone_folder"
git clone "$source_repo" .
chown -R $shell_user $home_folder/$clone_folder

##############################
# Install k3s and Helm       #
##############################

echo "Installing k3s"
curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=v1.18.3+k3s1 K3S_KUBECONFIG_MODE="644" sh -s - --no-deploy=traefik
echo "Waiting 30s for kubernetes nodes to be available..."
sleep 30
# Use k3s as we haven't setup kubectl properly yet
k3s kubectl wait --for=condition=ready nodes --all --timeout=60s
# Force generation of $home_folder/.kube
kubectl get nodes
# Configure kubectl so we can use "kubectl" and not "k3 kubectl"
cp /etc/rancher/k3s/k3s.yaml $home_folder/.kube/config
cp /etc/rancher/k3s/k3s.yaml /root/.kube/config
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

echo "Installing Helm"
snap install helm --classic
helm repo add stable https://charts.helm.sh/stable
helm repo add incubator https://charts.helm.sh/incubator

kubectl create ns app-one
kubectl create ns app-two
kubectl create ns app-three

##############################
# Install Dynatrace OneAgent #
##############################
echo "Dynatrace OneAgent - Install"
kubectl create namespace dynatrace
helm repo add dynatrace https://raw.githubusercontent.com/Dynatrace/helm-charts/master/repos/stable
sed \
    -e "s|DYNATRACE_ENVIRONMENT_PLACEHOLDER|$DT_TENANT|"  \
    -e "s|DYNATRACE_TOKEN_PLACEHOLDER|$DYNATRACE_TOKEN|g"  \
    $home_folder/$clone_folder/box/helm/oneagent-values.yml > $home_folder/$clone_folder/box/helm/oneagent-values-gen.yml

helm install dynatrace-oneagent-operator dynatrace/dynatrace-oneagent-operator -n dynatrace --values $home_folder/$clone_folder/box/helm/oneagent-values-gen.yml --wait

# Wait for Dynatrace pods to signal Ready
echo "Dynatrace OneAgent - Waiting for Dynatrace resources to be available..."
kubectl wait --for=condition=ready pod --all -n dynatrace --timeout=60s

# Allow Dynatrace access to create tags from labels and annotations in each NS
kubectl -n app-one create rolebinding default-view --clusterrole=view --serviceaccount=app-one:default
kubectl -n app-two create rolebinding default-view --clusterrole=view --serviceaccount=app-two:default
kubectl -n app-three create rolebinding default-view --clusterrole=view --serviceaccount=app-three:default

##############################
# Install ingress-nginx      #
##############################

echo "Installing ingress-nginx"
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace --wait

##############################
# Install Gitea + config     #
##############################

echo "Gitea - Install using Helm"
helm repo add k8s-land https://charts.k8s.land

sed \
    -e "s|INGRESS_PLACEHOLDER|$ingress_domain|"  \
    $home_folder/$clone_folder/box/helm/gitea-values.yml > $home_folder/$clone_folder/box/helm/gitea-values-gen.yml

helm install gitea k8s-land/gitea -f $home_folder/$clone_folder/box/helm/gitea-values-gen.yml --namespace gitea --create-namespace

kubectl -n gitea rollout status deployment gitea-gitea
echo "Gitea - Sleeping for 60s"
sleep 60

echo "Gitea - Create initial user $git_user"
kubectl exec -t $(kubectl -n gitea get po -l app=gitea-gitea -o jsonpath='{.items[0].metadata.name}') -n gitea -- bash -c 'su - git -c "/usr/local/bin/gitea --custom-path /data/gitea --config /data/gitea/conf/app.ini  admin create-user --username '$git_user' --password '$git_pwd' --email '$git_email' --admin --access-token"' > gitea_install.txt

gitea_pat=$(grep -oP 'Access token was successfully created... \K(.*)' gitea_install.txt)

echo "Gitea - PAT: $gitea_pat"
echo "Gitea - URL: http://gitea.$ingress_domain"

ingress_domain=$ingress_domain gitea_pat=$gitea_pat bash -c 'while [[ "$(curl -s -o /dev/null -w "%{http_code}" http://gitea.$ingress_domain/api/v1/admin/orgs?access_token=$gitea_pat)" != "200" ]]; do sleep 5; done'

echo "Gitea - Create org $git_org..."
curl -k -d '{"full_name":"'$git_org'", "visibility":"public", "username":"'$git_org'"}' -H "Content-Type: application/json" -X POST "http://gitea.$ingress_domain/api/v1/orgs?access_token=$gitea_pat"
echo "Gitea - Create repo $git_repo..."
curl -k -d '{"name":"'$git_repo'", "private":false, "auto-init":true}' -H "Content-Type: application/json" -X POST "http://gitea.$ingress_domain/api/v1/org/$git_org/repos?access_token=$gitea_pat"
echo "Gitea - Git config..."
git config --global user.email "$git_email" && git config --global user.name "$git_user" && git config --global http.sslverify false
runuser -l $shell_user -c 'git config --global user.email $git_email && git config --global user.name $git_user && git config --global http.sslverify false'

cd $home_folder
echo "Gitea - Adding resources to repo $git_org/$git_repo"
git clone http://$git_user:$gitea_pat@gitea.$ingress_domain/$git_org/$git_repo
cp -r $home_folder/$clone_folder/box/repo/. $home_folder/$git_repo
cd $home_folder/$git_repo && git add . && git commit -m "Initial commit, enjoy"
cd $home_folder/$git_repo && git push http://$git_user:$gitea_pat@gitea.$ingress_domain/$git_org/$git_repo


##############################
# Install ActiveGate         #
##############################
cd $home_folder
echo "Dynatrace ActiveGate - Download"
activegate_download_location=$home_folder/Dynatrace-ActiveGate-Linux-x86-latest.sh
if [ ! -f "$activegate_download_location" ]; then
    echo "$activegate_download_location does not exist. Downloading now..."
    wget "$DT_TENANT/api/v1/deployment/installer/gateway/unix/latest?arch=x86&flavor=default" --header="Authorization: Api-Token $DYNATRACE_TOKEN" -O $activegate_download_location 
fi
echo "Dynatrace ActiveGate - Install Private Synthetic"
DYNATRACE_SYNTHETIC_AUTO_INSTALL=true /bin/sh "$activegate_download_location" --enable-synthetic


private_node_id=$(curl -k -H "Content-Type: application/json" -H "Authorization: Api-token $DYNATRACE_TOKEN" "$DT_TENANT/api/v1/synthetic/nodes" | jq ".nodes | .[0] | .entityId")
echo "PRIVAE NODE ID: $private_node_id"

##############################
# Deploy Registry            #
##############################
kubectl create ns registry
kubectl create -f $home_folder/$clone_folder/box/helm/registry.yml

##############################
# Install Jenkins            #
##############################
echo "Jenkins - Install"
kubectl create ns jenkins
kubectl create -f $home_folder/$clone_folder/box/helm/jenkins-pvc.yml
sed \
    -e "s|GITHUB_USER_EMAIL_PLACEHOLDER|$git_email|" \
    -e "s|GITHUB_USER_NAME_PLACEHOLDER|$git_user|" \
    -e "s|GITHUB_PERSONAL_ACCESS_TOKEN_PLACEHOLDER|$gitea_pat|" \
    -e "s|GITHUB_ORGANIZATION_PLACEHOLDER|$git_org|" \
    -e "s|DT_TENANT_URL_PLACEHOLDER|$DT_TENANT|" \
    -e "s|DT_API_TOKEN_PLACEHOLDER|$DYNATRACE_TOKEN|" \
    -e "s|INGRESS_PLACEHOLDER|$ingress_domain|" \
    -e "s|GIT_REPO_PLACEHOLDER|$git_repo|" \
    -e "s|GIT_DOMAIN_PLACEHOLDER|gitea.$ingress_domain|" \
    -e "s|SYNTH_NODE_ID_PLACEHOLDER|$private_node_id|" \
    -e "s|VM_IP_PLACEHOLDER|$VM_IP|" \
    $home_folder/$clone_folder/box/helm/jenkins-values.yml > $home_folder/$clone_folder/box/helm/jenkins-values-gen.yml

kubectl create clusterrolebinding jenkins --clusterrole cluster-admin --serviceaccount=jenkins:jenkins

helm repo add stable https://charts.helm.sh/stable
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml

helm install jenkins stable/jenkins --values $home_folder/$clone_folder/box/helm/jenkins-values-gen.yml --version $jenkins_chart_version --namespace jenkins --wait 

##############################
# Deploy App                 #
##############################
sed -e "s|INGRESS_PLACEHOLDER|$ingress_domain|g"  \
    $home_folder/$clone_folder/box/app-manifests/application-1.yml > $home_folder/$clone_folder/box/app-manifests/application-1-gen.yml

sed -e "s|INGRESS_PLACEHOLDER|$ingress_domain|g"  \
    $home_folder/$clone_folder/box/app-manifests/application-2.yml > $home_folder/$clone_folder/box/app-manifests/application-2-gen.yml

sed -e "s|INGRESS_PLACEHOLDER|$ingress_domain|g"  \
    $home_folder/$clone_folder/box/app-manifests/application-3.yml > $home_folder/$clone_folder/box/app-manifests/application-3-gen.yml

kubectl apply -f $home_folder/$clone_folder/box/app-manifests/application-1-gen.yml
kubectl apply -f $home_folder/$clone_folder/box/app-manifests/application-2-gen.yml
kubectl apply -f $home_folder/$clone_folder/box/app-manifests/application-3-gen.yml

##############################
# Deploy Dashboard           #
##############################

sed \
    -e "s|INGRESS_PLACEHOLDER|$ingress_domain|g" \
    -e "s|GITEA_USER_PLACEHOLDER|$git_user|g" \
    -e "s|GITEA_PAT_PLACEHOLDER|$gitea_pat|g" \
    -e "s|DYNATRACE_TENANT_PLACEHOLDER|$DT_TENANT|g"\
    $home_folder/$clone_folder/box/dashboard/index.html > $home_folder/$clone_folder/box/dashboard/index-gen.html

sed -e "s|INGRESS_PLACEHOLDER|$ingress_domain|" $home_folder/$clone_folder/box/helm/dashboard/values.yaml > $home_folder/$clone_folder/box/helm/dashboard/values-gen.yaml

docker build -t localhost:32000/dashboard $home_folder/$clone_folder/box/dashboard && docker push localhost:32000/dashboard

helm upgrade -i ace-dashboard $home_folder/$clone_folder/box/helm/dashboard -f $home_folder/$clone_folder/box/helm/dashboard/values-gen.yaml --namespace dashboard --create-namespace

chown -R $shell_user $home_folder/$git_repo/