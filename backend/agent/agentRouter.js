import axios from "axios";
import { createTodo } from "../routes/todoRouter.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const runAgent = async (userMessage) => {
  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: "openai/gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
You are a todo assistant.

- Use tools when needed
- If user wants to add task → call create_todo
`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],

      // ✅ REAL TOOL CALLING
      tools: [
        {
          type: "function",
          function: {
            name: "create_todo",
            description: "Create a todo",
            parameters: {
              type: "object",
              properties: {
                title: { type: "string" },
              },
              required: ["title"],
            },
          },
        },
      ],

      tool_choice: "auto", // let AI decide
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  const message = response.data.choices[0].message;

  console.log("🧠 AI RESPONSE:", message);

  // ✅ CHECK IF TOOL CALLED
  if (message.tool_calls) {
    const toolCall = message.tool_calls[0];

    const args = JSON.parse(toolCall.function.arguments);

    if (toolCall.function.name === "create_todo") {
      const result = await createTodo(args);

      return {
        reply: "Todo created successfully",
        toolResult: result,
      };
    }
  }

  // normal response
  return { reply: message.content };
};
