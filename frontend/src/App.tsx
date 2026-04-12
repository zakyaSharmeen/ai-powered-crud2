import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.tsx";
import Chat from "../components/Chat.tsx";
import TodoList from "../components/TodoList.tsx";
// import DateFilter from "../components/DateFilter.tsx";

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

  const filterByDate = async (start: string, end: string) => {
    let url = "http://localhost:5000/todos?";

    if (start) url += `startDate=${start}&`;
    if (end) url += `endDate=${end}`;

    const res = await fetch(url);
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row">
      {" "}
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
      {/* <Sidebar
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
        filterByDate={filterByDate}
      />
     
      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="flex-1">
          <Chat setTodos={setTodos} />
        </div>

        <div className="flex-1">
          <TodoList todos={todos} refresh={loadTodos} />
        </div>
      </div> */}
      <div className="h-screen w-full bg-slate-900 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 ">
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
            filterByDate={filterByDate}
          />
        </div>

        <div className="flex flex-1  border-r border-slate-700overflow-hidden">
          {/* AI Assistant (50%) */}
          <div className="flex-1 h-screen sticky top-0 p-4">
            <Chat setTodos={setTodos} />
          </div>

          {/* Todo List (50% + scroll) */}
          <div className="flex-1 p-4 overflow-y-auto scroll-smooth">
            <TodoList todos={todos} refresh={loadTodos} />
          </div>
        </div>
      </div>
    </div>
  );
}
