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
      <div className="rounded-[6px] border border-border-color">
        <table className="py-4 w-full text-sm 2xl:text-base">
          <thead>
            <tr className="bg-[#f6f8fa]">
              <th className="font-medium px-4 py-2 text-left w-2/5">Issue</th>
              <th className="font-medium px-4 py-2 text-left w-1/5">Project</th>
              <th className="font-medium px-4 py-2 text-left w-1/5">Status</th>
              <th className="font-medium px-4 py-2 text-right w-1/5">
                Assigned by
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="hover:bg-[#f6f8fa] rounded-[6px]">
                <td className="px-4 py-2 border-t border-border-color cursor-pointer">
                  {task.name}
                </td>
                <td className="px-4 py-2 border-t border-border-color text-cancelText">
                  {task.project}
                </td>
                <td className="px-4 py-2 border-t border-border-color text-cancelText">
                  {task.project}
                </td>
                <td className="px-4 py-2 border-t border-border-color flex w-full h-full justify-end">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <img src="/avatar.svg" alt="avatar" className="w-6 h-6" />
                    <p>{task.assignedBy}</p>
                  </div>
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
