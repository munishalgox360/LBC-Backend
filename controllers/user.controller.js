import message from "../config/message.js";
import UserModel from "../models/user.model.js";
import TicketNumberModel from '../models/ticketNumber.model.js';
import ResultModel from "../models/result.model.js";
import PAYMENT from "../utilities/payment.utility.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
// import { ValidateMobNumber } from "../utilities/sms.utility.js";
// import VerifyAccountSES from "../templates/verify.template.js";


// ------------ User's Controllers ------------- //

const RegisterUser = async (req, res) => {
  const data = req.body;
  
  try {
    const EmailExist = await UserModel.findOne({ email: data.email });
    const MobileExist = await UserModel.findOne({ mobile: data.mobile });

    if (EmailExist) {
      return res.status(200).json({ status: 401, message: message.exist_e });
    }  
     
    if (MobileExist) {
      return res.status(200).json({ status: 401, message: message.exist_mb });
    } 
      //Password Hashing
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const customerInfo = {
      name: `${data.firstName} ${data.lastName}`,
      contact: data.mobile,
      email: data.email,
      fail_existing: 0
    };
      
    const RzpCustomer = await PAYMENT.customers.create(customerInfo);

    const CreatePayload = {
      customerId : RzpCustomer.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      countryCode: data.countryCode,
      mobile: data.mobile,
      country: data.country,
      pincode: data.pincode,
      userName: data.userName,
      password: hashedPassword,
      isAdmin: data.isAdmin || false
    };

    const createResp = await UserModel.create(CreatePayload);
    if (!createResp) {
      return res.status(200).json({ status: 401, message: message.create_f });
    }

    if(createResp && RzpCustomer){
      return res.status(200).json({ status : 201, response : createResp, message : message.create_s });
    }
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const ReadUser = async (req, res) => {
  let userId = new ObjectId(req.query.userId);
  let GetResponse;
  try {
    if (req.query.userId) {
      GetResponse = await UserModel.findById({ _id: userId });
    } else {
      GetResponse = await UserModel.find();
    }

    if (GetResponse) {
      return res.status(200).json({ status: 201, response: GetResponse, message: message.read_s });
    } else {
      return res.status(200).json({ status: 401, response: GetResponse, message: message.read_f });
    }
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const UpdateUser = async (req, res) => {
  const data = req.body;
  const userId = new ObjectId(req.query.userId);

  try {
    const UpdatePayload = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    const UpdateResponse = await UserModel.findByIdAndUpdate({ _id: userId }, UpdatePayload, { new: true });

    if (UpdateResponse) {
      return res.status(200).json({ status: 201, response: UpdateResponse, message: message.update_s });
    } else {
      return res.status(200).json({ status: 401, response: UpdateResponse, message: message.update_f });
    }
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const DeleteUser = async (req, res) => {
  const userId = new ObjectId(req.query.userId);
  try {
    const DeleteResponse = await UserModel.findByIdAndDelete(userId);
    if (DeleteResponse) {
      return res.status(200).json({ status: 201, response: DeleteResponse, message: message.delete_s });
    } else {
      return res.status(200).json({ status: 401, response: DeleteResponse, message: message.delete_f });
    }
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


// Export User's Handlers
export { RegisterUser, ReadUser, UpdateUser, DeleteUser };
