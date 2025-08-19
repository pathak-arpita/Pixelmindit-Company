import { useState } from "react";

export default function TaskForm({ status, setTasks }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "Low", dueDate: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      ...form,
      status,
    };

    setTasks((prev) => [...prev, newTask]);
    setForm({ title: "", description: "", priority: "Low", dueDate: "" });
    setOpen(false);
  };

  return (
    <div className="mb-3">
      {open ? (
        <form onSubmit={handleSubmit} className="space-y-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-1 border rounded"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-1 border rounded"
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full p-1 border rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full p-1 border rounded"
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 bg-green-500 text-white py-1 rounded">Add</button>
            <button type="button" onClick={() => setOpen(false)} className="flex-1 bg-gray-400 text-white py-1 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full py-1 bg-blue-500 text-white rounded"
        >
          + Add Task
        </button>
      )}
    </div>
  );
}
