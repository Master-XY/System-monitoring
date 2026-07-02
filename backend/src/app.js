import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Someone visited the homepage");

  res.json({
    message: "NTCC Backend is running"
  });
});

export default app;