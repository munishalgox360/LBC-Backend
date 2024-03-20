import SendEmail from "../utilities/ses.utility.js";


const VerifyAccountSES = async (user) => {
    
    const page =  (
        `<!DOCTYPE html>
        <html>
        <head>
        <title>Page Title</title>
        <style>
            a{
                height:20px; width:100px; font-size:15px; color:white; background-color:#2980b9; 
                padding:5px 10px; text-decoration:none; font-family:arial; 
            }
            #verify{
                position : absolute; height :100px; width :250px; top : 25%; left : 45%; 
                transform : translate(-50%,-50%); text-align : center; font-size:18px; font-family:arial;
            }
        </style>
        </head>
        <body>
        <div id="verify">
            <p> ${user.firstName} Verify Your Account </p>
            <a href="http://localhost:3000/api/auth/verifyUserAccount/${user._id}"> 
                Verify Account 
            </a>
        </div> 
        </body>
        </html>
        `
    )       
                
    user.page = page;
    user.subject = "Account Verification";//subject
    const sendResp = await SendEmail(user);
    return sendResp;
};


export default VerifyAccountSES;