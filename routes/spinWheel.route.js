import express from "express";
import { SpinWheel, WinningAmount } from "../controllers/spinWheel.controller";
const router = express.Router();


router.get("/spin", SpinWheel);
router.get("/win", WinningAmount);


export default router;



