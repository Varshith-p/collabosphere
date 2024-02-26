/* eslint-disable react/prop-types */
import DeleteTaskModal from "./DeleteTaskModal";

const TaskCard = ({
  id,
  task,
  index,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  return (
    <div
      className="bg-white rounded-[6px] border border-border-color"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm 2xl:text-base p-2">{task.summary}</p>
        <DeleteTaskModal id={task._id} />
      </div>
    </div>
  );
};

export default TaskCard;
