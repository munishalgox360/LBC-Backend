import JWT from 'jsonwebtoken';
import message from '../config/message.js';
import UserModel from '../models/user.model.js';


const accessToken = async (user,res) => {
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
        const token = JWT.sign(payload,secretKey,options);
        
        if(token) return token;
        else res.status(200).json({status : 401, message : message.token_err});
    } catch (error) {
        res.status(400).json({status : 400, response : error.stack, message : error.message, result : message.token_err });
    }
};


const verifyToken = async (req,res,next) => {
    try{
        const headerBearer = req.headers.authorization;
        if(!headerBearer) return res.status(200).json({status : 401, message : message.token }); 
        const token = headerBearer.split(" ")[1];
        const user = JWT.verify(token,process.env.JWT_SECRETKEY);
        if(user) req.userId = user.id;
        next();
    }catch(error){
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};

export { accessToken, verifyToken };