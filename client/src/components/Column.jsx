/* eslint-disable react/prop-types */
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import AddTaskModal from "./project/AddTaskModal";

const Column = ({ id, tasks, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 pb-4 rounded-[6px] w-[240px] 2xl:w-[280px] border border-[#EEEEFF] ${
                  snapshot.isDraggingOver
                    ? "bg-primary-foreground"
                    : "bg-[#FAFAFA]"
                }`}
              >
                <h2 className="flex justify-between font-medium text-sm p-2 text-cancelText">
                  {id}
                  <span className="text-cancelText bg-cancel rounded-full font-normal w-5 h-5 p-1 flex items-center justify-center text-sm">
                    {tasks.length}
                  </span>
                </h2>
                <div className="flex flex-col gap-y-2">
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard
                          task={task}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {id == "Todo" && <AddTaskModal />}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
