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
                position : absolute; height :200px; width :250px; top : 25%; left : 47%; 
                transform : translate(-50%,-50%); text-align : center; font-size:14px; font-family:arial;
            }
            img{
            	height :100px; width : 100px;
            }
        </style>
        </head>
        <body>
        <div id="verify">
        	<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu-up1VYN27Qrvhf0MJ4FRq-GUyiwk0JAuXdIXo1tBzCShyt8sY7wk-FZz2Cq-sgDUtM&usqp=CAU">
            <p> ${user.firstName}, Please Verify Your Account </p>
            <a href="http://localhost:3000/api/auth/verifyUserAccount/${user._id}"> 
                Verify Account 
            </a>
        </div> 
        </body>
        `
    )       
                
    user.page = page;
    user.subject = "Account Verification";//subject
    const sendResp = await SendEmail(user);
    return sendResp;
};


export default VerifyAccountSES;