import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/userRoute.js";
import cors from "cors";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

app.use("/api/users", userRouter);
export const handler = serverless(app);
export default app; // 👈 add this too
