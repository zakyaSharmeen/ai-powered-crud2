import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.tsx";
import Chat from "../components/Chat.tsx";
import TodoList from "../components/TodoList.tsx";
// import { Todo } from "./type/index";
import { fetchTodos } from "../services/api.ts";

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  tags?: string[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    setLoading(true);
    console.log("Refreshing...");

    const data = await fetchTodos();

    // smooth UX delay
    setTimeout(() => {
      setTodos(data);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="h-screen bg-slate-900 flex">
      {/* <Sidebar refresh={loadTodos} /> */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            <p className="text-white text-lg font-semibold animate-pulse">
              Refreshing...
            </p>
          </div>
        </div>
      )}{" "}
      <Sidebar
        todos={todos}
        refresh={loadTodos}
        filterStatus={(status) => {
          if (status === "all") loadTodos();
          else {
            fetch(`http://localhost:5000/todos?status=${status}`)
              .then((res) => res.json())
              .then(setTodos);
          }
        }}
      />
      <div className="flex-1 p-6 grid grid-rows-2 gap-6">
        <Chat setTodos={setTodos} />
        <TodoList todos={todos} refresh={loadTodos} />
      </div>
    </div>
  );
}
