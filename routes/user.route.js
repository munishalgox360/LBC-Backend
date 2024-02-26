import express from 'express';
import { RegisterUser, ReadUser, UpdateUser, DeleteUser } from '../controllers/user.controller.js';

const router = express.Router();
// --------- REST API -----------

router.post('/create',RegisterUser);
router.get('/read', ReadUser);
router.put('/update', UpdateUser);
router.delete('/delete', DeleteUser);


export default router;