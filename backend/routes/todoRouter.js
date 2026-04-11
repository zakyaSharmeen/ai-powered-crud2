import { TodoModel } from "../models/todoModel.js";

export const createTodo = async ({ title }) => {
  console.log("🛠️ create_todo:", title);

  const todo = await TodoModel.create({
    title,
    completed: false,
  });

  return todo;
};
