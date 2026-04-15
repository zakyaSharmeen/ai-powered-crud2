// import DateFilter from "../components/DateFilter.tsx";

// export interface Todo {
//   _id: string;
//   title: string;
//   description?: string;
//   completed: boolean;
//   tags?: string[];
// }
// interface Props {
//   todos: Todo[];
//   refresh: () => void;
//   filterStatus: (status: "all" | "completed" | "pending") => void;
//   filterByDate: (start: string, end: string) => void; // ✅ added
//   darkMode: boolean;
//   setDarkMode: (value: boolean) => void;
// }

// export default function Sidebar({
//   todos,
//   refresh,
//   filterStatus,
//   filterByDate,
//   darkMode,
//   setDarkMode,
// }: Props) {
//   const completedCount = todos.filter((t) => t.completed).length;
//   const pendingCount = todos.filter((t) => !t.completed).length;

//   const allTags = Array.from(new Set(todos.flatMap((t) => t.tags || [])));

//   return (
//     // <div className="w-full md:w-72 bg-slate-800 p-4 flex flex-col gap-6">
//     <div className="h-screen bg-gray-100 dark:bg-slate-800 text-black dark:text-white p-4 flex flex-col gap-6">
//       <h1 className="text-xl font-bold text-black dark:text-white">
//         🧠 AI Todos
//       </h1>
//       {/* Filters */}
//       <div className="flex flex-col gap-2">
//         <button
//           onClick={() => filterStatus("all")}
//           className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg cursor-pointer">
//           All Tasks ({todos.length})
//         </button>

//         <button
//           onClick={() => filterStatus("completed")}
//           className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg cursor-pointer">
//           Completed ({completedCount})
//         </button>

//         <button
//           onClick={() => filterStatus("pending")}
//           className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg cursor-pointer">
//           Pending ({pendingCount})
//         </button>
//       </div>
//       <DateFilter onFilter={filterByDate} />
//       {/* Tags */}
//       <div>
//         <h2 className="text-gray-400 mb-2">Tags</h2>
//         <div className="flex flex-wrap gap-2">
//           {allTags.map((tag, index) => (
//             <span
//               key={`${tag}-${index}`}
//               // className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-blue-400">
//               className="px-2 py-1 bg-gray-200 dark:bg-slate-700  dark:text-blue-400  rounded-lg text-sm text-blue-400">
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className="text-center text-black dark:text-white bg-gray-200 dark:bg-slate-700 p-2 rounded-lg cursor-pointer">
//         {" "}
//         {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
//       </button>
//       <button
//         onClick={refresh}
//         className="mt-[185px]  p-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-black dark:text-white cursor-pointer">
//         Refresh
//       </button>
//     </div>
//   );
// }

import DateFilter from "../components/DateFilter.tsx";

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  tags?: string[];
}
interface Props {
  todos: Todo[];
  refresh: () => void;
  filterStatus: (status: "all" | "completed" | "pending") => void;
  filterByDate: (start: string, end: string) => void; // ✅ added
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Sidebar({
  todos,
  refresh,
  filterStatus,
  filterByDate,
  darkMode,
  setDarkMode,
}: Props) {
  const safeTodos = todos || []; // ✅ ADD THIS

  const completedCount = safeTodos.filter((t) => t.completed).length;
  const pendingCount = safeTodos.filter((t) => !t.completed).length;

  const allTags = Array.from(new Set(safeTodos.flatMap((t) => t.tags || [])));

  return (
    <div className="h-screen bg-gray-100 dark:bg-slate-800 text-black dark:text-white p-4 flex flex-col gap-6">
      <h1 className="text-xl font-bold text-black dark:text-white">
        🧠 AI Todos
      </h1>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => filterStatus("all")}
          className="text-left bg-gray-200 dark:bg-slate-700 p-2 rounded-lg">
          All Tasks ({safeTodos.length}) {/* ✅ FIX */}
        </button>

        <button
          onClick={() => filterStatus("completed")}
          className="text-left bg-gray-200 dark:bg-slate-700 p-2 rounded-lg">
          Completed ({completedCount})
        </button>

        <button
          onClick={() => filterStatus("pending")}
          className="text-left bg-gray-200 dark:bg-slate-700 p-2 rounded-lg">
          Pending ({pendingCount})
        </button>
      </div>

      <DateFilter onFilter={filterByDate} />

      <div>
        <h2 className="text-gray-400 mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded-lg text-sm text-blue-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-200 dark:bg-slate-700 p-2 rounded-lg">
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <button
        onClick={refresh}
        className="mt-[185px] p-2 rounded-lg bg-gray-200 dark:bg-slate-700">
        Refresh
      </button>
    </div>
  );
}
