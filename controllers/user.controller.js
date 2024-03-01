import message from "../config/message.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// ------------ User's Handlers ------------- //
const RegisterUser = async (req, res) => {
  const data = req.body;
  try {
    const UserExist = await UserModel.findOne({ userName: data.userName });
    const EmailExist = await UserModel.findOne({ email: data.email });

    if (UserExist) {
      return res.status(200).json({ status: 200, message: message.exist_u });
    } else if (EmailExist) {
      return res.status(200).json({ status: 200, message: message.exist_e });
    } else {
      //Password Hashing
      const hashedPassword = await bcrypt.hash(data.password, 12);
      const CreatePayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        countryCode: data.countryCode,
        mobile: data.mobile,
        country: data.country,
        pincode: data.pincode,
        userName: data.userName,
        password: hashedPassword,
      };
      const CreateResponse = await UserModel.create(CreatePayload);
      if (CreateResponse) {
        return res.status(200).json({ status: 201, response: CreateResponse, message: message.create_s });
      } else {
        return res.status(200).json({ status: 401, response: CreateResponse, message: message.create_f });
      }
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
      GetResponse = await UserModel.findById(userId);
    } else {
      GetResponse = await UserModel.find();
    }

    if (GetResponse) {
      return res
        .status(200)
        .json({ status: 201, response: GetResponse, message: message.fetch_s });
    } else {
      return res
        .status(200)
        .json({ status: 401, response: GetResponse, message: message.fetch_f });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, response: error.stack, message: error.message });
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
    const UpdateResponse = await UserModel.findByIdAndUpdate(
      userId,
      UpdatePayload,
      { new: true }
    );
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
