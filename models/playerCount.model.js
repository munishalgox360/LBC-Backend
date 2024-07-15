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
    players : [
        {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    ]
});


const CountPlayerModel = new mongoose.model("CountPlayer", countPlayerSchema);
export default CountPlayerModel;