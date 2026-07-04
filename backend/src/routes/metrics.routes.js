import express from "express";
import {
  getLatestMetrics,
  getMetricsHistory,
} from "../controllers/metrics.controller.js";

const router = express.Router();

router.get("/latest", getLatestMetrics);
router.get("/history", getMetricsHistory);

export default router;