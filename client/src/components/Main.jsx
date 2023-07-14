import projects from "../utils/projects"
import QuickAccess from "./QuickAccess"

const Main = () => {
  return (
    <div className="pt-24 px-8 max-w-7xl m-auto">
      <h1 className="text-xl font-medium">Your Work</h1>
      <div className="mt-6 mb-2 flex justify-between">
        <h1 className="font-medium text-gray-700">Recent Projects</h1>
        <a href="#" className="text-blue-700 underline">View all</a>
      </div>
      <div className="flex space-x-8">
        {projects.map((project, ind) => (
          <div key={ind} className="w-64 shadow-md border border-gray-300 p-4 rounded-md grid grid-cols-2 space-y-2 hover:scale-105 transition-all cursor-pointer">
            <div className="col-span-2 border-b border-gray-300">
              <h1 className="text-2xl font-medium">{project.name}</h1>
              <p className="">{project.type}</p>
            </div>
            <p>Open tasks</p><span className="bg-gray-200 w-fit justify-self-end rounded-full px-3 text-sm">{project.openTasks}</span>
            <p>Done tasks</p><span className="bg-gray-200 w-fit justify-self-end rounded-full px-3 text-sm">{project.doneTasks}</span>
          </div>
        ))}
      </div>
      <QuickAccess />
    </div>
  )
}

export default Main