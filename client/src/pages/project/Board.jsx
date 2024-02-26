/* eslint-disable react/prop-types */
import { DragDropContext } from "react-beautiful-dnd";
import { getTasksGroupedbyColumns } from "../../utils/columns";
import Column from "../../components/project/Column";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Loading from "../Loading";
import { updateTaskStatus } from "@/redux/project/projectSlice";
import { useDispatch } from "react-redux";
// import MobileSidebar from "../../components/MobileSidebar";

const Board = () => {
  const [project] = useOutletContext();
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(
    getTasksGroupedbyColumns(project?.tasks)
  );

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
        <p className="text-cancelText">
          <Link to="/user/projects">Projects /</Link>
          <span className="cursor-pointer"> {project.name}</span>
        </p>
        <h1 className="text-xl 2xl:text-2xl font-medium">Board</h1>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-2 w-[240px] 2xl:w-[280px] p-2 items-center h-10 border border-border-color rounded-[6px]">
          <Search size={18} stroke="#61656C" />
          <input
            type="text"
            className="focus:outline-none focus:border-0 w-full"
            placeholder="Search"
          />
        </div>
        <div className="flex -space-x-5 items-center">
          {project.participants?.map((participant, index) => (
            <img
              key={index}
              src="/avatar.svg"
              alt="avatar"
              className="w-10 h-10"
            />
          ))}
          {project.participants?.length > 3 && (
            <div className="w-9 h-9 text-cancelText rounded-full border border-border-color bg-cancel flex justify-center items-center cursor-pointer">
              +{project.participants?.length - 3}
            </div>
          )}
        </div>
      </div>
      <div className="w-full">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex gap-4">
            {Array.from(columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} tasks={column.tasks} index={index} />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
