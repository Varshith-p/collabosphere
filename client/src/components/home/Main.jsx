import { Link } from "react-router-dom";
import ProjectCard from "../project/ProjectCard";
import { useSelector } from "react-redux";
import QuickAccess from "./QuickAccess";
import getQuickAccess from "@/utils/getQuickAccess";

const Main = () => {
  const { projects, user } = useSelector((store) => store.project);
  const quickAccess = getQuickAccess(projects, user._id);

  console.log(quickAccess);

  return (
    <div className="py-6 px-[60px] bg-white">
      <h1 className="text-2xl 2xl:text-3xl font-medium">Hello, Varshith.</h1>
      <div className="py-4 flex justify-between">
        <h1 className="font-medium 2xl:text-xl text-gray-700">
          Recent Projects
        </h1>
        <Link to="/user/projects" className="text-blue-700 underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.slice(0, 3).map((project, ind) => (
          <ProjectCard key={ind} project={project} />
        ))}
      </div>
      <QuickAccess quickAccess={quickAccess} />
    </div>
  );
};

export default Main;
