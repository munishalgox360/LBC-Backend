// import TicketNumberModel from "../models/ticketNumber.model.js";
import ResultModel from "../models/result.model.js";
import CountPlayerModel from "../models/playerCount.model.js";
import message from "../config/message.js";



const Result = async (req, res) => {
  const { ticketCategoryId, slotTime, month, date } = req.body;
  const match = { ticketCategoryId : ticketCategoryId, slotTime : slotTime, month : month, date : date };

  try { 
    const resultDeclared = await ResultModel.findOne(match);
    if (resultDeclared) {
      return res.status(200).json({ status: 401, message: "Result Already Declared" });
    }

    const luckynumber = Math.floor(Math.random() * (101 - 1)) + 1;

    const createPayload = {
      ticketId: ticketCategoryId,
      slotTime: slotTime, month : month,
      date : date, luckyNumber: luckynumber
    }

    const result = await ResultModel.create(createPayload);
    return res.status(200).json({ status: 401, message: "Result Declared Successfully", response: result });

  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const GetResult = async (req, res) => {
  const { month, date } = req.query;

  try {
    const match = { month: month, date : date };  
    const result = await ResultModel.find(match).populate("ticketId");

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


//--------------------------------------------------//

const CountTicketPlayer = async (req, res) => {
  const { ticket, player, slotTime, month, date } = req.body;
  let newCount;

  try {
    const isExist = await CountPlayerModel.findOne({ ticket: ticket });

    if (!isExist) {
      return res.status(200).json({ status: 401, message: "Create Ticket, Before Player's Count" });
    }

    if (isExist.slotTime === slotTime && isExist.month === month && isExist.date === date) {
      newCount = await CountPlayerModel.findOneAndUpdate({ ticket: ticket, slotTime: slotTime }, { $push: { players: player } }, { new: true });
    }else{
      const updatePayload = {
        slotTime: slotTime, month: month, 
        date: date, $push: { players: player }
      }
  
      newCount = await CountPlayerModel.findOneAndUpdate({ ticket: ticket }, updatePayload, { new: true });
    }

    
    if (newCount) {
      return res.status(200).json({ status: 201, response: newCount, message: message.create_s });
    } else {
      return res.status(200).json({ status: 401, response: newCount, message: message.create_f });
    }

  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};


const GetCountedPlayer = async (req, res) => {
  const { ticketId, slotTime, month, date } = req.query;
  const match = { ticketId: ticketId , slotTime: slotTime , month: month, date: date };
  try {
    const getResponse = await CountPlayerModel.find(match);
    res.status(200).json({ status: 201, response: getResponse.players.length, message: message.read_s });
  } catch (error) {
    res.status(400).json({ status: 400, response: error.stack, message: error.message });
  }
};



export { Result, GetResult, DeleteDeclaredResult, CountTicketPlayer, GetCountedPlayer };








// // players should be 100
//  if (count === 100) {
//   return res.status(200).json({ status: 401, message: "100 User Completed" });
// }

// // check player already counted or not
// if (count > 0) {
//   const exist = isExist.players.some(p => p.toString() === player);
//   if (exist) {
//     return res.status(200).json({ status: 401, message: "Already Counted" });
//   }
// }








// const Number = await TicketNumberModel.find({ ticketId: ticketCategoryId });

// for (let i = Number.length - 1; i > 0; i--) {
//   let j = Math.floor(Math.random() * (i + 1));
//   let k = Number[i];
//   Number[i] = Number[j];
//   Number[j] = k;
// }

// const resultDeclared = await ResultModel.findOne({ ticketId: ticketCategoryId });
// if (resultDeclared) {
//   return res.status(200).json({ status: 401, message: "Result Already Declared" });
// }

// const luckynumber = Number[Math.round(Math.random() * Number.length)];