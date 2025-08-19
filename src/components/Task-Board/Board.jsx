import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import { useDataContext } from "../../context/DataContext";
import { useState } from "react";

const columns = ["Todo", "In Progress", "Finish"];

function Board() {
  const { tasks, setTasks, darkMode } = useDataContext();
  const [expandedColumn, setExpandedColumn] = useState(null); // track which column is expanded

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updated = tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: result.destination.droppableId }
        : task
    );
    setTasks(updated);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
                <h2 className="text-lg font-semibold text-center mb-3">{col}</h2>

                <Column
                  status={col}
                />

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
