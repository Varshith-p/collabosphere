import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getTasksGroupedbyColumns } from "../../utils/columns";
import Column from "../../components/Column";
import { useState } from "react";
// import { Avatar } from "@material-tailwind/react";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import MobileSidebar from "../../components/MobileSidebar";

const Board = () => {
  const [columns, setColumns] = useState(getTasksGroupedbyColumns());

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

  return (
    <div className="">
      <div className="flex gap-x-1 items-center pb-6">
        <MobileSidebar />
        <h1 className="font-medium text-lg md:text-lg">DEMO Board</h1>
      </div>
      <div className="flex md:gap-x-4">
        <form
          action=""
          className="border border-gray-400 text-sm flex h-full items-center w-fit mb-4 gap-x-1 bg-white rounded-md px-2 py-1"
        >
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-800" />
          <input
            type="text"
            className="focus:outline-none focus:border-0 w-36"
            placeholder="Search"
          />
          <button hidden>Search</button>
        </form>
        <div className="flex -space-x-4">
          {/* <Avatar
            variant="circular"
            alt="user 1"
            className="border-2 border-white cursor-pointer w-8 h-8"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <Avatar
            variant="circular"
            alt="user 2"
            className="border-2 border-white cursor-pointer w-8 h-8"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
          />
          <Avatar
            variant="circular"
            alt="user 5"
            className="border-2 border-white cursor-pointer w-8 h-8"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
          /> */}
        </div>
        <div className="w-8 h-8 text-gray-600 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
          <UserPlusIcon className="w-6 h-6" />
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto pb-4"
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
  );
};

export default Board;
