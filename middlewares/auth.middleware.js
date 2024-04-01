import JWT from 'jsonwebtoken';
import message from '../config/message.js';
import UserModel from '../models/user.model.js';


const accessToken = async (user, res) => {
    try {
        const payload = {
            id : user._id,
            name : user.firstName
        }
        const options = {
            expiresIn : '1d',
            issuer : "IBC-e-Wallet"
        }
        const secretKey = process.env.JWT_SECRETKEY;

        const userData = await UserModel.findById({ _id : user._id });

        if(userData.verify){
            const token = JWT.sign(payload,secretKey,options);
            if(token) return token;
            else res.status(200).json({status : 401, message : message.token_err});   
        }else{
            return false;
        }
    } catch (error) {
        res.status(400).json({status : 400, response : error.stack, message : error.message, result : message.token_err });
    }
};


const verifyToken = async (req, res, next) => {
    try{
        const headerBearer = req.headers.authorization;
        if(!headerBearer) return res.status(200).json({status : 401, message : message.token }); 
        const token = headerBearer.split(" ")[1];
        const decode = JWT.verify(token,process.env.JWT_SECRETKEY);
        // Fetch User
        const user = await UserModel.findById({ _id : decode.id });
        if(user.verify){
            req.userId = user._id;
            next();
        }else{
            return res.status(200).json({ status : 401, message : message.verify_f });
        }
    }catch(error){
        res.status(400).json({ status : 400, response : error.message, message : message.auth_f });
    }
};


export { accessToken, verifyToken };