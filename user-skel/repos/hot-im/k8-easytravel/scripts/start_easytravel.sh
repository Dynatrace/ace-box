kubectl -n easytravel scale --replicas=1 deployment/easytravel-mongodb
kubectl -n easytravel scale --replicas=1 deployment/easytravel-backend
kubectl -n easytravel scale --replicas=1 deployment/easytravel-frontend
kubectl -n easytravel scale --replicas=1 deployment/easytravel-www
