import projects from "../utils/projects";
import QuickAccess from "./QuickAccess";

const Main = () => {
  return (
    <div className="pt-24 px-8 max-w-7xl m-auto">
      <h1 className="text-xl font-medium">Your Work</h1>
      <div className="mt-6 mb-2 flex justify-between">
        <h1 className="font-medium text-gray-700">Recent Projects</h1>
        <a href="#" className="text-blue-700 underline">
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4">
        {projects.map((project, ind) => (
          <div
            key={ind}
            className="md:w-64 shadow-md border border-gray-300 p-4 rounded-md space-y-2 md:hover:scale-105 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-2 pb-4 border-b">
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                <img src="/vite.svg" className="w-4/6" alt="logo" />
              </div>
              <div>
                <h1 className="font-medium">{project.name}</h1>
                <span className="text-xs">Software Project</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 items-center">
              <p>Open tasks</p>
              <span className="bg-gray-200 w-fit justify-self-end my-0 rounded-full px-3 text-sm">
                {project.openTasks}
              </span>
              <p>Done tasks</p>
              <span className="bg-gray-200 w-fit justify-self-end rounded-full px-3 text-sm">
                {project.doneTasks}
              </span>
            </div>
          </div>
        ))}
      </div>
      <QuickAccess />
    </div>
  );
};

export default Main;
