const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const Number = process.env.TWILIO_PHONE_NUMBER;
import Twilio from 'twilio';
const twilio = Twilio(accountSID,authToken);


const SendSMS = async (credential) => {
    try {
        const sendResp  = await twilio.messages.create({
            body : `${credential.name} Your Login OTP : ${credential.otp}`,
            from : Number, to : credential.mobile
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