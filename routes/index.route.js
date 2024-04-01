import express from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';
import paymentRoute from './payment.route.js';
import ticketRoute from './ticket.route.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/payment', verifyToken, paymentRoute);
router.use('/ticket', ticketRoute);

export default router;