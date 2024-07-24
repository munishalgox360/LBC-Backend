import mongoose from "mongoose";
import { Schema } from "mongoose";


const countPlayerSchema = new mongoose.Schema({
    ticket : {
        type : Schema.Types.ObjectId,
        ref : "Ticket"
    },
    slotTime : {
        type : String,
        trim : true,
        default : "slot"
    },
    month : {
        type : String,
        trim : true,
        required : true
    },
    date : {
        type : Number,
        trim : true,
        required : true
    },
    players : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ]
});


const CountPlayerModel = new mongoose.model("CountPlayer", countPlayerSchema);
export default CountPlayerModel;