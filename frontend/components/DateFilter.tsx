import { useState } from "react";

interface Props {
  onFilter: (start: string, end: string) => void;
}

export default function DateFilter({ onFilter }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    // <div className="bg-slate-300 p-2 rounded text-white w-full">
    <div
      className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg
">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="text-left bg-gray-200 dark:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
      />

      <button
        onClick={() => onFilter(startDate, endDate)}
        className="bg-blue-400 px-4 py-2 rounded cursor-pointer">
        Filter
      </button>
    </div>
  );
}
