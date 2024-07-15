import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    ticketId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ticket",
        required : true
    },
    slotTime : {
        type : String,
        trim : true,
        required : true
    },
    luckyNumber : Number
},{timestamps : true});


const ResultModel = new mongoose.model("Result", resultSchema);
export default ResultModel;