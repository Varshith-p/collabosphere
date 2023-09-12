import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/user/userSlice";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="tania andrew"
          className="cursor-pointer w-8 h-8 md:w-10 md:h-10"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </MenuHandler>
      <MenuList>
        <MenuItem className="flex items-center gap-2">
          <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            My Profile
          </Typography>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Cog6ToothIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Edit Profile
          </Typography>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem
          className="flex items-center gap-2 "
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          <PowerIcon strokeWidth={2} className="h-4 w-4" />
          <Typography variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
