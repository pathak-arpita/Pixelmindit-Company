import { useState } from "react";
import Column from "./Column";
import ProgressBar from "./Progress-Bar/ProgressBar";
import { useDataContext } from "../../context/DataContext";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const columns = ["Todo", "In Progress", "Finish"];

function Board() {
  const { tasks, setTasks, darkMode, search } = useDataContext();
  const [expandedColumn, setExpandedColumn] = useState(null);

  const [columnFilters, setColumnFilters] = useState({
    Todo: "All",
    "In Progress": "All",
    Finish: "All",
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ProgressBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: darkMode ? "#1e1e1e" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  transition: "all 0.3s",
                  minHeight: expandedColumn === col ? "400px" : "auto",
                }}
                className="rounded-lg p-3 shadow-md border flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold">{col}</h2>

                  <div className="relative flex items-center">
                    <select
                      value={columnFilters[col]}
                      onChange={(e) => handleFilterChange(col, e.target.value)}
                      className="border rounded py-1 pl-2 pr-6 text-sm focus:outline-none appearance-none w-auto"
                    >
                      <option value="All">All</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <svg
                      className={`w-4 h-4 absolute right-2 pointer-events-none ${darkMode ? "text-white" : "text-black"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                </div>
                <Column status={col} priorityFilter={columnFilters[col]} />
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