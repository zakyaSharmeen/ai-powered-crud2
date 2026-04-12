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
}

export default function Sidebar({
  todos,
  refresh,
  filterStatus,
  filterByDate,
}: Props) {
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  const allTags = Array.from(new Set(todos.flatMap((t) => t.tags || [])));

  return (
    // <div className="w-full md:w-72 bg-slate-800 p-4 flex flex-col gap-6">
    <div className="h-screen bg-slate-800 p-4 flex flex-col gap-6">
      {" "}
      <h1 className="text-xl font-bold text-white">🧠 AI Todos</h1>
      {/* Filters */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => filterStatus("all")}
          className="text-left text-white bg-slate-700 p-2 rounded-lg">
          All Tasks ({todos.length})
        </button>

        <button
          onClick={() => filterStatus("completed")}
          className="text-left text-green-400 bg-slate-700 p-2 rounded-lg">
          Completed ({completedCount})
        </button>

        <button
          onClick={() => filterStatus("pending")}
          className="text-left text-yellow-400 bg-slate-700 p-2 rounded-lg">
          Pending ({pendingCount})
        </button>
      </div>
      <DateFilter onFilter={filterByDate} />
      {/* Tags */}
      <div>
        <h2 className="text-gray-400 mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="px-2 py-1 bg-slate-700 rounded-lg text-sm text-blue-400">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={refresh}
        className="mt-[185px] bg-slate-700 p-2 rounded-lg text-white">
        Refresh
      </button>
    </div>
  );
}
