import mongoose from "mongoose";

const connectDB = async(req,res) => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected !! DB HOST", `${connectionInstance.connection.host}`);    
    }catch(err){
        console.log("MongoDB Connection Failed !!", err);
    }
};

export default  connectDB;