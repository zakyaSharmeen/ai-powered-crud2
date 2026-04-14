//////////////////////////////////////////////////////////////////////////
// process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
// import dotenv from "dotenv";

// dotenv.config({ path: "../.env", quiet: true });
// import { Agent, run } from "@openai/agents";

// const agent = new Agent({
//   name: "LuckAgent",
//   model: "gpt-4o-mini",
//   instructions: `
// You are a friendly agent.

// say thought of the day while wishing the user to motivate
// `,
// });

// export const runAgent = async (input) => {
//   const res = await run(agent, input);
//   return res.finalOutput;
// };

// const main = async () => {
//   const query = "I have an exam tomorrow"; // your input

//   const response = await runAgent(query);
//   console.log("coming from Agent::::::::::::::::::::::", response);
// };

// main();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
import dotenv from "dotenv";

dotenv.config({ quiet: true });
import axios from "axios";
import {
  createTodo,
  searchTodo,
  updateTodo,
  deleteTodo,
  countTodos,
} from "../tools/tools.js";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const tools = [
  {
    type: "function",
    function: {
      name: "create_todo",
      description: "Create a todo",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_todo",
      description: "Search and filter todos",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string" },
          status: { type: "string" },
          tag: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "count_todos",
      description: "Count todos",
      parameters: {
        type: "object",
        properties: {
          status: { type: "string" },
          tag: { type: "string" },
        },
      },
    },
  },
  // {
  //   type: "function",
  //   function: {
  //     name: "update_todo",
  //     description: "Update todo by id or title",
  //     parameters: {
  //       type: "object",
  //       properties: {
  //         id: { type: "string" },
  //         title: { type: "string" },
  //         updates: { type: "object" },
  //       },
  //       required: ["id", "updates"],
  //     },
  //   },
  // },
  {
    type: "function",
    function: {
      name: "delete_todo",
      description: "Delete todo by id or title",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
        },
        required: ["id"],
      },
    },
  },

  {
    type: "function",
    function: {
      name: "update_todo",
      description: "Update todo by id or title",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          updates: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              status: { type: "string" },
            },
          },
        },
      },
    },
  },
];

export const runAgent = async (userMessage) => {
  const MAX_STEPS = 8;
  let step = 0;

  let messages = [
    {
      role: "system",
      content: `
You are a smart TODO assistant.

RULES:
- Always use tools for todo operations
- create → create_todo
- search/list → search_todo
- update → update_todo
- delete → delete_todo
- count → count_todos

SMART MAPPING:
- "my tasks" → search_todo
- "completed tasks" → search_todo (status=completed)
- "how many" → count_todos


 When searching:
 - Use "status" for completed/pending
 - Use "tag" for categories
 - Use "query" for text search
 - Use search_todo → to list tasks
 - Use count_todos → to count tasks
 "how many grocery tasks" → use count_todos with tag="grocery"
 "how many completed tasks" → use count_todos with status="completed"


while deleting follow these below --
If user says natural language like:
- "delete buy milk"
- "remove grocery milk task"

→ use delete_todo with title

If user provides id → use id

If unclear → first search_todo then delete

Never guess results. Always use tools.


If user says:
- "update buy milk to almond milk"
- "change milk task"

→ extract:
- title = old task
- updates = new values

If id is available → prefer id
Else → use title search


- IMPORTANT RESPONSE RULE:
  After performing any action (create, update, delete),
  respond with a SHORT and CLEAN message only.

  DO NOT show:
  - id
  - tags
  - raw JSON
  - due date
  - internal data

  ONLY say:
  - "✅ Task created successfully"
  - "🗑️ Task deleted successfully"
  - "✏️ Task updated successfully"
  - "📋 Here are your tasks" (for search)


      `,
    },
    {
      role: "user",
      content: userMessage,
    },
  ];

  while (step < MAX_STEPS) {
    step++;

    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "moonshotai/kimi-k2.5",
        messages,
        tools,
        tool_choice: "auto",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const message = response.data.choices[0].message;

    console.log("🧠 AI:", message);

    // ✅ FINAL ANSWER
    if (!message.tool_calls) {
      return { reply: message.content };
    }

    messages.push(message);

    // ✅ RUN ALL TOOLS IN PARALLEL
    const toolResults = await Promise.all(
      message.tool_calls.map(async (toolCall) => {
        const name = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments || "{}");

        let result;

        if (name === "create_todo") result = await createTodo(args);
        else if (name === "search_todo") result = await searchTodo(args);
        else if (name === "update_todo") result = await updateTodo(args);
        else if (name === "delete_todo") result = await deleteTodo(args);
        else if (name === "count_todos") result = await countTodos(args);

        return {
          tool_call_id: toolCall.id,
          result,
        };
      }),
    );

    // ✅ SEND TOOL RESULTS BACK
    for (const t of toolResults) {
      messages.push({
        role: "tool",
        tool_call_id: t.tool_call_id,
        content: JSON.stringify(t.result),
      });
    }
  }

  return {
    reply: "Stopped: too many reasoning steps",
  };
};
