import { useState } from "react";
import Column from "./Column";
import ProgressBar from "./Progress-Bar/ProgressBar";
import { useDataContext } from "../../context/DataContext";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ColumnIcon } from "./icons";

const columns = ["Todo", "In Progress", "Finish"];
const priorityOrder = { Low: 1, Medium: 2, High: 3 };

function Board() {
  const { tasks, setTasks, darkMode } = useDataContext();
  const [columnFilters, setColumnFilters] = useState({
    Todo: "Default",
    "In Progress": "Default",
    Finish: "Default",
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: result.destination.droppableId }
        : task
    );
    setTasks(updated);
  };

  const handleFilterChange = (col, value) => {
    setColumnFilters((prev) => ({ ...prev, [col]: value }));
  };

  const getSortedTasks = (col) => {
    const filtered = tasks.filter((task) => task.status === col);

    if (columnFilters[col] === "LowToHigh") {
      return [...filtered].sort((a, b) => {
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    }

    if (columnFilters[col] === "HighToLow") {
      return [...filtered].sort((a, b) => {
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    }

    return [...filtered].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProgressBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  boxShadow: darkMode
                    ? "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4)"
                    : "0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(81, 81, 81, 0.4)",
                  transition: "all 0.3s",
                }}
                className="rounded-2xl p-4 shadow-lg flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ColumnIcon />
                    <h2 className="text-xl font-semibold flex">{col}</h2>
                  </div>
                  <div className="relative flex items-center">
                    <select
                      value={columnFilters[col]}
                      onChange={(e) => handleFilterChange(col, e.target.value)}
                      className="border rounded-lg py-1 pl-2 pr-8 text-sm shadow bg-white text-gray-700 focus:outline-none appearance-none"
                    >
                      <option value="Default">By Priority</option>
                      <option value="LowToHigh">Priority: Low → High</option>
                      <option value="HighToLow">Priority: High → Low</option>
                    </select>
                    <svg
                      className={`w-4 h-4 absolute right-2 pointer-events-none ${darkMode ? "text-black" : "text-black"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <Column status={col} tasks={getSortedTasks(col)} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default Board;