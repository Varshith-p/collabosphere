import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";

import {
  ViewColumnsIcon,
  ChatBubbleOvalLeftIcon,
  DocumentIcon,
  Cog6ToothIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <Card className="hidden lg:block fixed top-16 h-[calc(100vh-3rem)] w-full max-w-[16rem] p-4 border-r">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img
          src="/vite.svg"
          alt="brand"
          className="h-10 w-10 bg-blue-gray-50 p-1"
        />
        <div>
          <h1 className="text-black font-semibold">Demo</h1>
          <p className="text-sm">Software Project</p>
        </div>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <ViewColumnsIcon className="h-5 w-5" />
          </ListItemPrefix>
          Board
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
          </ListItemPrefix>
          Chat
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <DocumentIcon className="h-5 w-5" />
          </ListItemPrefix>
          Resources
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserGroupIcon className="h-5 w-5" />
          </ListItemPrefix>
          Members
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
    </Card>
  );
};

export default Sidebar;
