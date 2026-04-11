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

  const loadTodos = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="h-screen bg-slate-900 flex">
      {/* <Sidebar refresh={loadTodos} /> */}
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
