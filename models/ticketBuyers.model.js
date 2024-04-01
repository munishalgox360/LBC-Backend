import mongoose from "mongoose";


//@ Schema for Ticket's Buyers
const TicketBuyersSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    ticketId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ticket",
        required : true
    }
});

// Derive Model from Ticket Buyer's Schema
const TicketBuyersModel = new mongoose.model("TicketBuyers", TicketBuyersSchema);
export default TicketBuyersModel;