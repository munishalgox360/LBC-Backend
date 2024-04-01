import TicketModel from '../models/ticket.model.js';
import message from '../config/message.js';

// ------------- Ticket Controllers --------------

const CreateTicket = async (req, res) => {
      
    const adminId = new ObjectId(req.userId);
    const price = Number(req.body.price);
    const length = await TicketModel.countDocuments();
    if(length === 5){
        return res.status(200).json({ status : 401, message : message.ticket_lmt });
    } 

    try {
        const createPayload = { adminId : adminId, price : price };
        const createResp = await TicketModel.create(createPayload);
        if(createResp){
            return res.status(200).json({ status : 201, response : createResp, message : message.create_s });
         }else{
            return res.status(200).json({ status : 401, response : createResp, message : message.create_f });
         }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const ReadTicket = async (req, res) => {
    try {
        const getResp = await TicketModel.find({}).sort({ price : 1 });
        if(getResp.length > 0){
            return res.status(200).json({ status : 201, response : getResp, message : message.read_s });
         }else{
            return res.status(200).json({ status : 401, response : getResp, message : message.read_f });
         }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const UpdateTicket = async (req, res) => {

    const ticketId = new ObjectId(req.body.ticketId);
    const status = req.body.status;

    try {
        const updateResp = await TicketModel.findByIdAndUpdate({ _id : ticketId }, { active : status }, { new : true });
        if(updateResp){
            return res.status(200).json({ status : 201, response : updateResp, message : message.update_s });
         }else{
            return res.status(200).json({ status : 401, response : updateResp, message : message.update_f });
         }               
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


const DeleteTicket = async (req, res) => {
    
    const ticketId = new ObjectId(req.query.ticketId);

    try {
        const deleteResp = await TicketModel.findByIdAndDelete({ _id : ticketId });
        if(deleteResp){
            return res.status(200).json({ status : 201, response : deleteResp, message : message.delete_s });
         }else{
            return res.status(200).json({ status : 401, response : deleteResp, message : message.delete_f });
         }
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message });
    }
};


export { CreateTicket, ReadTicket, UpdateTicket, DeleteTicket };