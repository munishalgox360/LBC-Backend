import express from 'express';
import { CreateTicket, ReadTicket, UpdateTicket, DeleteTicket } from '../controllers/ticket.controller.js';
const router = express.Router();

// --------------- REST API -----------------

router.post('/create', CreateTicket);
router.get('/read', ReadTicket);
router.put('/update', UpdateTicket);
router.delete('/delete', DeleteTicket);

export default router;

