import AWS from "@aws-sdk/client-ses";

const AWS_CONFIG = {
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
    region : process.env.AWS_REGION
}

const AWS_SES = new AWS.SES(AWS_CONFIG);


const SendEmail = async (user, res) => {
    
    const link = `<br>
    <a href="http://localhost:3000/api/auth/verifyUserAccount/${user._id}" 
       style="  height:30px; width:100px; font-size:15px; 
                color:white; background-color:#2980b9; padding : 5px 10px; 
                text-decoration:none; font-family:arial; margin-left : 100px;"> 
                Verify Account </a>
    <br>`;

    var params = {
        Source: process.env.AWS_SES_SENDER,
        Destination: {
          ToAddresses: [user.email]
        },
        Message: {
          Subject: {
            Charset: "UTF-8",
            Data: `${user.firstName} Verify Your Account`
          },
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: link
            },
            Text: {
              Charset: "UTF-8",
              Data: "Please verify you account, click on button"
            }
          }
        }
    };

    try {
        const sendResp = await AWS_SES.sendEmail(params).promise();
        if(sendResp){
            console.log("Email Send Successfuly",sendResp);
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};

export default SendEmail;