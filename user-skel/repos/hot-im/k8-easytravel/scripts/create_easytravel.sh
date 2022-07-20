#!/bin/sh
kubectl create namespace easytravel
kubectl apply -f ../manifests/easytravel-mongodb-secret.yaml
kubectl apply -f ../manifests/easytravel-config.yaml
kubectl apply -f ../manifests/easytravel-mongodb.yaml
kubectl apply -f ../manifests/easytravel-backend.yaml
kubectl apply -f ../manifests/easytravel-frontend.yaml
kubectl apply -f ../manifests/easytravel-nginx.yaml
