process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import dotenv from "dotenv";

dotenv.config({ path: "../.env", quiet: true });
import { Agent, run } from "@openai/agents";
import {
  createTodo,
  searchTodo,
  updateTodo,
  deleteTodo,
} from "../tools/tools.js";

const agent = new Agent({
  name: "Todo AI",
  model: "gpt-4.1-mini",

  instructions: `
You are an AI TODO assistant.

RULES:
- ALWAYS use tools for actions
- Understand natural language
- Be smart with search (today, completed, etc.)
`,

  tools: [createTodo, searchTodo, updateTodo, deleteTodo],
});

export const runAgent = async (input) => {
  try {
    const result = await run(agent, input);
    console.log("🟢 Agent finished");
    console.log("📤 Output:", result.finalOutput);

    return result.finalOutput;
  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    console.error("❌ DETAILS:", err.error?.message);
  }
};
// // await runAgent("hello");
// // await runAgent("Create a todo titled Buy milk");
// // await runAgent("Create a todo titled Buy milk");

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
//   console.log("Agent:", response);
// };

// main();
