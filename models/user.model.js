import mongoose from "mongoose";

//@Schema for User
const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        required : true
    },
    lastName : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    mobile : {
        type : Number,
        trim : true,
        required : true
    },
    countryCode : {
        type : String,
        trim : true,
        required : true
    },
    country : {
        type : String,
        trim : true,
        required : true
    },
    pincode : {
        type : String,
        trim : true,
        required : true
    },
    userName : {
        type : String,
        trim : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    verify : {
        type : Boolean,
        default : false
    },
    loginOTP : Number
},{timestamps : true});


//Derive model from UserSchema
const UserModel = new mongoose.model('user',UserSchema);
export default UserModel;