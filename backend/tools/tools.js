import { tool } from "@openai/agents";
import { TodoModel } from "../models/todoModel.js";

/* ✅ CREATE */
export const createTodo = tool({
  name: "create_todo",
  description: "Create a new todo item",
  parameters: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the todo",
      },
      description: {
        type: "string",
        description: "Optional description",
      },
    },
    required: ["title"],
    additionalProperties: false,
  },
  execute: async (args) => {
    console.log("🛠️ create_todo:", args);

    const todo = await TodoModel.create(args);

    return {
      id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
    };
  },
});

/* ✅ SEARCH */
export const searchTodo = tool({
  name: "search_todo",
  description: "Search todos",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query",
      },
    },
    required: [],
    additionalProperties: false,
  },
  execute: async ({ query }) => {
    console.log("🔍 search_todo:", query);

    const todos = await TodoModel.find({
      title: { $regex: query || "", $options: "i" },
    });

    return todos.map((t) => ({
      id: t._id.toString(),
      title: t.title,
      completed: t.completed,
    }));
  },
});

/* ✅ UPDATE */
export const updateTodo = tool({
  name: "update_todo",
  description: "Update a todo",
  parameters: {
    type: "object",
    properties: {
      id: { type: "string", description: "Todo ID" },
      updates: {
        type: "object",
        additionalProperties: true,
      },
    },
    required: ["id", "updates"],
    additionalProperties: false,
  },
  execute: async ({ id, updates }) => {
    console.log("✏️ update_todo:", { id, updates });

    const todo = await TodoModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return {
      id: todo?._id.toString(),
      title: todo?.title,
      completed: todo?.completed,
    };
  },
});

/* ✅ DELETE */
export const deleteTodo = tool({
  name: "delete_todo",
  description: "Delete a todo",
  parameters: {
    type: "object",
    properties: {
      id: { type: "string", description: "Todo ID" },
    },
    required: ["id"],
    additionalProperties: false,
  },
  execute: async ({ id }) => {
    console.log("🗑️ delete_todo:", id);

    await TodoModel.findByIdAndDelete(id);

    return { success: true };
  },
});
