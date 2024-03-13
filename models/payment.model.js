import mongoose from "mongoose";

//@ Schema for Payments
const PaymentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    // amount : {
    //     type : Number,
    //     require : true
    // },
    // currencyUnit : {
    //     type : String,
    //     trim : true,
    //     required : true
    // },
    // status : {
    //     type : String,
    //     trim : true,
    //     enum : ['Deposit', 'Withdrawl']
    // },
    razorpay_payment_id : {
        type : String,
        trim : true,
        require : true
    },
    razorpay_order_id : {
        type : String,
        trim : true,
        require : true
    },
    razorpay_signature : {
        type : String,
        trim : true,
        require : true
    }
},{ timestamps : true });

//Derive Model from Payment Schema
const PaymentModel = new mongoose.model('payment',PaymentSchema);
export default PaymentModel;
