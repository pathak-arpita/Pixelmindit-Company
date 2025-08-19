import { useState } from "react";

export default function TaskCard({ task, setTasks }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(task);

  const handleDelete = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTasks((prev) => prev.map((t) => (t.id === task.id ? form : t)));
    setEditing(false);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded mb-2 shadow">
      {editing ? (
        <form onSubmit={handleSave} className="space-y-2">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-1 border rounded"
          />
          <textarea
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
            <button type="submit" className="flex-1 bg-green-500 text-white py-1 rounded">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-400 text-white py-1 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="font-bold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs">Priority: {task.priority}</p>
          <p className="text-xs">Due: {task.dueDate}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(true)}
              className="flex-1 bg-yellow-500 text-white py-1 rounded"
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
