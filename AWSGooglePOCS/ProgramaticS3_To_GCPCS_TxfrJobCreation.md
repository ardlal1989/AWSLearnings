# Programmatic S3 to GCP Cloud Storage Txfr Job Creation
We will try to create a transfer job responsible to sync S3 bucket with GCP bucket using java program on eclipse IDE.The code can be exported as FAT jar which can be used by On Prem Applications to create a transfer job.

#### Pre- requisite :
- User must have account in Google Cloud and Amazon S3
- User must have created a source S3 bucket and sink GCP cloud storage bucket. 
- Java version must be >= 1.8
- All the required dependency jars must be downloaded from <a href="https://github.com/mart3051/stss3-gcp.git">here</a>.
- Access key and Secret access Key of a user having `S3FullAccess` must be handy

## Steps :

###  Enabling authentication mechanism:
Java program connects to Google with the help of Google Storage Transfer Client API, which needs private key from service account having appropriate access to create transfer job at Google end. Following steps will help in configuring the same.

- Login to Google Cloud .
- From Navigation menu select `IAM and Admin` .
- Select `Service Accounts` .
- Click on `Create Service Account` to add a new service account .
- Provide a valid service account name and desrciption and click on create .
- From the list of role select `Storage Transfer Admin` role .
- Click on `Continue`.
- Click on `Create Key` and export the key as JSON .
- Keep the key in some location and take a note of the qualified path of the key. Let that be X where `X` may be e.g `C:\ABCUser\KeyLocation\mykey.json`

###  Setting up the code:
- Download the code repository from <a href="https://github.com/mart3051/stss3-gcp.git"> here</a>
- Update the `projectId` ,`awsSourceBucket `,`gcsSinkBucket`,`awsAccessKeyId`,`awsSecretAccessKey`,  in `AwsRequester.java` with your  respective details
- Add the downloaded jars in the class path dependencies
- Click on `AwsRequester.java` and click on `Run Configuration`
- In the environment variable tab create a new Environment Variable 
- Name it as GOOGLE_APPLICATION_CREDENTIALS
- Put the value as `X` which you already have taken a note of in previous step
- In command line argument two values must be provided first will correspond to start date and 2nd will correspond to start time these must be in UTC values and the format of it would be `YYYY-MM-DD` and `HH:MM:SS` respectively
- Apply and Run

###  Testing :
- If succesfull the program will create a transfer job and will return its details in JSON format 
- Go to the Cloud Storage Tab and check transfer jobs a transfer job must be present with the details provided in the program
- At the scheduled date and time provided in the java file the transfer job will get executed and S3 bucket will be sinked to GCP bucket.


##### Note:
If a FAT jar is made and that is to be used to create tranfer job. Prior to executing the jar set the **GOOGLE_APPLICATION_CREDENTIALS** by executing `set GOOGLE_APPLICATION_CREDENTIALS=<<path to the exported json>>`
eg : `set GOOGLE_APPLICATION_CREDENTIALS=C:\OAthT\token.json`
