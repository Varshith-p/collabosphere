import tasks from "../../utils/tasks";

const QuickAccess = () => {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 pb-4">
        <h1 className="font-medium 2xl:text-xl">Assigned to me</h1>
        <span className="bg-cancel text-cancelText font-medium w-fit justify-self-end rounded-full px-3 text-sm 2xl:text-base">
          {tasks.length}
        </span>
      </div>
      <div className="rounded border border-primary-foreground">
        <table className="py-4 w-full table-auto overflow-auto ">
          <thead>
            <tr className="bg-[#FAFAFA]">
              <th className="font-medium p-4 border-b text-left border-primary-foreground">
                Issue
              </th>
              <th className="font-medium p-4 border-b border-primary-foreground">
                Project
              </th>
              <th className="font-medium p-4 border-b text-right border-primary-foreground">
                Assigned by
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="">
                <td className="p-4 cursor-pointer">{task.name}</td>
                <td className="p-4 text-center">{task.project}</td>
                <td className="p-4 text-right flex w-full justify-end">
                  <p className="w-6 h-6 2xl:w-8 2xl:h-8 flex items-center justify-center text-sm 2xl:text-base bg-primary rounded-full text-white">
                    {task.assignedBy[0]}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default QuickAccess;
