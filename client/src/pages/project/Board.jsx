/* eslint-disable react/prop-types */
import { DragDropContext } from "react-beautiful-dnd";
import { getTasksGroupedbyColumns } from "../../utils/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Column from "../../components/project/Column";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Loading from "../Loading";
import { updateTaskStatus } from "@/redux/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const Board = () => {
  const [project] = useOutletContext();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [columns, setColumns] = useState(
    getTasksGroupedbyColumns(project?.tasks)
  );
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (project) {
      setColumns(getTasksGroupedbyColumns(project.tasks));
    }
  }, [project]);

  const handleOnDragEnd = async (result) => {
    const { destination, source } = result;

    // check if user dragged outside the board
    if (!destination) return;

    const cols = Array.from(columns);
    const startColumnIndex = cols[Number(source.droppableId)];
    const finishColumnIndex = cols[Number(destination.droppableId)];

    const startColumn = {
      id: startColumnIndex[0],
      tasks: startColumnIndex[1].tasks,
    };
    const finishColumn = {
      id: finishColumnIndex[0],
      tasks: finishColumnIndex[1].tasks,
    };

    if (!startColumn || !finishColumn) return;

    if (source.index === destination.index && startColumn === finishColumn)
      return;

    const newTasks = startColumn.tasks;
    const [movedTask] = newTasks.splice(source.index, 1);

    if (startColumn.id === finishColumn.id) {
      newTasks.splice(destination.index, 0, movedTask);
      const newCol = { id: startColumn.id, tasks: newTasks };
      const newColumns = new Map(columns);
      newColumns.set(startColumn.id, newCol);
      setColumns(newColumns);
    } else {
      const finishTasks = Array.from(finishColumn.tasks);
      finishTasks.splice(destination.index, 0, movedTask);

      const newColumns = new Map(columns);
      const newCol = { id: startColumn.id, tasks: newTasks };
      newColumns.set(startColumn.id, newCol);
      newColumns.set(finishColumn.id, {
        id: finishColumn.id,
        tasks: finishTasks,
      });

      dispatch(updateTaskStatus({ ...movedTask, status: finishColumn.id }));
      setColumns(newColumns);
    }
  };

  if (!project) {
    return <Loading />;
  }

  return (
    <div className="px-[60px] py-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-cancelText text-sm">
          <Link to="/user/projects">Projects /</Link>
          <span className="cursor-pointer"> {project.name}</span>
        </p>
        <h1 className="text-2xl 2xl:text-3xl font-medium">Board</h1>
      </div>
      <div className="flex gap-3 items-center">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div
              className={`h-10 p-2 rounded-[6px] cursor-pointer focus:outline-none border border-border-color flex items-center w-[240px] 2xl:w-[280px]`}
            >
              <p className="w-full">{filter}</p>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] 2xl:w-[280px] flex flex-col gap-1 text-sm 2xl:text-base font-geist font-light">
            <div
              onClick={() => {
                setFilter("All");
                setOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-primary-foreground rounded"
            >
              All
            </div>
            <div
              onClick={() => {
                setFilter("Me");
                setOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-primary-foreground rounded"
            >
              Me
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex -space-x-3 items-center">
          {project.participants?.map((participant, index) => (
            <Avatar key={index} className="h-8 w-8">
              <AvatarImage
                src={`${participant.image || "/avatar.svg"}`}
                alt="Avatar"
                className="object-cover"
              />
              <AvatarFallback>{participant.name[0]}</AvatarFallback>
            </Avatar>
          ))}
          {/* {project.participants?.length > 3 && (
            <div className="w-9 h-9 text-cancelText rounded-full border border-border-color bg-cancel flex justify-center items-center cursor-pointer">
              +{project.participants?.length - 3}
            </div>
          )} */}
        </div>
      </div>
      <div className="w-full">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex gap-4">
            {Array.from(columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                id={id}
                tasks={
                  filter == "All"
                    ? column.tasks
                    : column.tasks.filter(
                        (task) => task.assignee._id == user._id
                      )
                }
                index={index}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
