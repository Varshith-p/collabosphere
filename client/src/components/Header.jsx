import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
// import NotificationMenu from "./NotificationMenu";
// import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed w-screen z-50 bg-white py-4 px-4 md:px-8 border-b flex items-center justify-between shadow-md">
      <div className="flex items-center gap-x-6">
        <h1 className="font-medium text-xl cursor-pointer">CollaboSphere</h1>
        <div className="hidden md:flex md:items-center gap-x-3">
          <nav className="flex gap-x-6 h-auto font-medium text-sm text-gray-800">
            <Link className="hover:text-gray-900">Your work</Link>
            <Link className="hover:text-gray-900">Projects</Link>
            <Link className="hover:text-gray-900">Teams</Link>
            <Link className="hover:text-gray-900">Recent</Link>
          </nav>
          <div className="hidden md:block font-medium text-sm">
            <button className="bg-primary text-white px-3 py-1 rounded-md">
              Create
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <form
          action=""
          className="border text-sm hidden border-gray-500 lg:flex items-center gap-x-1 bg-white rounded-md px-2 py-1"
        >
          <MagnifyingGlassIcon className="h-4 w-4 text-gray-800" />
          <input
            type="text"
            className="focus:outline-none focus:border-0"
            placeholder="Search"
          />
          <button hidden>Search</button>
        </form>
        {/* <NotificationMenu /> */}
        <Cog6ToothIcon className="cursor-pointer w-6 h-6" />
        {/* <ProfileMenu /> */}
      </div>
    </header>
  );
};

export default Header;
