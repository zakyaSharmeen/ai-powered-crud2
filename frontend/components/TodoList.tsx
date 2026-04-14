import type { Todo } from "../components/Sidebar.tsx";
import { updateTodo, deleteTodo } from "../services/api";

interface Props {
  todos: Todo[];
  refresh: () => void;
}

export default function TodoList({ todos, refresh }: Props) {
  return (
    // <div className="bg-slate-800 p-4 rounded-2xl">
    <div className="bg-gray-100 dark:bg-slate-800 text-black dark:text-white p-4 rounded-2xl">
      <h2 className="text-gray-400 mb-4">Your Tasks</h2>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo._id}
            // className="p-4 bg-slate-700 rounded-xl flex justify-between">
            className="p-4 bg-gray-200 dark:bg-slate-700 rounded-xl">
            <div>
              <p className="text-black dark:text-white font-medium">
                {todo.title}
              </p>
              <p className="text-sm text-gray-400">{todo.tags?.join(", ")}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={async () => {
                  await updateTodo(todo._id, {
                    completed: !todo.completed,
                  });
                  refresh();
                }}
                className="bg-blue-500 px-2 rounded cursor-pointer">
                {todo.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={async () => {
                  await deleteTodo(todo._id);
                  refresh();
                }}
                className="bg-red-500 px-2 rounded cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
