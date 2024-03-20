import AWS from "@aws-sdk/client-ses";
import message from "../config/message.js";

const AWS_CONFIG = {
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    region : process.env.AWS_REGION
}

const AWS_SES = new AWS.SES(AWS_CONFIG);


const SendEmail = async (user, res) => {
    
    var params = {
        Source: process.env.AWS_SES_SENDER,
        Destination: {
          ToAddresses: [user.email]
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: user.subject
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: user.page
            }
          }
        }
    };

    try {
        const sendResp = await AWS_SES.sendEmail(params).promise();
        if(sendResp){
            console.log("Email Send Successfuly",sendResp);
            return true;
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};

export default SendEmail;