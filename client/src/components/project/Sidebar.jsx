/* eslint-disable react/prop-types */
import {
  BookLock,
  File,
  Info,
  KanbanSquare,
  MessageCircleMore,
  Settings,
} from "lucide-react";
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
          to="board"
          className={`${
            pathname.includes("/board") && "bg-primary-foreground"
          } hover:bg-primary-foreground rounded-[6px] p-2 flex gap-2 items-center`}
        >
          <KanbanSquare size={20} />
          <span>Board</span>
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
        <Link
          to="chat"
          className={`${
            pathname.includes("/chat") && "bg-primary-foreground"
          } hover:bg-primary-foreground rounded-[6px] p-2 flex gap-2 items-center`}
        >
          <MessageCircleMore size={20} />
          <span>Chat</span>
        </Link>
        <div className="text-sm text-cancelText p-2 my-2 flex items-center gap-2 border-b border-border-color">
          <Settings size={16} />
          <span>Project Settings</span>
        </div>
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
          to="access"
          className={`${
            pathname.includes("/access") && "bg-primary-foreground"
          } hover:bg-primary-foreground rounded-[6px] p-2 flex gap-2 items-center`}
        >
          <BookLock size={20} />
          <span>Access</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
