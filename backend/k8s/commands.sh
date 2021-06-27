### Commands to run in root directory

# Log in to Docker registry
docker login

# Build image from Dockerfile
docker build -t diegomais/tindev-api:latest -t diegomais/tindev-api:v1.0.0 .

# List images containing tindev-api
docker image ls | grep tindev-api

# Push image to Docker Hub
docker push diegomais/tindev-api

# Create a local Kubernetes cluster
minikube start

# Access Kubernetes Dashboard UI
minikube dashboard

# List nodes
kubectl get nodes

# Show nodes details
kubectl describe nodes

# Create MongoDB StatefulSet resource
kubectl create -f k8s/mongo-sts.yaml

# List StatefulSet resources
kubectl get sts
#or
kubectl get statefulset

# List pods
kubectl get pod

# Show dump pod logs (stdout)
kubectl logs mongo-0

# Create MongoDB Service resource
kubectl create -f k8s/mongo-svc.yaml

# List Service resources
kubectl get svc
#or
kubectl get service

# Create API Deployment resource
kubectl create -f k8s/api-deployment.yaml

# List Deployment resources
kubectl get deploy
#or
kubectl get deployment

# Dump pod logs (stdout)
kubectl logs tindev-api-68f78696b7-nlc92

# Stream pod logs (stdout)
kubectl logs -f tindev-api-68f78696b7-nlc92

# Create API Service resource
kubectl create -f k8s/api-svc.yaml

# Update API Deployment resource
kubectl apply -f api-deployment.yaml

# Display the Kubernetes service URL in the CLI
minikube service tindev-api-svc --url

# Delete all resources
kubectl delete -f k8s/.

# Create all resources
kubectl create -f k8s/.

# Delete local Kubernetes cluster
minikube delete
