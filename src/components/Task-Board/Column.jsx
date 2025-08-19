import { useDataContext } from "../../context/DataContext";
import TaskCard from "./About-Task/TaskCard";
import TaskForm from "./About-Task/TaskForm";
import { Draggable } from "@hello-pangea/dnd";
import { isToday } from "date-fns";

export default function Column({ status }) {
  const { tasks, filter, search } = useDataContext();

  const filtered = tasks.filter((task) => {
    if (task.status !== status) return false;
    if (filter === "high" && task.priority !== "High") return false;
    if (filter === "today" && !isToday(new Date(task.dueDate))) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-2">
      <TaskForm status={status} />
      {filtered.map((task, index) => (
        <Draggable
          draggableId={task.id.toString()}
          index={index}
          key={task.id}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard task={task} /> {/* pass the task prop */}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
}
