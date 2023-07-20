/* eslint-disable react/prop-types */
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

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
      className="bg-white rounded-sm space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center px-5 py-3">
        <p className="font-normal">{task.title}</p>
        {/* <button className="text-red-500 hover:text-red-600"> */}
        <button className="">
          {/* <XCircleIcon className="ml-5 h-8 w-8" /> */}
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
