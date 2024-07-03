import express from 'express';
import { RegisterUser, ReadUser, UpdateUser, DeleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { Result, GetResult, DeleteDeclaredResult } from "../controllers/result.controller.js";
const router = express.Router();
// --------- REST API -----------

router.post('/create', RegisterUser);
router.get('/read', verifyToken, ReadUser);
router.put('/update', verifyToken, UpdateUser);
router.delete('/delete', verifyToken, DeleteUser);

// Result
router.get("/result", verifyToken, Result);
router.get("/resultFetch", GetResult);
router.delete("/resultDelete", verifyToken, DeleteDeclaredResult);

export default router;