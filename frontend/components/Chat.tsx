import { useState } from "react";
// import { ChatMessage, Todo } from "../src/type/index.ts";
import { sendChat } from "../services/api";

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
  setTodos: (todos: Todo[]) => void;
}

export default function Chat({ setTodos }: Props) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: message }]);

    const data = await sendChat(message);

    setChat((prev) => [
      ...prev,
      { role: "assistant", text: data.reply.reply || data.reply },
    ]);

    setTodos(data.todos);
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
        <button onClick={handleSend} className="bg-green-500 px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
