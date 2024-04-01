import express from 'express';
import { CreateTicket, ReadTicket, UpdateTicket, DeleteTicket } from '../controllers/ticket.controller.js';
const router = express.Router();

// --------------- REST API -----------------

router.post('/create', CreateTicket);
router.post('/read', ReadTicket);
router.post('/update', UpdateTicket);
router.post('/delete', DeleteTicket);

export default router;

