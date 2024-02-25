/* eslint-disable react/prop-types */
import { Trash } from "lucide-react";

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
      <div className="flex justify-between items-center p-2">
        <p className="text-sm 2xl:text-base">{task.summary}</p>
        <Trash
          size={14}
          onClick={() => console.log("first")}
          className="text-cancelText cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TaskCard;
