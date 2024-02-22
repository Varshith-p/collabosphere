/* eslint-disable react/prop-types */

const ProjectCard = ({ project }) => {
  return (
    <div className="w-full shadow border border-border-color rounded cursor-pointer">
      <div className="border-b border-border-color flex flex-col gap-1 bg-[#FAFAFA] p-4">
        <h1 className="font-medium 2xl:text-lg">{project.name}</h1>
        <span className="text-xs 2xl:text-base text-[#61656C]">
          Software Project
        </span>
      </div>
      <div className="grid grid-cols-2 gap-y-4 items-center p-4">
        <p>Open tasks</p>
        <span className="bg-cancel text-cancelText font-medium w-fit justify-self-end rounded-full px-3 text-sm 2xl:text-base">
          {project.openTasks}
        </span>
        <p>Done tasks</p>
        <span className="bg-cancel text-cancelText font-medium w-fit justify-self-end rounded-full px-3 text-sm 2xl:text-base">
          {project.doneTasks}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
