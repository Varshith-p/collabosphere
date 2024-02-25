/* eslint-disable react/prop-types */
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getTasksGroupedbyColumns } from "../../utils/columns";
import Column from "../../components/Column";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import Loading from "../Loading";
// import MobileSidebar from "../../components/MobileSidebar";

const Board = () => {
  const [project] = useOutletContext();
  const [columns, setColumns] = useState(
    getTasksGroupedbyColumns(project?.tasks)
  );

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;

    // check if user dragged outside the board
    if (!destination) return;

    // handle column drag
    if (type === "column") {
      const entries = Array.from(columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const modifiedColumns = new Map(entries);
      setColumns(modifiedColumns);
    }

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
      setColumns(newColumns);
    }
  };

  if (!project) {
    return <Loading />;
  }

  return (
    <div className="px-[60px] py-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-cancelText">
            <Link to="/user/projects">Projects /</Link>
            <span className="cursor-pointer"> {project.name}</span>
          </p>
          <h1 className="text-xl 2xl:text-2xl font-medium">Board</h1>
        </div>
        <button className="h-10 bg-primary text-white flex items-center rounded px-4">
          Save
        </button>
      </div>
      <div className="flex gap-3 items-center">
        {/* <form
          action=""
          className="border border-gray-400 text-sm flex h-full items-center w-fit mb-4 gap-x-1 bg-white rounded-md px-2 py-1"
        > */}
        <div className="flex gap-2 w-[240px] 2xl:w-[280px] p-2 items-center h-10 border border-border-color rounded-[6px]">
          {/* <MagnifyingGlassIcon className="h-4 w-4 text-gray-800" /> */}
          <Search size={18} stroke="#61656C" />
          <input
            type="text"
            className="focus:outline-none focus:border-0 w-full"
            placeholder="Search"
          />
        </div>
        {/* <button hidden>Search</button>   */}
        {/* </form> */}
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
          <Droppable droppableId="board" direction="horizontal" type="column">
            {(provided) => (
              <div
                className="flex gap-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Array.from(columns.entries()).map(([id, column], index) => (
                  <Column key={id} id={id} tasks={column.tasks} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
