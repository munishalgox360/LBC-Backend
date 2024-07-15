import mongoose from "mongoose";


//@ Schema for Ticket's Buyers
const TicketNumberSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    ticketId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ticket",
        required : true
    },
    ticketNumber : {
        type : Number,
        required : true
    },
    slotTime : {
        type : String,
        trim : true,
        required : true
    }
},{ timestamps : true });

// Derive Model from Ticket Buyer's Schema
const TicketNumberModel = new mongoose.model("TicketNumber", TicketNumberSchema);
export default TicketNumberModel;