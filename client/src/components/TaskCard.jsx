/* eslint-disable react/prop-types */
import { XCircleIcon } from "@heroicons/react/24/solid"

const TaskCard = ({id, task, index, innerRef, draggableProps, dragHandleProps}) => {
  return (
    <div
        className="bg-white rounded-md space-y-2 drop-shadow-md"
        {...dragHandleProps}
        {...draggableProps}
        ref={innerRef}
    >
        <div className="flex justify-between items-center px-5 py-3">
            <p>{task.title}</p>
            <button className="text-red-500 hover:text-red-600">
                <XCircleIcon className="ml-5 h-8 w-8"/>
            </button>
        </div>
    </div>
  )
}

export default TaskCard