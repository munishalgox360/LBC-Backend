import CreateNewOTP from '../utilities/otp.utility.js';
import { SendSMS } from '../utilities/sms.utility.js';

const NewSMS = async (user) => {
    const otp = await CreateNewOTP(6); //OTP
    
    const credential = {
        sender : process.env.TWILIO_PHONE_NUMBER,
        recipent : `${user.countryCode}${user.mobile}`,
        body : `Hi! ${user.firstName} this is your login OTP ${otp}`
    };  

    const sendResp = await SendSMS(credential);
    return sendResp;
};

export default NewSMS;