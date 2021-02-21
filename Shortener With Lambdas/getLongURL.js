const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async event => {
  console.log("Input to the lambda function", event);
  const { shortURL } = event;
  return dynamodb
    .getItem({
      TableName: "shortener",
      Key: {
        shortId: { S: shortURL }
      }
    })
    .promise()
    .then(response => {
      console.log("response from DDB", response);
      return {
        statusCode: 302,
        headers: {
          Location: response.Item.longURL.S
        }
      };
    })
    .catch(err => {
      console.error("error while fetching data from DDB", err);
      return err;
    });
};
