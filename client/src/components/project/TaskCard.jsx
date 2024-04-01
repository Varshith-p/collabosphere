/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskViewModal from "./TaskViewModal";

const TaskCard = ({ task, innerRef, draggableProps, dragHandleProps }) => {
  const { project, user } = useSelector((store) => store.project);
  return (
    <div
      className="bg-white rounded-[6px] border border-border-color"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center">
        <TaskViewModal
          summary={task.summary}
          description={task.description}
          assignee={task.assignee}
        />
        {project.admin == user._id && <DeleteTaskModal id={task._id} />}
      </div>
    </div>
  );
};

export default TaskCard;
