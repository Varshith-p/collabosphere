/* eslint-disable react/prop-types */

import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard";
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
          <h1 className="text-2xl 2xl:text-3xl font-medium">Directory</h1>
          <div className="flex gap-2 items-center w-[300px] px-2 h-10 border border-border-color rounded-[6px] ">
            <div>
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="search directory"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 focus:outline-none rounded-[6px]"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {filteredProjects?.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
