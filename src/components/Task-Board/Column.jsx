import { useDataContext } from "../../context/DataContext";
import TaskCard from "./About-Task/TaskCard";
import TaskForm from "./About-Task/TaskForm";
import { Draggable } from "@hello-pangea/dnd";
import { isToday } from "date-fns";

function Column({ status, priorityFilter }) {
    const { tasks, filter, search } = useDataContext();

    const filterKeyMap = {
        "All Tasks": "all",
        "High Priority": "high",
        "Due Today": "today",
    };

    const key = filterKeyMap[filter];

    const filteredTasks = tasks.filter((task) => {
        if (task.status !== status) return false;

        if (key === "high" && task.priority !== "High") return false;
        if (key === "today" && !isToday(new Date(task.dueDate))) return false;

        if (priorityFilter && priorityFilter !== "All" && task.priority !== priorityFilter)
            return false;

        if (search && !task.title.toLowerCase().includes(search.toLowerCase()))
            return false;

        return true;
    });

    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    const sortedTasks = filteredTasks.sort(
        (a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    );

    return (
        <div className="p-2">
            <TaskForm status={status} />
            {sortedTasks.map((task, index) => (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <TaskCard task={task} />
                        </div>
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default Column;