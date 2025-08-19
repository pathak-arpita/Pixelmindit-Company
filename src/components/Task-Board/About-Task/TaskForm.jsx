import { useState } from "react";
import { useDataContext } from "../../../context/DataContext";

function TaskForm({ status }) {
  const { tasks, setTasks, darkMode } = useDataContext();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "Low", dueDate: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = { id: Date.now().toString(), ...form, status };
    setTasks(prev => [...prev, newTask]);
    setForm({ title: "", description: "", priority: "Low", dueDate: "" });
    setOpen(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const textColor = darkMode ? "text-white" : "text-black";
  const placeholderColor = darkMode ? "placeholder-white" : "placeholder-black";

  return (
    <div className="mb-3 w-full">
      {open ? (
        <form onSubmit={handleSubmit}
          className={`space-y-3 p-4 rounded ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200"}`}
        >
          <div className="flex items-center gap-2">
            <label className="w-24 font-semibold text-right">Title:</label>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`flex-1 p-1 border cursor-pointer rounded ${textColor} ${placeholderColor} focus:outline-none focus:border-gray-400`}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-24 font-semibold text-right">Description:</label>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`flex-1 p-1 border cursor-pointer rounded ${textColor} ${placeholderColor} focus:outline-none focus:border-gray-400`}
            />
          </div>
          <div className="flex items-center gap-2 relative">
            <label className="w-24 font-semibold text-right">Priority:</label>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="flex-1 p-1 border cursor-pointer rounded appearance-none pr-6 focus:outline-none focus:border-gray-400 "
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <div className="absolute right-2 pointer-events-none">
              <svg className={`w-4 h-4 ${darkMode ? "text-white" : "text-black"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <label className="w-24 font-semibold text-right">Due Date:</label>
            <input
              type="date"
              value={form.dueDate}
              min={today}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              style={{ colorScheme: darkMode && "dark", cursor: "pointer" }}
              className={`flex-1 p-1 border rounded appearance-none pr-4 ${textColor} focus:outline-none focus:border-gray-400`}
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-1 rounded text-white bg-green-500">Add</button>
            <button type="button" onClick={() => setOpen(false)} className="flex-1 bg-gray-400 text-white py-1 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-1 rounded text-white bg-green-500"
        >
          + Add Task
        </button>
      )}
    </div>
  );
}

export default TaskForm;