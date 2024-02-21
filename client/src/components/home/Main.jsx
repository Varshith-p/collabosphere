import { Link } from "react-router-dom";
import projects from "../../utils/projects";
import QuickAccess from "./QuickAccess";
import ProjectCard from "../project/ProjectCard";

const Main = () => {
  return (
    <div className="py-6 px-[60px]">
      <h1 className="text-2xl 2xl:text-3xl font-medium">Your Work</h1>
      <div className="py-4 flex justify-between">
        <h1 className="font-medium 2xl:text-xl text-gray-700">
          Recent Projects
        </h1>
        <Link to="/user/projects" className="text-blue-700 underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project, ind) => (
          <ProjectCard key={ind} project={project} />
        ))}
      </div>
      <QuickAccess />
    </div>
  );
};

export default Main;
