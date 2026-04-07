import express from "express";
import { runAgent } from "../agent/agent.js";
import { TodoModel } from "../models/todoModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  const reply = await runAgent(message);
  const todos = await TodoModel.find();

  res.json({ reply, todos });
});

export default router;
