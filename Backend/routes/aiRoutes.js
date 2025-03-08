import express from "express";
import { GetResponse } from "../controllers/aiController.js";

const router = express.Router();


router.post("/getresponse",GetResponse)

export default router;