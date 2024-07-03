import mongoose from "mongoose";

//@ Schema for Payments
const PaymentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    currencyUnit : {
        type : String,
        trim : true,
        required : true
    },
    paymentMethod : {
        type : String,
        trim : true,
        required : true
    },
    paymentStatus : {
        type : String,
        trim : true,
        required : true
    },
    paymentId : {
        type : String,
        trim : true,
        required : true
    },
    orderId : {
        type : String,
        trim : true,
        required : true
    },
    paymentType : {
        type : String,
        trim : true,
        required : true,
        default : "Deposit"
    }
},{ timestamps : true });

//Derive Model from Payment Schema
const PaymentModel = new mongoose.model('Payment',PaymentSchema);
export default PaymentModel;