# Amazon Aurora to GCP Pub Sub 

## Use case:
Amazon Aurora provides an SQL DB. Tables are created in this DB and whenever there are any inserts in the table, appropriate Lambda function is triggered, which passes the data on to the AWS SNS topic. AWS SNS topic in turn publishes the data to GCP Pub Sub using cloud function.

## Components Used

AWS:

AWS Aurora

AWS Lambda

AWS SNS

GCP:

GCP Pub Sub

GCP Cloud Functions

Below are the detailed steps:

### Step 1: Creating and Configuring Amazon Aurora

Prerequisites: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Tutorials.WebServerDB.CreateVPC.html
               Under prerequisites- Create a VPC with one public and one private subnet. 
                                    Add an additional private subnet
                                    Create a VPC security group for DB
                                    Create a DB subnet group

Configure Amazon Aurora

Reference: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.CreateInstance.html

i>Navigate to  https://console.aws.amazon.com/rds/
ii>Go to Databases and Click create Database

![test1](https://media.github.ibm.com/user/220770/files/b806ea80-8ba0-11e9-9116-27ec66679a43)

Specify details

![test1](https://media.github.ibm.com/user/220770/files/a96d0300-8ba1-11e9-8549-9d916b993e13)


![test1](https://media.github.ibm.com/user/220770/files/d7524780-8ba1-11e9-95f4-ab580f2cd2b4)

Configure advanced settings

![test1](https://media.github.ibm.com/user/220770/files/1b454c80-8ba2-11e9-9147-3284967e0656)

Give cluster information

![test1](https://media.github.ibm.com/user/220770/files/4039bf80-8ba2-11e9-9d99-5d4365cf7af1)

Give other details

![test1](https://media.github.ibm.com/user/220770/files/5e072480-8ba2-11e9-9e04-eabb90cb1d90)

Once the database is created, it will look something like this

![test1](https://media.github.ibm.com/user/220770/files/dcfc5d00-8ba2-11e9-96c6-ed03f37d3142)

You can create a connection of this database in your MySQL workbench

![test1](https://media.github.ibm.com/user/220770/files/6b7fe580-8c5a-11e9-97de-01a597b8ae0e)

### Step 2: Giving Aurora Access to Lambda

Amazon Aurora will be calling Lambda functions, hence now we will learn on how to give Aurora the Access to Lambda functions
Link to follow: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.Lambda.html#AuroraMySQL.Integrating.LambdaAccess

i>Create IAM Policy

Go to IAM->Click on Create Policy and On the Visual editor tab, choose Choose a service, and then choose Lambda

![test1](https://media.github.ibm.com/user/220770/files/ee08a500-8c5a-11e9-988f-3886dd95f1cf)

Click on Expand All
![test1](https://media.github.ibm.com/user/220770/files/725b2800-8c5b-11e9-92fc-8f23067ab851)

Select All (Minimum ‘Invoke Function’ should be selected)

![test1](https://media.github.ibm.com/user/220770/files/8a32ac00-8c5b-11e9-8cd0-569d5f1c1723)

Choose Resources and add ARN (This should be that of the Lambda Function you will create)

![test1](https://media.github.ibm.com/user/220770/files/afbfb580-8c5b-11e9-9324-f7e4a24e37c2)

Click on Add ARN of function and then give the detail

![test1](https://media.github.ibm.com/user/220770/files/cb2ac080-8c5b-11e9-90f1-ba4a9dce2079)

Click on ‘Review Policy’ and then Give Name and description and Click on Create Policy

![test1](https://media.github.ibm.com/user/220770/files/f6151480-8c5b-11e9-9187-9d7e18bf5609)

Once created, it will look like the below

![test1](https://media.github.ibm.com/user/220770/files/0e852f00-8c5c-11e9-897b-2f44649bc14d)

Go to JSON section of policy and add ‘*’ in appropriate policies

![test1](https://media.github.ibm.com/user/220770/files/265cb300-8c5c-11e9-8cc0-671cfc05fb17)

ii>Create an IAM role, and attach the IAM policy you created

Go to IAM and go to Roles 

![test1](https://media.github.ibm.com/user/220770/files/9ec37400-8c5c-11e9-921c-f83f73c54071)

Select RDS from here

![test1](https://media.github.ibm.com/user/220770/files/b864bb80-8c5c-11e9-9aef-bacdc1243a3d)

Under Select your use case, choose RDS – CloudHSM and Directory Service and click on ‘Next Permissions’

![test1](https://media.github.ibm.com/user/220770/files/d29e9980-8c5c-11e9-9003-926a19893162)

Click on Next Tags-->Next Review

Set your Role Name and Description and click on Create Role

![test1](https://media.github.ibm.com/user/220770/files/15607180-8c5d-11e9-80ee-3d45c5d0fb2d)

In the navigation pane, choose Roles.
In the Search field, enter the name of the role you created, and click the role when it appears in the list.

On the Permissions tab, detach the following default roles from the policy:
AmazonRDSDirectoryServiceAccess
RDSCloudHsmAuthorizationRole

To detach a role, click the X associated with the role on the right, and then click Detach.
On the Permissions tab, choose Attach policy.
On the Attach policy page, enter the name of your policy in the Search field.
When it appears in the list, select the policy that you defined earlier

![test1](https://media.github.ibm.com/user/220770/files/5d7f9400-8c5d-11e9-9ffd-5a6b695cbd3d)

![test1](https://media.github.ibm.com/user/220770/files/738d5480-8c5d-11e9-8e69-13d8c51f02cc)

![test1](https://media.github.ibm.com/user/220770/files/86078e00-8c5d-11e9-82f5-6b8041045622)

iii>To permit database users in an Aurora MySQL DB cluster to invoke Lambda functions, associate the role that you created in with the DB cluster.
Go to your DB cluster, and go to its ‘Connectivity and Security Group’, and select and add the IAM role configured

![test1](https://media.github.ibm.com/user/220770/files/0ded9800-8c5e-11e9-9d68-6afc7a3e796a)

Now go to Parameter Group and click on Create Parameter Group



![test1](https://media.github.ibm.com/user/220770/files/257a5000-8c61-11e9-8666-99b22298eecf)

Give the following information and click on Create

![test1](https://media.github.ibm.com/user/220770/files/58244880-8c61-11e9-83be-116a809f2d7a)

Navigate to IAM and pullout the ARN for your created role

![test1](https://media.github.ibm.com/user/220770/files/7f7b1580-8c61-11e9-8d6e-eb99e3189c13)

Go to RDS and Select your Parameter group and click on Edit

![test1](https://media.github.ibm.com/user/220770/files/ad605a00-8c61-11e9-8eaf-1178469fa0f0)

Navigate to aws_default_lambda_role and put the ARN value and click on save.
Now navigate to your primary DB instance and click on Modify

![test1](https://media.github.ibm.com/user/220770/files/c963fb80-8c61-11e9-8d43-c9ec2aa820aa)

Change the DB Cluster parameter group

![test1](https://media.github.ibm.com/user/220770/files/e39dd980-8c61-11e9-8662-6f8159bf11ba)

Click on Continue and Modify DB Instance (Apply changes immediately)

![test1](https://media.github.ibm.com/user/220770/files/147e0e80-8c62-11e9-851a-e7dd6e157959)

Once done, choose your Primary DB instance and Reboot it

### Step 3: Create SNS Topic

Search for SNS
Click on Create Topic and provide name

![test1 jpg](https://media.github.ibm.com/user/220770/files/0250a000-8c63-11e9-87e1-9daa0021c281)

![test1](https://media.github.ibm.com/user/220770/files/cae1f380-8c62-11e9-9d2a-fa5eee4a6dbd)

Step 4: Create GCP Topic and Subscription

![test1 jpg](https://media.github.ibm.com/user/220770/files/25c81a80-8c64-11e9-80fa-a9793126eb72)

![test1](https://media.github.ibm.com/user/220770/files/3b3d4480-8c64-11e9-8e25-4cc0c73e7809)

### Step 4: Create Lambda Function

Prerequisite: Create a Lambda execution role. This will grant permission to publish into SNS. Follow only step 2 of this link: 
You should have AWS CLI installed for this and aws configure command run(If you want to do from CLI else you can do from Console as well)
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.Lambda.Tutorial.html
In role-policy.json only this part is relevant for our case, but you can mention all. This allows Lambda function to publish on all SNS topics.

{
            "Effect": "Allow",
            "Action": [
                "sns:Publish"
            ],
            "Resource": [
                "*"
            ]
        }

Generate key to use in Lambda Function for Encryption
This can be any key of length- 64 or 32 or even 16

Lambda Function code: https://github.ibm.com/ardlal12/AWS/blob/master/SNSLambda.js

### Step 5:Create Cloud Function in Google

It will have two files

index.js: https://github.ibm.com/ardlal12/AWS/blob/master/index.js

package.json: https://github.ibm.com/ardlal12/AWS/blob/master/package.json

### Step 6: Create SNS Subscriber

The HTTPS subscriber is the Cloud Function 

![test1](https://media.github.ibm.com/user/220770/files/9e7ba680-8c65-11e9-9bb3-90064d277fea)

### Step 7: Create Tables and Load Data

Use these scripts:
https://github.ibm.com/ardlal12/AWS/blob/master/schema.sql

https://github.ibm.com/ardlal12/AWS/blob/master/data.sql

### Step 8: Create Procedure and Trigger

Trigger is bound to the Insert operation on owners table and it will trigger the Procedure which in turn will trigger the Lambda function

Code: https://github.ibm.com/ardlal12/AWS/blob/master/ProcAndTrigger.txt


## Testing and Results

Fired an Insert query from My SQL 

![test1](https://media.github.ibm.com/user/220770/files/6aa18080-8c67-11e9-8f8a-e408f2da691c)

insert into Customer_Feedback (id,customer_name, customer_feedback) 
VALUES (20,'ArdhMart', 'Our AWS Aurora POC!');

#### Output Result in Pub Sub:

![test1](https://media.github.ibm.com/user/220770/files/89077c00-8c67-11e9-8782-ccafc8b38d4a)





