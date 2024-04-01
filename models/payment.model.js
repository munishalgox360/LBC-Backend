import mongoose from "mongoose";

//@ Schema for Payments
const PaymentSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    amount : {
        type : Number,
        require : true
    },
    currencyUnit : {
        type : String,
        trim : true,
        require : true
    },
    paymentMethod : {
        type : String,
        trim : true,
        require : true
    },
    paymentStatus : {
        type : String,
        trim : true,
        require : true
    },
    paymentId : {
        type : String,
        trim : true,
        require : true
    },
    orderId : {
        type : String,
        trim : true,
        require : true
    },
    paymentType : {
        type : String,
        trim : true,
        required : true,
        default : "Deposit"
    }
},{ timestamps : true });

//Derive Model from Payment Schema
const PaymentModel = new mongoose.model('payment',PaymentSchema);
export default PaymentModel;