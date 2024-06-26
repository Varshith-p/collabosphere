/* eslint-disable react/prop-types */
import { getTasksGroupedbyColumns } from "@/utils/columns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectsContainer = ({ projects }) => {
  const [query, setQuery] = useState("");
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <section className="py-6 px-[60px]">
      <div className="flex flex-col gap-6">
        <div className="flex w-full justify-between">
          <h1 className="text-2xl 2xl:text-3xl font-medium">Projects</h1>
          <Link
            to="new"
            className="h-10 bg-primary text-white flex items-center rounded px-4"
          >
            Create Project
          </Link>
        </div>
        <div className="flex gap-2 items-center w-[300px] px-2 h-10 border border-border-color rounded-[6px] ">
          <div>
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 focus:outline-none rounded-[6px]"
          />
        </div>
        <div className="rounded-[6px] border border-border-color">
          <table className="py-4 w-full table-auto text-left text-sm 2xl:text-base">
            <thead>
              <tr className="bg-[#f6f8fa]">
                <th className="font-medium px-4 py-2 text-left">Name</th>
                <th className="font-medium px-4 py-2 text-left">Visibility</th>
                <th className="font-medium px-4 py-2 text-left">Members</th>
                <th className="font-medium px-4 py-2">To do</th>
                <th className="font-medium px-4 py-2">In Progress</th>
                <th className="font-medium px-4 py-2">Completed</th>
                <th className="font-medium px-4 py-2">Lead</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => {
                const cols = getTasksGroupedbyColumns(project.tasks);
                return (
                  <tr key={index} className="hover:bg-[#f6f8fa] rounded-[6px]">
                    <td className="px-4 py-2 border-t border-border-color cursor-pointer text-primary">
                      <Link to={`${project._id}/board`}>{project.name}</Link>
                    </td>
                    <td className="px-4 py-2 border-t border-border-color text-cancelText">
                      {project.visibility}
                    </td>
                    <td className="px-4 py-2 border-t border-border-color text-cancelText">
                      {project.participants.length} Members
                    </td>
                    <td className="px-4 py-2 border-t border-border-color text-cancelText">
                      {cols.get("Todo").tasks.length == 1
                        ? `1 Task`
                        : `${cols.get("Todo").tasks.length} Tasks`}
                    </td>
                    <td className="px-4 py-2 border-t border-border-color text-cancelText">
                      {cols.get("In Progress").tasks.length == 1
                        ? `1 Task`
                        : `${cols.get("In Progress").tasks.length} Tasks`}
                    </td>
                    <td className="px-4 py-2 border-t border-border-color text-cancelText">
                      {cols.get("Done").tasks.length == 1
                        ? `1 Task`
                        : `${cols.get("Done").tasks.length} Tasks`}
                    </td>
                    <td className="px-4 py-2 border-t border-border-color">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`${
                              project.participants[0].image || "/avatar.svg"
                            }`}
                            alt="Avatar"
                            className="object-cover"
                          />
                          <AvatarFallback>
                            {project.participants[0].name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <p>{project.participants[0].name}</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
