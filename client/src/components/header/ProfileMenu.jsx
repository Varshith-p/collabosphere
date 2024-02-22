import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/userSlice";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleChange}>
      <PopoverTrigger className="flex items-center gap-2">
        <img src="/avatar.svg" alt="avatar" className="w-8 h-8" />
        <span className="font-medium text-lg">Varshith</span>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="w-[240px] mr-10 flex flex-col gap-1 text-sm 2xl:text-base font-geist font-light">
        <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary-foreground rounded">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <span>My Profile</span>
        </div>
        <div
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary-foreground rounded"
        >
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <span>Sign out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileMenu;
