// // import { getTodos } from "../services/api.ts";
// // import TodoCard from "./TodoCard.tsx";

// // function TodoPanel({ todos, setTodos }: any) {
// //   const refresh = async () => {
// //     const data = await getTodos();
// //     setTodos(data);
// //   };

// //   return (
// //     <div className="w-1/3 p-4 border-l">
// //       <button onClick={refresh}>Refresh</button>

// //       {todos.map((t: any) => (
// //         <TodoCard key={t._id} todo={t} refresh={refresh} />
// //       ))}
// //     </div>
// //   );
// // }
// // export default TodoPanel;

// import { getTodos } from "../services/api";
// import { useState } from "react";
// import TodoCard from "./TodoCard";

// export default function TodoPanel({ todos, setTodos }: any) {
//   const [filters, setFilters] = useState({
//     status: "",
//     tag: "",
//     search: "",
//     startDate: "",
//     endDate: "",
//   });

//   const refresh = async () => {
//     const query = new URLSearchParams(filters).toString();
//     const data = await getTodos(query);
//     setTodos(data);
//   };

//   return (
//     <div className="w-1/3 p-4 border-l space-y-3">
//       <h2 className="font-bold text-lg">Todos</h2>

//       {/* 🔍 FILTERS */}
//       <div className="space-y-2">
//         <input
//           placeholder="Search..."
//           className="border w-full p-2 rounded"
//           onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//         />

//         <select
//           className="border w-full p-2 rounded"
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
//           <option value="">All</option>
//           <option value="completed">Completed</option>
//           <option value="pending">Pending</option>
//         </select>

//         <input
//           placeholder="Tag (e.g. grocery)"
//           className="border w-full p-2 rounded"
//           onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//         />

//         <div className="flex gap-2">
//           <input
//             type="date"
//             className="border w-1/2 p-2 rounded"
//             onChange={(e) =>
//               setFilters({ ...filters, startDate: e.target.value })
//             }
//           />
//           <input
//             type="date"
//             className="border w-1/2 p-2 rounded"
//             onChange={(e) =>
//               setFilters({ ...filters, endDate: e.target.value })
//             }
//           />
//         </div>

//         <button
//           onClick={refresh}
//           className="bg-black text-white w-full py-2 rounded">
//           Apply Filters
//         </button>
//       </div>

//       {/* 📋 TODO LIST */}
//       <div className="space-y-2">
//         {todos.map((t: any) => (
//           <TodoCard key={t._id} todo={t} refresh={refresh} />
//         ))}
//       </div>
//     </div>
//   );
// }
