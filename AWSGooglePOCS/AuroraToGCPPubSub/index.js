'use strict';

// We use the https library to confirm the SNS subscription
const https = require('https');
// import the Google Cloud Pubsub client library
const PubSub = require('@google-cloud/pubsub');

// the sns-validator package verifies the host an signature of SNS messages
var MessageValidator = require('sns-validator');
var validator = new MessageValidator();
validator.encoding='utf-8';
// our pubsub client
const pubsub = PubSub();

// the cloud pubsub topic we will publish messages to
const topicName = 'mycilialnetworktopic';
const topic = pubsub.topic(topicName);

const expectedTopicArn = 'arn:aws:sns:us-east-1:478054140975:aurora-sns';

/**
 * Cloud Function.
 *
 * @param {req} request The web request from SNS.
 * @param {res} The response returned from this function.
 */
exports.receiveNotification = function receiveNotification (req, res) {
  // we only respond to POST method HTTP requests
  if (req.method !== 'POST') {
    res.status(405).end('only post method accepted');
    return;
  }

  // all valid SNS requests should have this header
  var snsHeader = req.get('x-amz-sns-message-type');
  if (snsHeader === undefined) {
    console.log('1');
    res.status(403).end('invalid SNS message');
    return;
  }

  // use the sns-validator library to verify signature
  // we first parse the cloud function body into a javascript object
  validator.validate(JSON.parse(req.body), function (err, message) {
    if (err) {
      // the message did not validate
      console.log('2');
      console.log(err);
      res.status(403).end('invalid SNS message');
      return;
    }
    if (message.TopicArn !== expectedTopicArn) {
      // we got a request from a topic we were not expecting to
      // this sample is set up to only receive from one specified SNS topic
      // one could adapt this to accept an array, but if you do not check
      // the origin of the message, anyone could end up publishing to your
      // cloud function
      console.log('3');
      res.status(403).end('invalid SNS Topic');
      return;
    }

    // here we handle either a request to confirm subscription, or a new
    // message
    switch (message.Type.toLowerCase()) {
      case 'subscriptionconfirmation':
        console.log('confirming subscription ' + message.SubscribeURL);
        // SNS subscriptions are confirmed by requesting the special URL sent
        // by the service as a confirmation
        https.get(message.SubscribeURL, (subRes) => {
          console.log('statusCode:', subRes.statusCode);
          console.log('headers:', subRes.headers);

          subRes.on('data', (d) => {
            console.log(d);
            res.status(200).end('ok');
          });
        }).on('error', (e) => {
          console.error(e);
          res.status(500).end('confirmation failed');
        });
        break;
      case 'notification':
        // this is a regular SNS notice, we relay to Pubsub
        console.log(message.MessageId + ': ' + message.Message);

        const attributes = {
          snsMessageId: message.MessageId,
          snsSubject: message.Subject
        };

        var msgData = Buffer.from(message.Message);
		var crypto = require('crypto')
          , key = 'acfda090447a44daf9e68d43b5f4a9c52bfebae74de783dda799edf442ca8746'
          , cipher = crypto.createCipher('aes-256-cbc', key)
          , decipher = crypto.createDecipher('aes-256-cbc', key);
        var datum =JSON.parse(message.Message);
        console.log(datum.id);
		var decrypted = decipher.update(datum.id, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
		console.error(decrypted);
        datum.id=decrypted;
        var msgData = Buffer.from(JSON.stringify(datum));
        topic.publisher().publish(msgData, attributes).then(function (results) {
          console.log('message published ' + results[0]);
          res.status(200).end('ok');
        });
        break;
      default:
        console.error('should not have gotten to default block');
        res.status(400).end('invalid SNS message');
    }
  });
};


