// // import express from "express";
// // import { runAgent } from "../agent/agent.js";
// // import { TodoModel } from "../models/todoModel.js";

// // const router = express.Router();

// // router.post("/", async (req, res) => {
// //   const { message } = req.body;

// //   // const reply = await runAgent(message);
// //   try {
// //     const reply = await runAgent(message);
// //     res.json({ reply, todos });
// //   } catch (err) {
// //     console.error("❌ FULL ERROR:", err.message);
// //     res.status(500).json({ error: err.message });
// //   }
// //   const todos = await TodoModel.find();

// //   res.json({ reply, todos });
// // });

// // export default router;

// import express from "express";
// import { runAgent } from "../agent/agent.js";
// import { TodoModel } from "../models/todoModel.js";

// const router = express.Router();
// const { message } = req.body;

// router.post("/", async (req, res) => {
//   try {
//     const { message } = req.body;

//     const reply = await runAgent(message); // ✅ AI call
//     const todos = await TodoModel.find(); // ✅ fetch todos

//     res.json({ reply, todos });
//   } catch (err) {
//     console.error("❌ FULL ERROR:", err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// export default router;

import express from "express";
import { runAgent } from "../agent/agent.js";
import { TodoModel } from "../models/todoModel.js";

const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { message } = req.body;

//     // ✅ Validate input
//     if (!message) {
//       return res.status(400).json({ error: "Message required" });
//     }

//     // ✅ Run AI agent
//     const reply = await runAgent(message);

//     // ✅ Fetch todos
//     const todos = await TodoModel.find();

//     // ✅ Send response
//     res.json({ reply, todos });
//   } catch (err) {
//     console.error("❌ FULL ERROR:", err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });
// router.post("/", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || typeof message !== "string") {
//       console.log("📩 Incoming message:", message, typeof message);
//       return res.status(400).json({ error: "Message must be string" });
//     }

//     const reply = await runAgent(message);
//     const todos = await TodoModel.find();

//     res.json({ reply, todos });
//   } catch (err) {
//     console.error("❌ FULL ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message must be string" });
    }

    let reply;

    try {
      reply = await runAgent(message);
    } catch (err) {
      console.error("❌ AGENT ERROR:", err.message);
      reply = { reply: "⚠️ Something went wrong in AI" }; // fallback
    }

    const todos = await TodoModel.find();

    res.json({
      reply: reply?.reply || reply || "No reply",
      todos: todos || [],
    });
  } catch (err) {
    console.error("❌ FULL ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
