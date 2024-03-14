/* eslint-disable react/prop-types */

import { MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="rounded-[6px] border border-border-color bg-card text-card-foreground shadow-sm flex flex-col">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="text-2xl font-semibold leading-none tracking-tight">
          {project.name}
        </div>
      </div>
      <div className="p-6 pt-0 flex-1 flex flex-col gap-4 justify-between">
        <div className="line-clamp-4">{project.description}</div>
        <Link
          to={`${project._id}/details`}
          className="bg-primary text-white rounded-[6px] py-2 flex justify-center items-center gap-2"
        >
          <span>Open</span>
          <MoveUpRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
