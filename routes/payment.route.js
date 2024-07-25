import express from "express";
import { CreateOrder, DepositMoney, WithdrawalMoney } from '../controllers/payment.controller.js';
import { ReadTransaction } from "../controllers/payment.controller.js";
const router = express.Router();

// --------------- REST API -----------------

router.post('/create/order', CreateOrder);
router.post('/verify', DepositMoney); 
router.post('/withdrawal', WithdrawalMoney);
router.get('/readTransaction', ReadTransaction);

export default router;