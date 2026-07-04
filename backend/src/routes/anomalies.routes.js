import express from "express";
import { getAnomalies } from "../controllers/anomalies.controller.js";

const router = express.Router();

router.get("/", getAnomalies);

export default router;