//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TodoModel } from "../models/todoModel.js";

const smartParse = (title, description = "") => {
  const text = (title + " " + description).toLowerCase();

  let dueDate = null;
  let tags = [];

  const now = new Date();

  // 🏷️ TAGS
  const tagRules = [
    {
      tag: "grocery",
      keywords: ["buy", "milk", "vegetables", "shop"],
    },
    {
      tag: "fitness",
      keywords: ["gym", "run", "workout"],
    },
    {
      tag: "work",
      keywords: ["meeting", "project", "office"],
    },
  ];

  tagRules.forEach((rule) => {
    if (rule.keywords.some((word) => text.includes(word))) {
      tags.push(rule.tag);
    }
  });

  // 📅 TODAY
  if (text.includes("today")) {
    dueDate = new Date(now);
  }

  // 📅 TOMORROW
  if (text.includes("tomorrow")) {
    dueDate = new Date(now);
    dueDate.setDate(now.getDate() + 1);
  }

  // 📅 NEXT WEEK
  if (text.includes("next week")) {
    dueDate = new Date(now);
    dueDate.setDate(now.getDate() + 7);
  }

  // 📅 AFTER X DAYS
  const daysMatch = text.match(/after (\d+) days?/);
  if (daysMatch) {
    const days = parseInt(daysMatch[1]);
    dueDate = new Date(now);
    dueDate.setDate(now.getDate() + days);
  }

  // ⏰ DEFAULT TIME
  if (dueDate) {
    dueDate.setHours(9, 0, 0, 0);
  }

  // ⏰ TIME WORDS
  if (text.includes("morning")) dueDate?.setHours(8, 0, 0, 0);
  if (text.includes("evening")) dueDate?.setHours(18, 0, 0, 0);
  if (text.includes("night")) dueDate?.setHours(21, 0, 0, 0);

  // ⏰ EXACT TIME (9pm, 7am)
  const match = text.match(/(\d{1,2})(am|pm)/);
  if (match && dueDate) {
    let hour = parseInt(match[1]);

    if (match[2] === "pm" && hour !== 12) hour += 12;
    if (match[2] === "am" && hour === 12) hour = 0;

    dueDate.setHours(hour, 0, 0, 0);
  }

  return { dueDate, tags };
};

//date formatting
const formatTodoOutput = (todo) => {
  if (!todo.dueDate) return `${todo.title} (${todo.tags.join(", ")})`;

  const date = new Date(todo.dueDate);

  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} - ${formattedTime} - ${todo.title} (${todo.tags.join(", ")})`;
};

export const createTodo = async ({ title, description }) => {
  console.log("🛠️ TOOL CALLED: create_todo");
  console.log("📥 Input:", { title, description });

  // 🧠 SMART PARSE
  const { dueDate, tags } = smartParse(title, description);

  const todo = await TodoModel.create({
    title,
    description: description ?? "",
    completed: false,
    dueDate,
    tags,
  });

  const formatted = formatTodoOutput(todo);
  console.log("🧾 Display:", formatted);

  console.log("🧠 Parsed:", { dueDate, tags });
  console.log("✅ Todo Created:", todo);

  return {
    id: todo._id.toString(),
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    dueDate: todo.dueDate,
    tags: todo.tags,
    display: formatted,
  };
};
///////////////////////////////////////////////////////////

// export const searchTodo = async ({ query, status, tag }) => {
//   console.log("🔍 TOOL CALLED: search_todo");
//   console.log("📥 Input:", { query, status, tag });

//   const filter = {};

//   // ✅ status filter
//   if (status === "completed") filter.completed = true;
//   if (status === "pending") filter.completed = false;

//   // ✅ tag filter
//   if (tag) filter.tags = { $in: [tag] };

//   // ✅ text search
//   if (query) {
//     filter.title = { $regex: query, $options: "i" };
//   }
//   if (query && query.toLowerCase().includes("today")) {
//     const start = new Date();
//     start.setHours(0, 0, 0, 0);

//     const end = new Date();
//     end.setHours(23, 59, 59, 999);

//     filter.dueDate = { $gte: start, $lte: end };
//   }
//   if (query && query.toLowerCase().includes("tomorrow")) {
//     const start = new Date();
//     start.setDate(start.getDate() + 1);
//     start.setHours(0, 0, 0, 0);

//     const end = new Date();
//     end.setDate(end.getDate() + 1);
//     end.setHours(23, 59, 59, 999);

//     filter.dueDate = { $gte: start, $lte: end };
//   }

//   const todos = await TodoModel.find(filter);

//   console.log("📋 Result:", todos);

//   return todos;
// };
export const searchTodo = async (args = {}) => {
  const { query, status, tag } = args;

  const filter = {};

  // ✅ STATUS
  if (status === "completed") filter.completed = true;
  if (status === "pending") filter.completed = false;

  // ✅ TAG
  if (tag) filter.tags = { $in: [tag] };

  let isDateQuery = false;

  // 🔥 DATE LOGIC
  if (query?.toLowerCase().includes("today")) {
    isDateQuery = true;

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    filter.dueDate = { $gte: start, $lte: end };
  }

  if (query?.toLowerCase().includes("tomorrow")) {
    isDateQuery = true;

    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(end.getDate() + 1);
    end.setHours(23, 59, 59, 999);

    filter.dueDate = { $gte: start, $lte: end };
  }

  // ✅ ONLY apply title search if NOT date query
  if (query && !isDateQuery) {
    filter.title = { $regex: query, $options: "i" };
  }

  const todos = await TodoModel.find(filter);

  return todos;
};

//counting same type of tasks

export const countTodos = async ({ status, tag }) => {
  console.log("📊 TOOL CALLED: count_todos");
  console.log("📥 Input:", { status, tag });

  const filter = {};

  // ✅ status
  if (status === "completed") filter.completed = true;
  if (status === "pending") filter.completed = false;

  // ✅ tag
  if (tag) filter.tags = { $in: [tag] };

  const count = await TodoModel.countDocuments(filter);

  console.log("📊 Count:", count);

  return { count, message: `You have ${count} tasks` };
};

///////////////////////////////////////////////////////////////

// UPDATE
// export const updateTodo = async ({ id, updates }) => {
//   return await TodoModel.findByIdAndUpdate(id, updates, { new: true });
// };
export const updateTodo = async ({ id, title, updates }) => {
  let updated;

  if (id) {
    updated = await TodoModel.findByIdAndUpdate(id, updates, {
      new: true,
    });
  } else if (title) {
    updated = await TodoModel.findOneAndUpdate(
      { title: { $regex: new RegExp(title, "i") } },
      updates,
      { new: true },
    );
  }

  if (!updated) {
    return { success: false, message: "Todo not found" };
  }

  return {
    success: true,
    updated,
  };
};

///////////////////////////////////////////////////////////////////
export const deleteTodo = async ({ id, title }) => {
  let deleted;

  if (id) {
    deleted = await TodoModel.findByIdAndDelete(id);
  } else if (title) {
    deleted = await TodoModel.findOneAndDelete({
      title: { $regex: new RegExp(title, "i") },
    });
  }

  if (!deleted) {
    return { success: false, message: "Todo not found" };
  }

  return {
    success: true,
    deleted,
  };
};
