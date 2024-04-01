import mongoose from "mongoose";

//@ Schema for Ticket Categories
const TicketCategoriesSchema = new mongoose.Schema({
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    price : {
        type : Number,
        trim : true,
        required : true
    },
    active : {
        type : Boolean,
        default : true
    }
},{ timestamps : true });

// Derive Model from Ticket Schema
const TicketModel = new mongoose.model("TicketCategories", TicketCategoriesSchema);
export default TicketModel;




