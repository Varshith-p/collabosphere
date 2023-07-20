import logo from "../assets/react.svg";
import {
  ViewColumnsIcon,
  ChatBubbleOvalLeftIcon,
  DocumentIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="hidden md:block pt-24 fixed w-64 top-0 bottom-0 border-r bg-gray-50 border-gray-400 px-4">
      <div className="flex items-center space-x-2 pb-4 border-b">
        <div className="w-10 h-10 bg-white flex items-center justify-center">
          <img src={logo} className="w-4/6" alt="logo" />
        </div>
        <div>
          <h1 className="font-medium">Demo</h1>
          <span className="text-xs">Software Project</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        <button className="py-2 px-2 rounded-md flex space-x-2 items-center hover:bg-white hover:shadow-sm">
          <ViewColumnsIcon className="w-6 h-6 pt-1" /> <span>Board</span>
        </button>
        <button className="py-2 px-2 rounded-md flex space-x-2 items-center hover:bg-white hover:shadow-sm">
          <ChatBubbleOvalLeftIcon className="w-6 h-6 pt-1" /> <span>Chat</span>
        </button>
        <button className="py-2 px-2 rounded-md flex space-x-2 items-center hover:bg-white hover:shadow-sm">
          <DocumentIcon className="w-6 h-6 pt-1" /> <span>Resources</span>
        </button>
        <button className="py-2 px-2 rounded-md flex space-x-2 items-center hover:bg-white hover:shadow-sm">
          <UserGroupIcon className="w-6 h-6 pt-1" /> <span>Members</span>
        </button>
        <button className="py-2 px-2 rounded-md flex space-x-2 items-center hover:bg-white hover:shadow-sm">
          <Cog6ToothIcon className="w-6 h-6 pt-1" /> <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
