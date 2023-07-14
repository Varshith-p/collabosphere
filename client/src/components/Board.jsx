import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { getTasksGroupedbyColumns } from "../utils/columns"
import Column from "./Column"
import { useState } from "react"

const Board = () => {
  const [columns, setColumns] = useState(getTasksGroupedbyColumns());

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;

    // check if user dragged outside the board
    if(!destination) return;

    // handle column drag
    if(type === 'column') {
      const entries = Array.from(columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const modifiedColumns = new Map(entries);
      setColumns(modifiedColumns)
    }

    const cols = Array.from(columns);
    const startColumnIndex = cols[Number(source.droppableId)]
    const finishColumnIndex = cols[Number(destination.droppableId)]

    const startColumn = {id: startColumnIndex[0], tasks: startColumnIndex[1].tasks};
    const finishColumn = {id: finishColumnIndex[0], tasks: finishColumnIndex[1].tasks};

    if(!startColumn || !finishColumn) return;

    if(source.index === destination.index && startColumn === finishColumn) return;

    const newTasks = startColumn.tasks;
    const [movedTask] = newTasks.splice(source.index, 1);

    if(startColumn.id === finishColumn.id) {
      newTasks.splice(destination.index, 0, movedTask);
      const newCol = {id: startColumn.id, tasks: newTasks}
      const newColumns = new Map(columns);
      newColumns.set(startColumn.id, newCol)
      setColumns(newColumns)
    } else {
      const finishTasks = Array.from(finishColumn.tasks);
      finishTasks.splice(destination.index, 0, movedTask);

      const newColumns = new Map(columns);
      const newCol = {id: startColumn.id, tasks: newTasks};
      newColumns.set(startColumn.id, newCol)
      newColumns.set(finishColumn.id, {
        id: finishColumn.id,
        tasks: finishTasks
      })
      setColumns(newColumns)
    }
  }

  return (
    <div className="pt-24 px-8 pl-72 max-w-7xl">
      <h1 className="font-semibold text-2xl pb-6">DEMO Board</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column" >
          {(provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                Array.from(columns.entries()).map(([id, column], index) => (
                  <Column key={id} id={id} tasks={column.tasks} index={index} />
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board