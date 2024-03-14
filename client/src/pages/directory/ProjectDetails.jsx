import { Link, useOutletContext } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProjectDetails = () => {
  const [project] = useOutletContext();

  return (
    <div className="px-[60px] py-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-cancelText text-sm">
            <Link to="/user/directory">Directory /</Link>
            <span className="cursor-pointer"> {project.name}</span>
          </p>
          <h1 className="text-2xl 2xl:text-3xl font-medium">Details</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-between">
        <div className="flex flex-col gap-6 w-[400px] 2xl:w-[460px]">
          <div className="flex flex-col gap-2">
            <p>Name</p>
            <p className="h-10 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center">
              {project?.name}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p>Description</p>
            <div className="p-3 rounded-[6px] h-32 overflow-auto border border-border-color bg-white focus:outline-none">
              {project.description}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-[400px] 2xl:w-[460px]">
          <p>Participants</p>
          <div className="flex flex-col gap-3">
            {project?.participants?.map((user, index) => (
              <div
                key={index}
                className="py-2 px-3 cursor-pointer bg-primary-foreground rounded-[6px] flex gap-2 items-center"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`${user.image || "/avatar.svg"}`}
                    alt="Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <p className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="text-sm">{user.email}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
