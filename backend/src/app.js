import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import metricsRoutes from "./routes/metrics.routes.js";
import anomaliesRoutes from "./routes/anomalies.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/metrics", metricsRoutes);
app.use("/api/anomalies", anomaliesRoutes);

app.get("/", (req, res) => {
  console.log("Someone visited the homepage");

  res.json({
    message: "NTCC Backend is running"
  });
});

export default app;