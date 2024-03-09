import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/userSlice";
import { useState } from "react";
import { ChevronDown, UserCog } from "lucide-react";
import {} from "react-redux";

const ProfileMenu = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleChange}>
      <PopoverTrigger className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`${user.image || "/avatar.svg"}`}
            alt="Avatar"
            className="object-cover"
          />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
        <ChevronDown />
      </PopoverTrigger>
      <PopoverContent className="w-[240px] mr-10 flex flex-col gap-1 text-sm 2xl:text-base font-geist font-light">
        <Link
          to="/user/profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary-foreground rounded"
        >
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <span>My Profile</span>
        </Link>
        <Link
          to="/user/profile/edit"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-primary-foreground rounded"
        >
          <UserCog strokeWidth={2} className="h-4 w-4" />
          <span>Edit Profile</span>
        </Link>
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
