import express from 'express';
import userRoute from './user.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);

export default router;