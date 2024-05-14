import UserModel from "../models/user.model.js";
import { ObjectId } from "mongodb";

const IncreaseAmount = async (credential, res) => {
    
    const userId = new ObjectId(credential.userId);
    const amount = credential.amount;
    
    try {
        const increaseResp = await UserModel.findByIdAndUpdate(
            { _id : userId }, 
            { $inc : { amount : Number(amount) } }
        );    
    
        return (increaseResp) ? true : false;
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const DecreaseAmount = async (credential, res) => {

    const userId = new ObjectId(credential.userId);
    const amount = credential.amount;
    const User = await UserModel.findById({ _id : userId });

    if(User.amount < amount){
        return res.status(200).json({ status : 401, message : "Inshufficent Balance" });
    }
    
    try {
        const decreaseResp = await UserModel.findByIdAndUpdate(
            { _id : userId }, 
            { $inc : { amount : -Number(amount) }},
            { new : true }
        ); 
        
        return (decreaseResp) ? true : false;
   } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
   }
};


export { IncreaseAmount, DecreaseAmount };

