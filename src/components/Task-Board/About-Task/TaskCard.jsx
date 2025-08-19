import { useState } from "react";
import { useDataContext } from "../../../context/DataContext";

function TaskCard({ task }) {
  const { tasks, setTasks, darkMode } = useDataContext();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(task);

  if (!task) return null; 

  const handleDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setTasks(prev => prev.map(t => (t.id === task.id ? form : t)));
    setEditing(false);
  };

  return (
    <div className={`p-2 rounded mb-2 shadow ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'}`}>
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
            <button type="submit" className="flex-1 bg-green-500 text-white py-1 rounded">
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-900 text-white py-1 rounded">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h3 className="font-bold">Title : {task.title}</h3>
          <p className="text-sm">Description : {task.description}</p>
          <p className="text-sm">Priority: {task.priority}</p>
          <p className="text-sm">Due Date: {task.dueDate}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setEditing(true)} className="flex-1 bg-yellow-500 text-white py-1 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-1 rounded">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;