import { useState } from "react";
import { useDataContext } from "../../../context/DataContext";

function TaskCard({ task, isLast }) {
  const { tasks, setTasks, darkMode } = useDataContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(task);

  if (!task) return null;

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTasks(prev => prev.map(t => (t.id === task.id ? form : t)));
    setEditing(false);
  };

  const priorityColor = (p) => {
    switch (p) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-amber-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <div
      className={[
        "rounded-2xl border border-black/5 p-4 shadow-sm transition-shadow hover:shadow-md",
        darkMode ? "bg-gray-700 text-white" : "bg-white text-black",
        !isLast ? "mb-[3%]" : "", 
      ].join(" ")}
      style={{
        boxShadow: darkMode
          ? "2px 1px 6px rgba(252, 251, 244, 0.6)"
          : "2px 1px 6px rgba(67, 67, 67, 0.2)",
      }}
    >
      {editing ? (
        <form onSubmit={handleSave} className="space-y-2">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={`w-full p-2 border rounded focus:outline-none ${
              darkMode ? "text-white bg-gray-600" : "text-black bg-white"
            }`}
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className={`w-full p-2 border rounded focus:outline-none ${
              darkMode ? "text-white bg-gray-600" : "text-black bg-white"
            }`}
          />
          <div className="flex items-center relative">
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className={`flex-1 p-2 border cursor-pointer rounded appearance-none pr-6 focus:outline-none focus:border-gray-400 ${
                darkMode ? "text-white bg-gray-600" : "text-black bg-white"
              }`}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="absolute right-4 pointer-events-none">
              <svg
                className={`w-4 h-4 ${
                  darkMode ? "text-white" : "text-black"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <input
            type="date"
            value={form.dueDate}
            style={{ colorScheme: darkMode && "dark", cursor: "pointer" }}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className={`w-full p-2 border rounded focus:outline-none ${
              darkMode ? "text-white bg-gray-600" : "text-black bg-white"
            }`}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#379837] text-white py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 bg-[#505051] text-white py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <h3
              className={`text-[15px] font-medium ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              {task.title}
            </h3>
          </div>

          <p
            className={`mt-1 text-sm line-clamp-2 ${
              darkMode ? "text-gray-400" : "text-slate-600"
            }`}
          >
            {task.description}
          </p>

          <div
            className={`mt-3 flex items-center justify-between text-xs ${
              darkMode ? "text-gray-300" : "text-slate-500"
            }`}
          >
            <div className="flex items-center gap-1">
              <span
                className={`inline-block h-3 w-3 rounded-full ${priorityColor(
                  task.priority
                )}`}
              ></span>
              <span className="text-[12.5px]">{task.priority}</span>
            </div>
            <time className="tabular-nums text-[12.5px]">
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </time>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 bg-yellow-500 text-white py-0 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;