import { response } from "express";
import {  IncreaseAmount, DecreaseAmount } from "../utilities/amount.utility.js";
import message from "../config/message.js";
import UserModel from "../models/user.model.js";


const SpinWheel = async (req, res) => {
    const userId = req.userId;
    const amount = req.query.amount;

    try {
        const useramount = await UserModel.findById({ _id : userId });
        
        if(useramount.amount < Number(amount)){
            return res.status(200).json({ status : 401, message : "Inshufficent Balance" });
        }

        const response = await DecreaseAmount({ userId : userId, amount : amount }, res);
        if(response){
            res.status(200).json({ status : 200, message : "Success" });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
}



const WinningAmount = async (req, res) => {
    const userId = req.userId;
    const winAmount = req.query.winamount;

    try {
        const user = await UserModel.findById({ _id : userId });
        if(!user){
            return res.status(200).json({ status : 401, message : message.read_f });
        }

        const response = await IncreaseAmount({ userId : userId, amount : winAmount }, res);
        if(response){
            res.status(200).json({ status : 200, message : "Success" });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
}

export { SpinWheel, WinningAmount };