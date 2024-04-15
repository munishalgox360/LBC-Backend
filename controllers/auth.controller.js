import message from '../config/message.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { accessToken } from '../middlewares/auth.middleware.js'
import CookiesSession from '../utilities/cookie.utility.js';
import NewSMS from '../templates/sms.template.js';

// ------------ Authentication Controllers -------------- //

const UserLogin = async (req, res) => {
    const { email, password, mobile } = req.body;
    try {
       if(email && password && !mobile){ // Ist Method 
        const isExist = await UserModel.findOne({ email : email });
        if(!isExist){
            return res.status(200).json({ status : 401, message : message.unf_email });
        }else {
            const isSame = await bcrypt.compare(password, isExist.password);
            if(!isSame){
                return res.status(200).json({status : 401, message : message.password });
            }else if(isExist && isSame){
                const token = await accessToken(isExist);
                if(token){
                    // CookiesSession(isExist, token, message.login_s, res);
                    return res.status(200).json({ status : 201, response : isExist, token, message : message.login_s });
                }else{
                    return res.status(200).json({ status : 401, message : message.verify_f });
                }
            }else{
                return res.status(200).json({status : 401, response : isExist, message : message.login_f });
            }
        }
       }else if(mobile){ // IInd Method
        const isExist =  await UserModel.findOne({ mobile : mobile });
        if(!isExist){
            return res.status(200).json({status : 401, message : message.unf_mobile});
        }else{
            const SendOTP = await NewSMS(isExist);
            if(SendOTP){ //check
                const UpdateResp = await UserModel.findByIdAndUpdate({_id : new ObjectId(isExist._id)}, { $set : { loginOTP : otp }}, { new : true });
                if(UpdateResp){
                    return res.status(200).json({ status : 201, message : message.otp_s });
                }
            }else{
                return res.status(200).json({ status : 401, message : message.otp_f });
            }
        }
       }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const UserLogout = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const UpdatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = new ObjectId(req.userId);
    try {
        const isExist = await UserModel.findById({ _id : userId });
        if(isExist){
            const isSame = bcrypt.compare(oldPassword, isExist.password);
            if(!isSame){
                return res.status(200).json({status : 401, message : message.o_password });
            }else if(isExist && isSame){
                const hashedPassword = await bcrypt.hash(newPassword,12);
                const UpdateResponse = await UserModel.findByIdAndUpdate({ _id : userId }, { password : hashedPassword },{ new : true });
                if(UpdateResponse){
                    return res.status(200).json({status : 201, response : UpdateResponse, message : message.update_s});
                }else{
                    return res.status(200).json({status : 401, response : UpdateResponse, message : message.update_f});
                } 
            }else{
                return res.status(200).json({status : 401, message : message.read_f});
            }
        }else{
            return res.status(200).json({ status : 401, message : message.unf_mobile });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const ForgetPassword = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const VerifyOTP = async (req, res) => {
    const { mobile , otp } = req.body;
    try {
        const isUser = await UserModel.findOne({ mobile : Number(mobile) });
        if(!isUser){
            return res.status(200).json({ status : 401, message : message.read_f }); 
        }else if(Number(otp) !== Number(isUser.loginOTP)){
            res.status(200).json({ status : 401, message : message.inct_otp });
        }else{
            const token = await accessToken(isUser);
            if(token){
                isUser.loginOTP = 0; isUser.save();
                // CookiesSession(isUser, token, message.login_s, res);
                return res.status(200).json({ status : 201, response : isUser, token, message : message.login_s });
            }else{
                return res.status(200).json({ status : 401, message : message.verify_f });
            }
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const VerifyUserAccount = async (req, res) => {
    const userId = new ObjectId(req.params.userId);

    try {
        const verifyResp = await UserModel.findByIdAndUpdate({ _id : userId },{ verify : true }, { new : true });
        if(verifyResp){
            return res.status(200).json({ status : 201, response : verifyResp, message : message.verify_s });   
        }else{
            return res.status(200).json({ status : 401, response : verifyResp, message : message.verify_f });   
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
}


export { UserLogin, UserLogout, UpdatePassword, ForgetPassword, VerifyOTP, VerifyUserAccount };
