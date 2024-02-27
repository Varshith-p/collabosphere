import ChangeVisibilityModal from "@/components/project/ChangeVisibilityModal";
import TransferOwnershipModal from "@/components/project/TransferOwnershipModal";
import { Link, useOutletContext } from "react-router-dom";

const Access = () => {
  const [project] = useOutletContext();

  return (
    <div className="px-[60px] py-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-cancelText text-sm">
            <Link to="/user/projects">Projects /</Link>
            <span className="cursor-pointer"> {project.name}</span>
          </p>
          <h1 className="text-2xl 2xl:text-3xl font-medium">Access</h1>
        </div>
      </div>
      <div className="flex flex-col gap gap-6 w-[480px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">Change project visibility</p>
            <p className="text-xs text-cancelText">
              This project is currently {project.visibility}
            </p>
          </div>
          {project.visibility == "Private" ? (
            <ChangeVisibilityModal visibility={"Public"} />
          ) : (
            <ChangeVisibilityModal visibility={"Private"} />
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg">Transfer ownership</p>
            <p className="text-xs text-cancelText">
              Make another member from project as admin
            </p>
          </div>
          <TransferOwnershipModal />
        </div>
      </div>
    </div>
  );
};

export default Access;
