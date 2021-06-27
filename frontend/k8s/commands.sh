### Commands to run in root directory

# Log in to Docker registry
docker login

# Build image from Dockerfile
docker build -t diegomais/tindev-web:latest -t diegomais/tindev-web:v1.0.0 .

# List images containing tindev-web
docker image ls | grep tindev-web

# Push image to Docker Hub
docker push diegomais/tindev-web

# Create a local Kubernetes cluster
minikube start

# Access Kubernetes Dashboard UI
minikube dashboard

# List nodes
kubectl get nodes

# Show nodes details
kubectl describe nodes

# Create Web Deployment resource
kubectl create -f k8s/web-deployment.yaml

# List pods
kubectl get pod

# Dump pod logs (stdout)
kubectl logs tindev-web-68f78696b7-nlc92

# Stream pod logs (stdout)
kubectl logs -f tindev-web-68f78696b7-nlc92

# List Deployment resources
kubectl get deploy
#or
kubectl get deployment

# Create Web Service resource
kubectl apply -f k8s/web-svc.yaml

# List Service resources
kubectl get svc
#or
kubectl get service

# Display the Kubernetes service URL in the CLI
minikube service tindev-web-svc --url

# Delete all resources
kubectl delete -f k8s/.

# Create all resources
kubectl create -f k8s/.

# Delete local Kubernetes cluster
minikube delete
