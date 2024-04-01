/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const QuickAccess = ({ quickAccess }) => {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 pb-4">
        <h1 className="font-medium 2xl:text-xl">Assigned to me</h1>
        <span className="bg-cancel text-cancelText font-medium w-fit justify-self-end rounded-full px-3 text-sm 2xl:text-base">
          {quickAccess.length}
        </span>
      </div>
      <div className="rounded-[6px] border border-border-color">
        <table className="py-4 w-full text-sm 2xl:text-base">
          <thead>
            <tr className="bg-[#f6f8fa]">
              <th className="font-medium px-4 py-2 text-left w-2/6">Task</th>
              <th className="font-medium px-4 py-2 text-left w-2/6">Project</th>
              <th className="font-medium px-4 py-2 text-left w-1/6">Status</th>
              <th className="font-medium px-4 py-2 text-right w-1/6">
                Assigned by
              </th>
            </tr>
          </thead>
          <tbody>
            {quickAccess.slice(0, 5).map((task, index) => (
              <tr key={index} className="hover:bg-[#f6f8fa] rounded-[6px]">
                <td className="px-4 py-2 border-t border-border-color cursor-pointer text-primary">
                  <Link to={`/user/projects/${task.project}/board`}>
                    {task.summary}
                  </Link>
                </td>
                <td className="px-4 py-2 border-t border-border-color text-cancelText">
                  {task.projectName}
                </td>
                <td className="px-4 py-2 border-t border-border-color text-cancelText">
                  {task.status}
                </td>
                <td className="px-4 py-2 border-t border-border-color flex w-full h-full justify-end">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`${task.addedBy.image || "/avatar.svg"}`}
                        alt="Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback>{task.addedBy.name[0]}</AvatarFallback>
                    </Avatar>
                    <p>{task.addedBy.name}</p>
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
