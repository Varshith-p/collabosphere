import { BellIcon, ClockIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const notifications = ["New Project is created", "New task is assigned"];

const NotificationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleChange}>
      <PopoverTrigger>
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-primary absolute right-0.5 top-0.5"></div>
          <BellIcon className="h-6 w-6" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] mr-10 flex flex-col gap-1 text-sm 2xl:text-base font-geist font-light">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="p-2 cursor-pointer hover:bg-primary-foreground rounded"
          >
            <span>{notification}</span>
            <span className="flex items-center gap-1 text-xs 2xl:text-sm">
              <ClockIcon className="w-3 h-3" /> 13 minutes ago
            </span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationMenu;
