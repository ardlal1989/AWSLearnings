# Deploying a Spring boot  containerized application in EKS

## Use Case: 
We will try to deploy a containerized application built in Spring on Amazon Elastic Container Service for Kubernetes (Amazon EKS)

### Step 1: Set up the EKS

- Use <a href="https://github.ibm.com/kousdas1/kubedemo/blob/master/docs/cluster-bootstrap-aws.md">Set up EKS</a> to create kubenetes cluster and configure your local kubectl 

### Step 2: Set up your code in Spring Boot

- Download the code

` git clone https://github.com/mart3051/springpet-clinic.git `

(The repository is similar to spring-pet-clinic only POM and application.properties are updated. Update the application.properties if db details are different).If you plan to use Amazon Aurora DB refer to this: <a href="https://github.ibm.com/ranimoha/MultiCloudDataMovement/blob/master/AuroraToGCPPubSub/PublishFromAmazonAurora.md">Aurora Set Up</a>

- Keep the jar and Docker file in the your Ubuntu or Windows location

![test1](https://media.github.ibm.com/user/220770/files/c4b54b00-8d26-11e9-9e7f-d8fd98489cb9)

Use this <a href="https://github.ibm.com/ranimoha/MultiCloudDataMovement/blob/master/DeployApplicationInEKS/Dockerfile">docker</a> file

### Step 3: Create a public repository in Docker Hub

### Step 4: Create Docker image and push in repository

` docker login `

` docker build -t *your repository name*:*version* . `

Eg: docker build -t ard/springapp:1.01 .

Give you repository name here

Once the docker image is built push that in the repository

` docker push *your repository name*:*version* `

Eg: docker push ard/springapp:1.01 

### Step 5: Update docker image url in the deployment.yaml file

Use the deployment.yaml file from <a href="https://github.ibm.com/ranimoha/MultiCloudDataMovement/blob/master/DeployApplicationInEKS/deployment.yaml">here</a>

In our case it would be 'registry.hub.docker.com/ard/springapp:1.01'

![test1](https://media.github.ibm.com/user/220770/files/e4e70900-8d2a-11e9-85f0-3902471d5a5f)

### Step 6: Create a namespace 

` kubectl create namespace spring-pet-clinic-ns `

### Step 7: Run the deployment

` kubectl apply -f deployment.yaml `

### Step 8: Check the deployment status and service status

` kubectl get deployments -n spring-pet-clinic-ns `

` kubectl get svc -n spring-pet-clinic-ns `

Use the External URL so obtained to access the app



