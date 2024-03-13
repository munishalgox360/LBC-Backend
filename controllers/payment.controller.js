import PaymentModel from "../models/payment.model.js";
import PAYMENT from "../utilities/payment.utility.js";
import message from "../config/message.js";

// -------------- Payment's Handler ---------------

const GetTestKey = async (req,res) => {
    try {
        res.status(200).json({ paymentKey : process.env.RAZORPAY_KEY_ID , message : message.key_m });
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const CreateOrder = async (req, res) => {
    const amount = req.body.amount;
    try {
        const options = {
            amount: Number(amount) * 100,  
            currency: "INR"
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


const VerifyPayment = async (req,res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    req.body.userId = new Object(req.userId);
    try {
        const genSign = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET);
        if(genSign === razorpay_signature){
            const createResp = await PaymentModel.create(req.body);
            if(createResp){
                return res.status(200).json({ status : 201, response : createResp, message : message.create_s });
            }else{
                return res.status(200).json({ status : 401, response : createResp, message : message.create_f });
            }
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};

export { GetTestKey, CreateOrder, VerifyPayment };
