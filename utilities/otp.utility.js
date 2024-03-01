import OTP from 'otp-generator';

// -------------------------------- //
const CreateNewOTP = async (length) => {
    const newOTP = OTP.generate(length,{ upperCaseAlphabets : false, lowerCaseAlphabets : false, specialChars : false, digits : true });
    return newOTP;
}

export default CreateNewOTP;