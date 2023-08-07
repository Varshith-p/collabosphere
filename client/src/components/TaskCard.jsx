/* eslint-disable react/prop-types */
import {
  EllipsisVerticalIcon,
  PencilIcon,
  UserIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

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
        <Menu>
          <MenuHandler>
            <button className="">
              {/* <XCircleIcon className="ml-5 h-8 w-8" /> */}
              <EllipsisVerticalIcon className="h-5 w-5" />
            </button>
          </MenuHandler>
          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <PencilIcon className="w-4" /> Edit
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <UserIcon className="w-4" /> Assign member
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <TrashIcon className="w-4" />
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default TaskCard;
