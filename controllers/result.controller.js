import TicketNumberModel from "../models/ticketNumber.model.js";
import ResultModel from "../models/result.model.js";
import message from "../config/message.js";


const Result = async (req, res) => {
  const ticketCategoryId = req.query.ticketCategoryId;

  try {
    const Number = await TicketNumberModel.find({ ticketId: ticketCategoryId });

    for (let i = Number.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = Number[i];
      Number[i] = Number[j];
      Number[j] = k;
    }

    const resultDeclared = await ResultModel.findOne({ ticketId: ticketCategoryId });
    if (resultDeclared) {
      return res.status(200).json({ status: 401, message: "Result Already Declared" });
    }

    const luckynumber = Number[Math.round(Math.random() * Number.length)];

    const createPayload = {
      ticketId: ticketCategoryId,
      luckyNumber: luckynumber.ticketNumber
    }

    const result = await ResultModel.create(createPayload);
    return res.status(200).json({ status: 401, message: "Result Declared Successfully", response: result });

  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const GetResult = async (req, res) => {
  try {
    const result = await ResultModel.find().populate("ticketId");

    if (result) {
      return res.status(200).json({ status: 201, response: result, message: message.read_s });
    } else {
      return res.status(200).json({ status: 401, response: result, message: message.read_f });
    }
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const DeleteDeclaredResult = async (req, res) => {
  const resultId = req.query.resultId;

  try {
    const deleteResponse = await ResultModel.findByIdAndDelete({ _id: resultId });

    if (deleteResponse) {
      return res.status(200).json({ status: 201, response: deleteResponse, message: message.delete_s });
    } else {
      return res.status(200).json({ status: 401, response: deleteResponse, message: message.delete_f });
    }

  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


export { Result, GetResult, DeleteDeclaredResult };
