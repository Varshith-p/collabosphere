import UploadFileModal from "@/components/project/UploadFileModal";
import formatDate from "@/utils/formatDate";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";

const Files = () => {
  const [project] = useOutletContext();
  const { resources } = useSelector((store) => store.project);

  return (
    <div className="px-[60px] py-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-cancelText text-sm">
            <Link to="/user/projects">Projects /</Link>
            <span className="cursor-pointer"> {project.name}</span>
          </p>
          <h1 className="text-2xl 2xl:text-3xl font-medium">Resources</h1>
        </div>
        <UploadFileModal />
      </div>
      <div className="rounded-[6px] border border-border-color">
        <div className="w-full text-sm 2xl:text-base">
          <div className="bg-[#f6f8fa] grid grid-cols-6 items-center">
            <p className="font-medium py-2 px-4 col-span-2">Name</p>
            <p className="font-medium py-2 px-4 col-span-2">Uploaded By</p>
            <p className="font-medium py-2 px-4">Time</p>
            <p className="font-medium py-2 px-4 text-right">Actions</p>
          </div>
          <div className="">
            {resources?.map((resource, index) => (
              <div
                key={index}
                className="hover:bg-[#f6f8fa] grid grid-cols-6 items-center justify-between border-t border-border-color"
              >
                <p className="cursor-pointer text-primary col-span-2 py-2 px-4">
                  <Link to={`${project._id}/board`}>{resource.name}</Link>
                </p>
                <div className="col-span-2 py-2 px-4">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <img src="/avatar.svg" alt="avatar" className="w-5 h-5" />
                    <p>{resource.uploadedBy.name}</p>
                  </div>
                </div>
                <p className=" text-cancelText py-2 px-4">
                  {formatDate(resource.updatedAt)}
                </p>
                <p className=" text-cancelText justify-self-end cursor-pointer py-2 px-4">
                  <MoreHorizontal />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
