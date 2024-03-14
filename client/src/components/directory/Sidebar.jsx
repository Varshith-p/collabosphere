/* eslint-disable react/prop-types */
import { File, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ project }) => {
  const { pathname } = useLocation();

  return (
    <aside className="w-[240px] 2xl:w-[280px] py-6 px-4 flex flex-col gap-6 border-r border-border-color">
      <div className="font-medium text-lg 2xl:text-xl truncate px-2">
        {project?.name}
      </div>
      <div className="flex flex-col gap-1">
        <Link
          to="details"
          className={`${
            pathname.includes("/details") && "bg-primary-foreground"
          } hover:bg-primary-foreground rounded-[6px] p-2 flex gap-2 items-center`}
        >
          <Info size={20} />
          <span>Details</span>
        </Link>
        <Link
          to="resources"
          className={`${
            pathname.includes("/resources") && "bg-primary-foreground"
          } hover:bg-primary-foreground rounded-[6px] p-2 flex gap-2 items-center`}
        >
          <File size={20} />
          <span>Resources</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
