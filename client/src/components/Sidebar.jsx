import logo from "../assets/react.svg";
import { ViewColumnsIcon, ChatBubbleOvalLeftIcon, DocumentIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <aside className="pt-24 fixed w-64 top-0 bottom-0 border-r border-gray-400 px-4">
      <div className="flex items-center space-x-2 pb-4 border-b">
        <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
          <img src={logo} className="w-4/6" alt="logo" />
        </div>
        <div>
          <h1 className="font-medium">Demo</h1>
          <span className="text-xs">Software Project</span>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
          <button className="py-1 px-2 rounded-md flex space-x-2 items-center">
            <ViewColumnsIcon className="w-6 h-6 pt-1" /> <span>Board</span>
          </button>
          <button className="py-1 px-2 rounded-md flex space-x-2 items-center">
            <ChatBubbleOvalLeftIcon className="w-6 h-6 pt-1" /> <span>Chat</span>
          </button>
          <button className="py-1 px-2 rounded-md flex space-x-2 items-center">
            <DocumentIcon className="w-6 h-6 pt-1" /> <span>Resources</span>
          </button>
          <button className="py-1 px-2 rounded-md flex space-x-2 items-center">
            <Cog6ToothIcon className="w-6 h-6 pt-1" /> <span>Settings</span>
          </button>
        </div>
    </aside>
  );
};

export default Sidebar;
