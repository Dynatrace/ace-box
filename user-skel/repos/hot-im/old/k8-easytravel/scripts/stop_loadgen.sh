kubectl delete configmap easytravel-config -n easytravel
kubectl -n easytravel scale --replicas=0 deployment/loadgen
