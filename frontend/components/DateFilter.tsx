import { useState } from "react";

interface Props {
  onFilter: (start: string, end: string) => void;
}

export default function DateFilter({ onFilter }: Props) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="bg-slate-700 p-2 rounded text-white w-full">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="bg-slate-700 p-2 rounded text-white"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="bg-slate-700 p-2 rounded text-white w-full"
      />

      <button
        onClick={() => onFilter(startDate, endDate)}
        className="bg-blue-500 px-4 py-2 rounded">
        Filter
      </button>
    </div>
  );
}
