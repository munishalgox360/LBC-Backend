import express from "express";
import { CreateTicketNumber, ReadTicketNumber, DeleteTicketNumber } from "../controllers/ticketNumber.controller.js";
const router = express.Router();

// -------------- REST API ---------------

router.post('/create', CreateTicketNumber);
router.get('/read', ReadTicketNumber);
router.delete('/delete', DeleteTicketNumber);

export default router;
