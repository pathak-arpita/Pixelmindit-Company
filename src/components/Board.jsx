import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import Column from "./Column";

const columns = ["Todo", "In Progress", "Done"];

export default function Board({ tasks, setTasks, filter, search, darkMode }) {
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
    <DragDropContext onDragEnd={handleDragEnd} style={{ background: darkMode ? "yellow" : "pink" }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {columns.map((col) => (
          <Droppable key={col} droppableId={col}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{col}</h2>
                <Column
                  status={col}
                  tasks={tasks}
                  setTasks={setTasks}
                  filter={filter}
                  search={search}
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
