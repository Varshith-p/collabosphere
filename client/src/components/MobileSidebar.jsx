// import logo from "../assets/react.svg";
import {
  Drawer,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  Bars3BottomLeftIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  DocumentIcon,
  UserGroupIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Bars3BottomLeftIcon
        onClick={openDrawer}
        className="md:hidden cursor-pointer w-6 h-6"
      />
      <Drawer open={open} onClose={closeDrawer}>
        <div className="flex justify-between items-center pr-8">
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
          <XMarkIcon
            onClick={closeDrawer}
            strokeWidth={2}
            className="cursor-pointer h-5 w-5"
          />
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
      </Drawer>
    </>
  );
};

export default MobileSidebar;
