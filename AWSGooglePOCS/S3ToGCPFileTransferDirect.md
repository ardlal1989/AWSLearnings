# Amazon S3 to Google Cloud Storage File Transfer

## Use Case: 
Transferring files from AWS S3 to GCP Bucket


### Step 1: Create AWS S3 Bucket

![test1](https://media.github.ibm.com/user/220770/files/e4e30b00-8d22-11e9-9174-f109ad97a7b0)

![test1](https://media.github.ibm.com/user/220770/files/7733e080-8d1c-11e9-87d6-e93cd7fdb9b8)

Click on Next. Make it a private bucket, which is only accessible via the AWS Access key and Secret Key

![test1](https://media.github.ibm.com/user/220770/files/96327280-8d1c-11e9-9631-6e8c6e251f46)

![test1](https://media.github.ibm.com/user/220770/files/b2361400-8d1c-11e9-8fca-9c06973ed852)

Create Bucket

### Step 2: Create GCP Bucket   

![test1](https://media.github.ibm.com/user/220770/files/d98ce100-8d1c-11e9-95ee-9711bab96608)

![test1](https://media.github.ibm.com/user/220770/files/ec9fb100-8d1c-11e9-9846-bf77f0fc0140)

Click on Create

### Step 3: Create IAM Role with S3 Full Access

![test1](https://media.github.ibm.com/user/220770/files/69338f00-8d1f-11e9-9b54-de6907237975)

### Step 4: Create the Transfer Job

![test1](https://media.github.ibm.com/user/220770/files/903e9080-8d20-11e9-820d-2748e02551c1)

Give the source details. Give the Access Key and Secret Access Key of the IAM user which has S3 All Access

![test1](https://media.github.ibm.com/user/220770/files/1f4ba880-8d21-11e9-80ea-8f51789da965)

Give the target details

![test1](https://media.github.ibm.com/user/220770/files/44401b80-8d21-11e9-9672-8461c54852d0)

Configure Transfer

![test1](https://media.github.ibm.com/user/220770/files/5b7f0900-8d21-11e9-8ded-7626fe0a6496)

The transfer job is created

![test1](https://media.github.ibm.com/user/220770/files/bb75af80-8d21-11e9-80e4-02ea85e10154)

### Step 5: Keep the file in AWS S3

![test1](https://media.github.ibm.com/user/220770/files/dfd18c00-8d21-11e9-8c80-7e94829fb52a)

![test1](https://media.github.ibm.com/user/220770/files/f5df4c80-8d21-11e9-96e4-f1a4bbac815f)

Click on Next

![test1](https://media.github.ibm.com/user/220770/files/14454800-8d22-11e9-9223-b867200f636c)

Then upload

![test1](https://media.github.ibm.com/user/220770/files/27f0ae80-8d22-11e9-9d17-3f0222c813bd)

## Result

Transfer job is complete

![test1](https://media.github.ibm.com/user/220770/files/58d0e380-8d22-11e9-84a2-c4f2d38c8ec4)

File is successfully transferred to GCP Bucket

![test1](https://media.github.ibm.com/user/220770/files/6dad7700-8d22-11e9-8619-03afe11d5e00)





