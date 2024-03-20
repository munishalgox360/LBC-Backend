import SendEmail from "../utilities/ses.utility.js";

const PaymentInvoiceSES = async (user) => {
    const page = (
       `<!DOCTYPE html>
       <html>
       <head>
       <title>Page Title</title>
       <style>
           #wrapper{
               position : absolute; height :auto; width :auto; top : 45%; left : 45%; 
               transform : translate(-50%,-50%); font-family:arial;
               box-shadow : 0px 0px 3px gray; align-item : center;
           }
           #header{
               border-bottom : 1px gray solid; padding : 10px 20px; background-color : #dff9fb; font-size:20px;text-align : center;
           }
           #detail, #table{ padding : 10px 20px; font-size:15px; }
       </style>
       </head>
       <body>
           <div id="wrapper">
               <div id="header"> 
                   YOUR ACCOUNT DETAIL
               </div>
               <div id="detail">
                   Hi, ${user.firstName} <br>
                   I hope you're haveing a great day, We are sending you the Account Details below:- 
               </div>
               <div id="table">
                <table>
                    <tr>
                        <td> First Name : </td>	<td> ${user.firstName} </td>
                    </tr>
                    <tr>
                        <td> Last Name : </td>	<td> ${user.lastName} </td>
                    </tr>
                    <tr>
                        <td> Email : </td>	<td> ${user.email} </td>
                    </tr>
                <table>
             </div>
           </div> 
       </body>
       </html>       
       `
    );

    user.page = page;
    user.subject = "Invoice";//subject
    const sendResp = await SendEmail(user);
    return sendResp;
};

export default PaymentInvoiceSES;