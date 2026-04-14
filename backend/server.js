import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";
import todoRoute from "./routes/todo.js";

dotenv.config({ quiet: true });

const app = express();
app.use(
  cors({
    origin: "https://ai-powered-crud2-1.onrender.com",
  }),
);
app.use(express.json());

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};
await connectDB();

app.use("/chat", chatRoute);
app.use("/todos", todoRoute);

app.listen(5000, () => console.log("Server Connected balle balle!!!!!!!!!!"));
