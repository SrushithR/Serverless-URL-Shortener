const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = (event, context, callback) => {
  console.log("Input to the lambda function", event);
  const { shortURL, longURL } = event;
  return dynamodb
    .putItem({
      TableName: "URL-Shortener",
      Item: {
        shortId: { S: shortURL },
        longURL: { S: longURL },
        owner: { S: "owner" }
      }
    })
    .promise()
    .then(data => {
      console.log("response post create", data);
      return "Successfully created shortURL";
    })
    .catch(err => {
      console.error("error", err);
      return err;
    });
};
