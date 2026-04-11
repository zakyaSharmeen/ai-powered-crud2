// import { tool } from "@openai/agents";
// import { TodoModel } from "../models/todoModel.js";

// /* ✅ CREATE */
// // export const createTodo = tool({
// //   name: "create_todo",
// //   description: "Create a new todo item",
// //   parameters: {
// //     type: "object",
// //     properties: {
// //       title: {
// //         type: "string",
// //         description: "Title of the todo",
// //       },
// //       description: {
// //         type: "string",
// //         description: "Optional description",
// //       },
// //     },
// //     required: ["title"],
// //     additionalProperties: false,
// //   },
// //   execute: async (args) => {
// //     console.log("🛠️ create_todo:", args);

// //     const todo = await TodoModel.create(args);

// //     return {
// //       id: todo._id.toString(),
// //       title: todo.title,
// //       completed: todo.completed,
// //     };
// //   },
// // });

// export const createTodo = tool({
//   name: "create_todo",
//   description: "Create a new todo item",

//   parameters: {
//     type: "object",
//     properties: {
//       title: { type: "string" },
//       description: { type: "string" },
//     },
//     required: ["title"],
//     additionalProperties: false,
//   },

//   execute: async ({ title, description }) => {
//     const todo = await TodoModel.create({
//       title,
//       description: description || "",
//     });

//     return {
//       id: todo._id.toString(),
//       title: todo.title,
//       description: todo.description,
//       completed: todo.completed,
//     };
//   },
// });
// /* ✅ SEARCH */
// // export const searchTodo = tool({
// //   name: "search_todo",
// //   description: "Search todos",
// //   parameters: {
// //     type: "object",
// //     properties: {
// //       query: {
// //         type: "string",
// //         description: "Search query",
// //       },
// //     },
// //     required: [],
// //     additionalProperties: false,
// //   },
// //   //   execute: async ({ query }) => {
// //   //     console.log("🔍 search_todo:", query);

// //   //     const todos = await TodoModel.find({
// //   //       title: { $regex: query || "", $options: "i" },
// //   //     });

// //   //     return todos.map((t) => ({
// //   //       id: t._id.toString(),
// //   //       title: t.title,
// //   //       completed: t.completed,
// //   //     }));
// //   //   },
// //   //   execute: async ({ query }) => {
// //   //     const filter = {};
// //   //     const q = query?.toLowerCase() || "";

// //   //     // status
// //   //     if (q.includes("completed")) filter.completed = true;
// //   //     if (q.includes("pending")) filter.completed = false;

// //   //     // tags
// //   //     if (q.includes("grocery")) filter.tags = { $in: ["grocery"] };

// //   //     // today
// //   //     if (q.includes("today")) {
// //   //       const start = new Date();
// //   //       start.setHours(0, 0, 0, 0);

// //   //       const end = new Date();
// //   //       end.setHours(23, 59, 59, 999);

// //   //       filter.dueDate = { $gte: start, $lte: end };
// //   //     }

// //   //     // yesterday
// //   //     if (q.includes("yesterday")) {
// //   //       const start = new Date();
// //   //       start.setDate(start.getDate() - 1);
// //   //       start.setHours(0, 0, 0, 0);

// //   //       const end = new Date();
// //   //       end.setDate(end.getDate() - 1);
// //   //       end.setHours(23, 59, 59, 999);

// //   //       filter.dueDate = { $gte: start, $lte: end };
// //   //     }

// //   //     return await TodoModel.find(filter);
// //   //   },
// //   execute: async ({ query }) => {
// //     const filter = {};
// //     const q = query?.toLowerCase() || "";

// //     // status
// //     if (q.includes("completed")) filter.completed = true;
// //     if (q.includes("pending")) filter.completed = false;

// //     // tags
// //     if (q.includes("grocery")) filter.tags = { $in: ["grocery"] };

// //     // today
// //     if (q.includes("today")) {
// //       const start = new Date();
// //       start.setHours(0, 0, 0, 0);

// //       const end = new Date();
// //       end.setHours(23, 59, 59, 999);

// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     // yesterday
// //     if (q.includes("yesterday")) {
// //       const start = new Date();
// //       start.setDate(start.getDate() - 1);
// //       start.setHours(0, 0, 0, 0);

// //       const end = new Date();
// //       end.setDate(end.getDate() - 1);
// //       end.setHours(23, 59, 59, 999);

// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     return await TodoModel.find(filter);
// //   },
// // });
// // export const searchTodo = tool({
// //   name: "search_todo",
// //   description:
// //     "Search todos using keywords or filters (status, tags, date range)",
// //   parameters: {
// //     type: "object",
// //     properties: {
// //       query: { type: "string" }, // user query like "completed grocery tasks from yesterday"
// //     },
// //     required: [],
// //     additionalProperties: false,
// //   },
// //   execute: async ({ query }) => {
// //     const q = query?.toLowerCase() || "";
// //     const filter = {};

// //     // ✅ STATUS
// //     if (q.includes("completed")) filter.completed = true;
// //     if (q.includes("pending")) filter.completed = false;

// //     // ✅ TAGS (example: grocery, fitness, work)
// //     const tags = ["grocery", "fitness", "work", "shopping"];
// //     const matchedTag = tags.find((tag) => q.includes(tag));
// //     if (matchedTag) filter.tags = { $in: [matchedTag] };

// //     // ✅ DATE FILTERS
// //     const now = new Date();

// //     // today
// //     if (q.includes("today")) {
// //       const start = new Date();
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     // yesterday
// //     if (q.includes("yesterday")) {
// //       const start = new Date();
// //       start.setDate(start.getDate() - 1);
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setDate(end.getDate() - 1);
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     // this week
// //     if (q.includes("this week")) {
// //       const day = now.getDay(); // 0=Sunday
// //       const start = new Date();
// //       start.setDate(now.getDate() - day); // start of week
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setDate(now.getDate() + (6 - day)); // end of week
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     // ✅ TEXT SEARCH fallback
// //     const textRegex = q
// //       .replace(
// //         /(completed|pending|today|yesterday|this week|grocery|fitness|work|shopping)/g,
// //         "",
// //       )
// //       .trim();
// //     if (textRegex) {
// //       filter.title = { $regex: textRegex, $options: "i" };
// //     }

// //     return await TodoModel.find(filter).sort({ dueDate: 1 });
// //   },
// // });

// // export const searchTodo = tool({
// //   name: "search_todo",
// //   description:
// //     "Search todos using keywords or filters (status, tags, date range)",
// //   parameters: {
// //     type: "object",
// //     properties: {
// //       query: { type: "string" },
// //     },
// //     required: [],
// //     additionalProperties: false,
// //   },
// //   execute: async ({ query }) => {
// //     const q = query?.toLowerCase() || "";
// //     const filter = {};

// //     if (q.includes("completed")) filter.completed = true;
// //     if (q.includes("pending")) filter.completed = false;

// //     const tags = ["grocery", "fitness", "work", "shopping"];
// //     const matchedTag = tags.find((tag) => q.includes(tag));
// //     if (matchedTag) filter.tags = { $in: [matchedTag] };

// //     const now = new Date();

// //     if (q.includes("today")) {
// //       const start = new Date();
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     if (q.includes("yesterday")) {
// //       const start = new Date();
// //       start.setDate(start.getDate() - 1);
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setDate(end.getDate() - 1);
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     if (q.includes("this week")) {
// //       const day = now.getDay();
// //       const start = new Date();
// //       start.setDate(now.getDate() - day);
// //       start.setHours(0, 0, 0, 0);
// //       const end = new Date();
// //       end.setDate(now.getDate() + (6 - day));
// //       end.setHours(23, 59, 59, 999);
// //       filter.dueDate = { $gte: start, $lte: end };
// //     }

// //     const textRegex = q
// //       .replace(
// //         /(completed|pending|today|yesterday|this week|grocery|fitness|work|shopping)/g,
// //         "",
// //       )
// //       .trim();

// //     if (textRegex) {
// //       filter.title = { $regex: textRegex, $options: "i" };
// //     }

// //     const todos = await TodoModel.find(filter).sort({ dueDate: 1 });

// //     return todos.map((t) => ({
// //       id: t._id.toString(),
// //       title: t.title,
// //       description: t.description || "",
// //       completed: t.completed,
// //       tags: t.tags || [],
// //       dueDate: t.dueDate || null,
// //     }));
// //   },
// // });

// export const searchTodo = tool({
//   name: "search_todo",
//   description:
//     "Search todos using keywords or filters (status, tags, date range)",

//   parameters: {
//     type: "object",
//     properties: {
//       query: { type: "string" },
//     },
//   },

//   execute: async ({ query }) => {
//     const q = query?.toLowerCase() || "";
//     const filter = {};

//     // ✅ STATUS
//     if (q.includes("completed")) filter.completed = true;
//     if (q.includes("pending")) filter.completed = false;

//     // ✅ TAGS
//     const tags = ["grocery", "fitness", "work", "shopping"];
//     const matchedTag = tags.find((tag) => q.includes(tag));
//     if (matchedTag) filter.tags = { $in: [matchedTag] };

//     const now = new Date();

//     // ✅ TODAY
//     if (q.includes("today")) {
//       const start = new Date();
//       start.setHours(0, 0, 0, 0);

//       const end = new Date();
//       end.setHours(23, 59, 59, 999);

//       filter.dueDate = { $gte: start, $lte: end };
//     }

//     // ✅ YESTERDAY
//     if (q.includes("yesterday")) {
//       const start = new Date();
//       start.setDate(start.getDate() - 1);
//       start.setHours(0, 0, 0, 0);

//       const end = new Date();
//       end.setDate(end.getDate() - 1);
//       end.setHours(23, 59, 59, 999);

//       filter.dueDate = { $gte: start, $lte: end };
//     }

//     // ✅ THIS WEEK
//     if (q.includes("this week")) {
//       const day = now.getDay();

//       const start = new Date();
//       start.setDate(now.getDate() - day);
//       start.setHours(0, 0, 0, 0);

//       const end = new Date();
//       end.setDate(now.getDate() + (6 - day));
//       end.setHours(23, 59, 59, 999);

//       filter.dueDate = { $gte: start, $lte: end };
//     }

//     // ✅ CLEAN TEXT SEARCH
//     const textRegex = q
//       .replace(
//         /(completed|pending|today|yesterday|this week|grocery|fitness|work|shopping)/g,
//         "",
//       )
//       .trim();

//     if (textRegex) {
//       filter.title = { $regex: textRegex, $options: "i" };
//     }

//     // ✅ FIXED LINE
//     const todos = await Todo.find(filter).sort({ dueDate: 1 });

//     return todos.map((t) => ({
//       id: t._id.toString(),
//       title: t.title,
//       description: t.description || "",
//       completed: t.completed,
//       tags: t.tags || [],
//       dueDate: t.dueDate || null,
//     }));
//   },
// });
// /* ✅ UPDATE */
// export const updateTodo = tool({
//   name: "update_todo",
//   description: "Update a todo",
//   parameters: {
//     type: "object",
//     properties: {
//       id: { type: "string", description: "Todo ID" },
//       updates: {
//         type: "object",
//         additionalProperties: true,
//       },
//     },
//     required: ["id", "updates"],
//     additionalProperties: false,
//   },
//   execute: async ({ id, updates }) => {
//     console.log("✏️ update_todo:", { id, updates });

//     const todo = await TodoModel.findByIdAndUpdate(id, updates, {
//       new: true,
//     });

//     return {
//       id: todo?._id.toString(),
//       title: todo?.title,
//       completed: todo?.completed,
//     };
//   },
// });

// /* ✅ DELETE */
// export const deleteTodo = tool({
//   name: "delete_todo",
//   description: "Delete a todo",
//   parameters: {
//     type: "object",
//     properties: {
//       id: { type: "string", description: "Todo ID" },
//     },
//     required: ["id"],
//     additionalProperties: false,
//   },
//   execute: async ({ id }) => {
//     console.log("🗑️ delete_todo:", id);

//     await TodoModel.findByIdAndDelete(id);

//     return { success: true };
//   },
// });
//////////////////////////////////////////////////////////////
// import { TodoModel } from "../models/todoModel.js";

// export const createTodo = async ({ title }) => {
//   console.log("🛠️ create_todo:", title);

//   const todo = await TodoModel.create({
//     title,
//     completed: false,
//   });

//   return todo;
// };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// open sdk tools
// import { TodoModel } from "../models/todoModel.js";

// export const createTodo = async ({ title }) => {
//   console.log(
//     "🛠️ created this from the tool createTodo present in toolsjs :",
//     title,
//   );

//   const todo = await TodoModel.create({
//     title,
//     completed: false,
//   });

//   return todo;
// };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TodoModel } from "../models/todoModel.js";

// CREATE---------------

//title, description, filtering
const smartParse = (title, description = "") => {
  const text = (title + " " + description).toLowerCase();

  let dueDate = null;
  let tags = [];

  // 🏷️ AUTO TAGGING (UNCHANGED)
  const tagRules = [
    {
      tag: "grocery",
      keywords: ["buy", "purchase", "shop", "grocery", "milk", "vegetables"],
    },
    {
      tag: "fitness",
      keywords: ["run", "walk", "gym", "exercise", "workout"],
    },
    {
      tag: "work",
      keywords: ["meeting", "office", "project", "email"],
    },
  ];

  tagRules.forEach((rule) => {
    if (rule.keywords.some((word) => text.includes(word))) {
      tags.push(rule.tag);
    }
  });

  const now = new Date();

  // 🗓️ DATE
  if (text.includes("tomorrow")) {
    dueDate = new Date();
    dueDate.setDate(now.getDate() + 1);
  }

  if (text.includes("today")) {
    dueDate = new Date();
  }

  // ⏰ DEFAULT TIME (if date exists)
  if (dueDate) {
    dueDate.setHours(9, 0, 0, 0); // default 9 AM
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

export const searchTodo = async ({ query, status, tag }) => {
  console.log("🔍 TOOL CALLED: search_todo");
  console.log("📥 Input:", { query, status, tag });

  const filter = {};

  // ✅ status filter
  if (status === "completed") filter.completed = true;
  if (status === "pending") filter.completed = false;

  // ✅ tag filter
  if (tag) filter.tags = { $in: [tag] };

  // ✅ text search
  if (query) {
    filter.title = { $regex: query, $options: "i" };
  }

  const todos = await TodoModel.find(filter);

  console.log("📋 Result:", todos);

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
