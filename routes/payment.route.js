import express from "express";
import { CreateOrder, VerifyPayment } from '../controllers/payment.controller.js';
import { ReadTransaction } from "../controllers/payment.controller.js";
const router = express.Router();

// --------------- REST API -----------------

router.post('/create/order', CreateOrder);
router.post('/verify', VerifyPayment);
router.get('/readTransaction', ReadTransaction);

export default router;