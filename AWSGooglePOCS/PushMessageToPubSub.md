# Pushing Message to Google Pub/Sub Topic Programmatically

We will try to push a message to Google Pub/Sub Topic using java program using eclipse IDE.The code can be exported as FAT jar which can be used by On Prem Applications to Push the message to Pub/Sub topic using same techniques.

#### Pre- requisite :
- User must have account in Google Cloud and Pub/Sub API must be enabled
- User must have created a Pub/Sub Topic  and corresponding subscriber in the current google project
- Java version must be >= 1.8
- Google Cloud Tools for Eclipse must be <a href="https://cloud.google.com/eclipse/docs/quickstart">installed</a> in Eclipse
- gcloud must be present on the system and configured with the current project 

## Steps :

###  Enabling authentication mechanism:
Java program connects to Google Pub/Sub with the help of Google Cloud Client API, which needs private key from service account having appropriate access to push messages in Google Pub Sub. Following steps will help in configuring the same.

- Login to Google Cloud .
- From Navigation menu select `IAM and Admin` .
- Select `Service Accounts` .
- Click on `Create Service Account` to add a new service account .
- Provide a valid service account name and desrciption and click on create .
- From the list of role select `Pub/Sub Publisher` role .
- Click on `Continue`.
- Click on `Create Key` and export the key as JSON .
- Keep the key in some location and take a note of the qualified path of the key. Let that be X where `X` may be e.g `C:\\ABCUser\KeyLocation\mykey.json`

###  Setting up the code:
- Download the code repository from <a href="https://github.com/mart3051/PushToPubSub.git"> here</a>
- Update the `topicId` in `CreateTopicAndPublishMessages.java` with the
- Google Cloud Tools for Eclipse will take some time to configure the required libraries
- Click on CreateTopicAndPunlishMessage.java and click on `Run Configuration`
- In the environment variable tab create a new Environment Variable 
- Name it as GOOGLE_APPLICATION_CREDENTIALS
- Put the value as `X` which you already have taken a note of in previous step
- Put a random value in command line which will be treated as ID in the JSON message to be published to Pub/Sub
- Apply and Run

###  Testing :
- If post displaying the JSON message a numeric id is printed on the console, the program is successful in publishing the message to    Pub\Sub.
- From command line type `gcloud pubsub suscriptions pull <<subscriberName>> --auto-ack` .
- The last pulled message must be pulled and displayed by the gcloud utility.


##### Note:
If a FAT jar is made and that is to be used to push message to Pub/Sub topic. Prior to executing the jar set the **GOOGLE_APPLICATION_CREDENTIALS** by executing `set GOOGLE_APPLICATION_CREDENTIALS=<<path to the exported json>>`
eg : `set GOOGLE_APPLICATION_CREDENTIALS=C:\OAthT\token.json`
