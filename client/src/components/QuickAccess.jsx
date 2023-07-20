import tasks from "../utils/tasks";

const QuickAccess = () => {
  return (
    <section className="mt-10">
      <div className="border-b border-gray-400 flex pb-1 items-center space-x-2">
        <h1 className="text-xl font-medium">Assigned to me</h1>
        <span className="bg-gray-200 w-fit rounded-full px-3 mt-1 text-xs">
          {tasks.length}
        </span>
      </div>
      <div className="px-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-12 w-full justify-between items-center py-3"
          >
            <div className="col-span-4 cursor-pointer">
              <p className="font-medium">{task.name}</p>
            </div>
            <p className="col-span-4 justify-self-center text-xs">
              {task.project}
            </p>
            <div className="col-span-4 justify-self-end w-8 h-8 rounded-full bg-violet-500 text-white flex justify-center items-center cursor-pointer">
              {task.assignedBy[0]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickAccess;
