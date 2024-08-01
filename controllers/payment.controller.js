import PaymentModel from "../models/payment.model.js";
import PAYMENT from "../utilities/payment.utility.js";
import { IncreaseAmount, DecreaseAmount } from "../utilities/amount.utility.js";
import message from "../config/message.js";
import crypto from 'crypto';
import { ObjectId } from "mongodb";
import PaymentInvoiceSES from "../templates/payment.template.js";
import UserModel from "../models/user.model.js";


// -------------- Payment's Controllers ---------------

const CreateOrder = async (req, res) => {
    const amount = req.body.amount;

    try {
        const user = await UserModel.findById({ _id : req.userId });
        if(!user){
            return res.status(200).json({ status : 401, message : message.read_f });
        }

        const options = {
            amount: Number(amount) * 100,  
            currency: "INR",
            customer_id : user.customerId
        };

        const createResp = await PAYMENT.orders.create(options);
        if(createResp){
           return res.status(200).json({ status : 201, response : createResp, message : message.create_s });
        }else{
           return res.status(200).json({ status : 401, response : createResp, message : message.create_f });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const DepositMoney = async (req, res) => {

    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const userId = new ObjectId(req.userId);
    const keys = razorpay_order_id + "|" + razorpay_payment_id;
    
    try {
        const genSign = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(keys.toString()).digest('hex');
        if(genSign === razorpay_signature){
            const detail = await PAYMENT.payments.fetch(razorpay_payment_id);
            console.log(detail,"88");

            const amount = detail.amount/100;
            console.log(amount);
            
            const createPayload = {
                userId : userId,
                amount : amount,
                currencyUnit : detail.currency,
                paymentMethod : detail.method,
                paymentStatus : detail.status,
                paymentId : razorpay_payment_id,
                orderId : razorpay_order_id
            } 

            let createResp = await PaymentModel.create(createPayload);
            if(createResp){
                await IncreaseAmount({ userId : userId, amount : detail.amount }, res);
                // const resp = await PaymentInvoiceSES(createResp);
                // if(resp)
                return res.status(200).json({ status : 201, message : "Valid Transaction" });
            }else{
                return res.status(200).json({ status : 401, message : "Invalid Transaction" });
            }
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const WithdrawalMoney = async (req, res) => {
    
    const amount = Number(req.body.withdrawlAmount);
    const userId = new Object(req.userId);

    try {
        const createPayload = {
                userId : userId,
                amount : detail.amount,
                // currencyUnit : detail.currency,
                // paymentMethod : detail.method,
                // paymentStatus : detail.status,
                // paymentId : razorpay_payment_id,
                // orderId : razorpay_order_id
                paymentType : "Withdrawal"
        };
        
        const createResp = await PaymentModel.create(createPayload);
        if(!createResp) return res.status(200).json({ status : 401, message : message.create_f });
              
        if(createResp){
            await DecreaseAmount({ userId : userId, amount : amount }, res);
            return res.status(200).json({ status : 201, message : message.w_s });
        }else{
            return res.status(200).json({ status : 401,  message : message.w_f });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const ReadTransaction = async (req, res) => {

    let getResp;
    const userId = new ObjectId(req.query.userId);
    const page = Number(req.query.page);
    const filter = { $or: [ { userId : userId }, { $and : [ 
                                { createdAt : { $gte : new Date(req.query.startDate).toISOString() }}, 
                                { createdAt :{ $lte : new Date(req.query.endDate).toISOString() }}
                            ]} 
                        ] 
                    };
                    
    try {
        if(req.query.startDate && req.query.endDate && userId){
            getResp = await PaymentModel.find(filter).skip((page - 1)*20).limit(20).sort({createdAt : -1});
        }else{
            getResp = await PaymentModel.find({ userId : userId }).skip((page - 1)*20).limit(20);
        }
        
        const pages = Math.ceil(Number(getResp.length)/20);
        const nextPage = (page < pages.length) ? ++page : null;
        // const prevPage = (page-- > 0) ? --page : null;

        if(getResp.length > 0){
            return res.status(200).json({ status : 201, response : getResp, message : message.read_s, pages : pages, nextPage : nextPage /*, prevPage : prevPage */});
        }else{
            return res.status(200).json({ status : 401, response : getResp, message : message.read_f });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


export { CreateOrder, DepositMoney, WithdrawalMoney, ReadTransaction };



// const date = new Date();
// startDate = date.toISOString(date.setDate(25)));
// const filter = { $and : [ {createdAt : { $gte : startDate}}, {createdAt :{ $lte : new Date(req.query.endDate) }}] };