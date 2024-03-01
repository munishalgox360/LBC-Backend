import message from '../config/message.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

import { accessToken } from '../middlewares/auth.middleware.js'
import CreateNewOTP from '../utilities/otp.utility.js';
// ------------ Authentication Handlers -------------- //

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
                return res.status(200).json({status : 201, response : isExist,token, message : message.login_s });
            }else{
                return res.status(200).json({status : 401, response : isExist, message : message.login_f });
            }
        }
       }else if(mobile){ // IInd Method
        const isExist =  await UserModel.findOne({ mobile : mobile });
        if(!isExist){
            res.status(200).json({status : 401, message : message.unf_mobile});
        }else{
            const NewOTP = await CreateNewOTP(4);
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


// Export Authentication's Handlers
export { UserLogin, UserLogout, UpdatePassword, ForgetPassword };
