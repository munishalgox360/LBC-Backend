import TicketBuyersModel from '../models/ticketBuyers.model.js';
import message from '../config/message.js';

// ------------- Ticket's Buyer Controllers --------------

const BuyTicket = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const ReadBuyerTicket = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};


const DeleteBuyerTicket = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({ status : 400, response : error.stack, message : error.message});
    }
};



export { BuyTicket, ReadBuyerTicket, DeleteBuyerTicket };