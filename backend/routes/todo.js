import express from "express";
import { TodoModel } from "../models/todoModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await TodoModel.find());
});

router.post("/", async (req, res) => {
  res.json(await TodoModel.create(req.body));
});

router.put("/:id", async (req, res) => {
  res.json(
    await TodoModel.findByIdAndUpdate(req.params.id, req.body, { new: true }),
  );
});

router.delete("/:id", async (req, res) => {
  await TodoModel.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
