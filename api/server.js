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

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.us1ya.mongodb.net/merncafe?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });

app.use("/api/users", userRouter);

// 🔁 Export as a serverless handler
export const handler = serverless(app);
