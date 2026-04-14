import express from "express";
import { TodoModel } from "../models/todoModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { status, tag, startDate, endDate, search } = req.query;

  const filter = {};

  // ✅ STATUS FILTER
  if (status === "completed") filter.completed = true;
  if (status === "pending") filter.completed = false;

  // ✅ TAG FILTER
  if (tag) {
    filter.tags = { $in: [tag] };
  }

  // ✅ TEXT SEARCH
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  // ✅ DATE RANGE
  // if (startDate || endDate) {
  //   filter.dueDate = {};
  //   if (startDate) filter.dueDate.$gte = new Date(startDate);
  //   if (endDate) filter.dueDate.$lte = new Date(endDate);
  // }
  // if (startDate || endDate) {
  //   filter.dueDate = {};

  //   if (startDate) {
  //     const start = new Date(startDate);
  //     start.setHours(0, 0, 0, 0);
  //     filter.dueDate.$gte = start;
  //   }

  //   if (endDate) {
  //     const end = new Date(endDate);
  //     end.setHours(23, 59, 59, 999);
  //     filter.dueDate.$lte = end;
  //   }
  // }
  if (startDate || endDate) {
    filter.dueDate = {};

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filter.dueDate.$gte = start;
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.dueDate.$lte = end;
    }
  }

  const todos = await TodoModel.find(filter).sort({ createdAt: -1 });

  res.json(todos);
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
