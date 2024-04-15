import mongoose from "mongoose";

//@ Schema for Ticket Categories
const TicketSchema = new mongoose.Schema({
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    active : {
        type : Boolean,
        default : true
    }
},{ timestamps : true });

// Derive Model from Ticket Schema
const TicketModel = new mongoose.model("Ticket", TicketSchema);
export default TicketModel;




