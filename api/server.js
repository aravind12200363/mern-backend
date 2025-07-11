import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "../routes/userRoute.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL || `mongodb+srv://${encodeURIComponent(process.env.DBUSER)}:${encodeURIComponent(process.env.DBPASS)}@cluster0.us1ya.mongodb.net/merncafe?retryWrites=true&w=majority`)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err.message));

app.use("/api/users", userRouter);

export default app;
