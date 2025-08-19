import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";
import { useDataContext } from "../../context/DataContext";

const columns = ["Todo", "In Progress", "Finish"];

function Board() {
  const { tasks, setTasks, darkMode } = useDataContext();

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
    <DragDropContext
      onDragEnd={handleDragEnd}
      style={{ background: darkMode ? "#1a1a1a" : "#f5f5f5", transition: "background 0.3s" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ background: darkMode ? "#1e1e1e" : "#fff", color: darkMode ? "#fff": "#000" }}
                className={`rounded-lg p-3 shadow-md border`}
              >
                <h2 className="text-lg font-semibold mb-2 text-center mb-7">{col}</h2>
                <Column status={col} />
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