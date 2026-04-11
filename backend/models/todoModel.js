// import mongoose from "mongoose";

// const TodoSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   completed: { type: Boolean, default: false },
//   dueDate: Date,
//   tags: [String],
// });

// export const TodoModel = mongoose.model("Todo", TodoSchema);

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  dueDate: Date,
  tags: { type: [String], default: [] }, // 🔥 add this (used in your tools)
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
