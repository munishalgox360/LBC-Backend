const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
import Twilio from 'twilio';
const twilio = Twilio(accountSID,authToken);


const SendSMS = async (credential) => {
    try {
        const sendResp  = await twilio.messages.create({
            from : credential.sender, 
            to : credential.mobile,
            body : credential.body
        });
        return sendResp ? true : false;
    } catch (error) {
        console.log("Error during Send Message :- ", error);
    }
};

const ValidateMobNumber = async (credential) => {
    try {
        const number = `${credential.countryCode}${credential.mobile}`;
        const validateResp = await twilio.lookups.v2.phoneNumbers(number).fetch();
        return validateResp.valid ? true : false;
    } catch (error) {
        console.log("Error during validate Mobile Number :- ", error);
    }
}

export { SendSMS, ValidateMobNumber };