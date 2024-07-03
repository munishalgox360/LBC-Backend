import mongoose from "mongoose";

//Database Connection
const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(process.env.MONGO_LIVE_URL);
        console.log("MongoDB Connected !! DB HOST", `${connectionInstance.connection.host}`);    
    }catch(err){
        console.log("MongoDB Connection Failed !!", err);
    }
};
connectDB();
export default connectDB;
