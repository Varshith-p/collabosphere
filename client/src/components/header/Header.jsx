import { Box, Folders, NotepadText } from "lucide-react";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    name: "Your Work",
    link: "/user/your-work",
    icon: <NotepadText size={20} />,
  },
  {
    name: "Projects",
    link: "/user/projects",
    icon: <Box size={20} />,
  },
  { name: "Directory", link: "/user/directory", icon: <Folders size={20} /> },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="fixed w-screen font-geist z-30 bg-[#FAFAFA] h-16 px-4 md:px-[60px] border-b border-border-color flex items-center justify-between">
      <Link
        to="/user/your-work"
        className="font-medium text-2xl cursor-pointer flex gap-2 items-center"
      >
        <img src="/logo.svg" alt="logo" className="w-7 h-7" />
        CollaboSphere
      </Link>
      <nav className="hidden md:flex flex-1 justify-center gap-5 text-gray-800 h-full items-center">
        {navLinks.map((navLink, index) => (
          <Link
            to={navLink.link}
            key={index}
            className={`flex h-full items-center px-[10px] gap-[10px] ${
              pathname.startsWith(navLink.link)
                ? "text-primary"
                : "text-[#61656C]"
            }`}
          >
            {navLink.icon}
            <span>{navLink.name}</span>
          </Link>
        ))}
      </nav>
      <div className="flex gap-5">
        <NotificationMenu />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
