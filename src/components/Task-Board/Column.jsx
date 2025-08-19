import TaskCard from "./About-Task/TaskCard";
import TaskForm from "./About-Task/TaskForm";
import { Draggable } from "@hello-pangea/dnd";

function Column({ status, tasks }) {
    return (
        <div className="p-2">
            <TaskForm status={status} />
            {tasks.map((task, index) => (
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index} >
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