import express from "express";
import { GetTestKey , CreateOrder, VerifyPayment } from '../controllers/payment.controller.js';
const router = express.Router();

// --------------- REST API -----------------
router.get('/paymentKey', GetTestKey);
router.post('/create/order', CreateOrder);
router.post('/verify', VerifyPayment);


export default router;