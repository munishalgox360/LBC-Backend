import { SendSMS } from '../utilities/sms.utility.js';

const Whatsapp = async (user) => {
        
    const credential = {
        sender : `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        recipent : `whatsapp:${user.countryCode}${user.mobile}`,
        body : `Hi! ${user.firstName} This is Testing Whatsapp Msg`
    };  

    const sendResp = await SendSMS(credential);
    return sendResp;
};

export default Whatsapp;