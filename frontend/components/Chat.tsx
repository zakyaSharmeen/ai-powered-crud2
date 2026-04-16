import { useState } from "react";
// import { ChatMessage, Todo } from "../src/type/index.ts";
import { sendChat, updateTodo } from "../services/api";

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

interface Props {
  // setTodos: (todos: Todo[]) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

export default function Chat({ setTodos, todos }: Props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  // const handleSend = async () => {
  //   if (!message.trim()) return;

  //   setChat((prev) => [...prev, { role: "user", text: message }]);

  //   const data = await sendChat(message);

  //   setChat((prev) => [
  //     ...prev,
  //     { role: "assistant", text: data.reply.reply || data.reply },
  //   ]);

  //   // setTodos(data.todos);
  //   setTodos(data?.todos || []);

  //   setMessage("");
  // };

  const handleSend = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);

    // // ✅ AGENT LOGIC HERE
    // if (message.toLowerCase().startsWith("completed ")) {
    //   const taskName = message.replace("completed ", "").trim().toLowerCase();

    //   // ✅ get matching todos first
    //   let matchedTodos: Todo[] = [];

    //   setTodos((prev) => {
    //     matchedTodos = prev.filter((t) => t.title.toLowerCase() === taskName);

    //     return prev.map((t) =>
    //       t.title.toLowerCase() === taskName ? { ...t, completed: true } : t,
    //     );
    //   });

    //   // ✅ update backend (agent)
    //   await Promise.all(
    //     matchedTodos.map((t) => updateTodo(t._id, { completed: true })),
    //   );

    //   setChat((prev) => [
    //     ...prev,
    //     { role: "assistant", text: `Marked "${taskName}" as completed ✅` },
    //   ]);

    //   setMessage("");
    //   return; // ⛔ STOP here (don’t call API)
    // }

    if (
      message.toLowerCase().includes("completed") ||
      message.toLowerCase().includes("mark")
    ) {
      const taskName = message
        .toLowerCase()
        .replace(/completed|mark|as|done/g, "")
        .trim();

      const task = todos.find((t) => t.title.toLowerCase().includes(taskName));

      if (!task) return;

      // ✅ THIS is the missing part in your system
      await updateTodo(task._id, { completed: true });

      setTodos((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: true } : t)),
      );

      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Task marked as completed successfully.",
        },
      ]);

      setMessage("");
      return;
    }
    // 🔵 Normal AI flow
    const data = await sendChat(message);

    setChat((prev) => [
      ...prev,
      { role: "assistant", text: data.reply.reply || data.reply },
    ]);

    setTodos(data?.todos || []);
    setMessage("");
  };
  return (
    <div className="bg-gray-100 dark:bg-slate-800 text-black dark:text-white h-full rounded-xl flex flex-col p-4">
      {" "}
      <h2 className="text-gray-400 mb-2">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex-1 p-2 rounded-lg text-black dark:text-white 
  ${
    msg.role === "user"
      ? "bg-gray-200 dark:bg-slate-700"
      : "bg-green-600 ml-auto"
  }`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-black dark:text-white"
          placeholder="Ask AI..."
        />
        <button
          onClick={handleSend}
          className="bg-green-500 px-4 rounded-lg cursor-pointer text-white dark:text-white">
          Send
        </button>
      </div>
    </div>
  );
}
