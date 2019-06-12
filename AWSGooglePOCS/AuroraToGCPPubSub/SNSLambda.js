'use strict';
var AWS = require("aws-sdk");
var sns = new AWS.SNS();
exports.handler = (event, context, callback) => {
    // TODO implement
    var id=event.id;
    var crypto = require('crypto')
  , key = 'acfda090447a44daf9e68d43b5f4a9c52bfebae74de783dda799edf442ca8746'
  , cipher = crypto.createCipher('aes-256-cbc', key)
  , decipher = crypto.createDecipher('aes-256-cbc', key);
    var encryptedId = cipher.update(id, 'utf8', 'base64');
    encryptedId += cipher.final('base64');
    //Decryption code
    var decryptedId = decipher.update(encryptedId, 'base64', 'utf8');
    decryptedId += decipher.final('utf8');
    //Decryption code
    var json=JSON.stringify({ 
             "id" : encryptedId, 
             "fname" : event.fname,
             "lname" : event.lname,
             "address" : event.address,
             "city" : event.city,
             "telephone" : event.telephone
           });
	var params = {Subject: 'Report for Employee Id: ' + id,
                Message: json,
                TopicArn: 'arn:aws:sns:us-east-1:478054140975:aurora-sns'
            };
			sns.publish(params, function(err, data) {
                if (err) {
                    console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                }
            });
};

