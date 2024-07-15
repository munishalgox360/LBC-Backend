import TicketNumberModel from '../models/ticketNumber.model.js';
import { IncreaseAmount, DecreaseAmount } from '../utilities/amount.utility.js';
import message from '../config/message.js';
import { ObjectId } from 'mongodb';
import TicketModel from '../models/ticket.model.js';
import UserModel from "../models/user.model.js";


// ------------- Ticket's Buyer Controllers --------------

const CreateTicketNumber = async (req, res) => {
   
    const userId = new ObjectId(req.userId);
    const ticketId = new ObjectId(req.body.ticketId);
    const ticketNumber = Number(req.body.ticketNumber);
    

    const User = await UserModel.findById({ _id : userId });
    const ticket = await TicketModel.findById({ _id : ticketId });

    if(!ticket.active){ 
        return res.status(200).json({ status : 401, message : "Ticket is In-active" });
    }

    if(User.amount < ticket.amount){
        return res.status(200).json({ status : 401, message : "Inshufficent Balance" });
    }

    const match = { userId : userId, ticketId : ticketId, ticketNumber : ticketNumber, slotTime : req.body.slotTime };

    const isSelected = await TicketNumberModel.findOne(match);
    if(isSelected){
        return res.status(200).json({ status : 401, message : "Already Selected" });
    }
    
        
    try {
        const createPayload = {
            userId: userId,
            ticketId: ticketId,
            slotTime: req.body.slotTime, 
            ticketNumber: ticketNumber   
        };
                   
        const decreaseResp = await DecreaseAmount({ userId : userId, amount : ticket.amount }, res);
        
        const createResp = await TicketNumberModel.create(createPayload);
        
        if(createResp){
            return res.status(200).json({ status : 201, response : createResp, message : message.create_s });
        }else{
            return res.status(200).json({ status : 401, response : createResp, message : message.create_f });
        }

    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const ReadTicketNumber = async (req, res) => {
  
    const userId = new ObjectId(req.userId);
    const ticketId = new ObjectId(req.body.ticketId);

    try {
        const match = { userId : userId, ticketId : ticketId, slotTime : req.body.slotTime };
        const getResp = await TicketNumberModel.find(match);    
        if(getResp.length > 0){
            res.status(200).json({ status : 201, response : getResp, message : message.read_s });
        }else{
            res.status(200).json({ status : 401, response : getResp, message : message.read_f });
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const DeleteTicketNumber = async (req, res) => {
  
    const userId = new ObjectId(req.userId);
    const ticketId = new ObjectId(req.body.ticketId);
    const ticketNumber = Number(req.body.ticketNumber);

    try {
        const deletePayload = {
            userId: userId,
            ticketId: ticketId,
            ticketNumber : ticketNumber,
            slotTime : req.body.slotTime
        };

                
        const ticket = await TicketModel.findById({ _id : ticketId });
        if(!ticket){
            return res.status(200).json({ status : 401, message : message.read_f });        
        }        

        const increaseResp = await IncreaseAmount({ userId : userId, amount : ticket.amount }, res);
        if(!increaseResp) return res.status(200).json({ status : 401, message : message.update_f });

        const deleteResp = await TicketNumberModel.findOneAndDelete(deletePayload);        
        if(deleteResp){
            return res.status(200).json({ status : 201, response : deleteResp, message : message.delete_s });    
        }else{
            return res.status(200).json({ status : 401, response : deleteResp, message : message.delete_f });    
        }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


export { CreateTicketNumber, ReadTicketNumber, DeleteTicketNumber };