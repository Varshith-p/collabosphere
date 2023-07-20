// import { IoMdSettings } from "react-icons/io"
// import { MdNotifications } from "react-icons/md"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon, BellIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="fixed w-screen z-50 bg-sky-100 py-4 px-4 md:px-8 border-b flex items-center justify-between shadow-md">
      <div className="flex items-center gap-x-6">
        <h1 className="font-medium text-xl cursor-pointer">CollaboSphere</h1>
        <div className="hidden md:flex gap-x-6 h-auto font-semibold text-gray-600">
          <p>Your work</p>
          <p>Projects</p>
          <p>Teams</p>
          <p>Recent</p>
        </div>
        <div className="hidden md:block font-semibold">
          <button className="bg-[#407bff] text-white px-3 py-1 rounded-md">
            Create
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <form
          action=""
          className="border hidden border-gray-500 lg:flex items-center space-x-5 bg-white rounded-md px-2 py-1"
        >
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            className="focus:outline-none focus:border-0"
            placeholder="Search"
          />
          <button hidden>Search</button>
        </form>
        <BellIcon className="cursor-pointer w-6 h-6" />
        <Cog6ToothIcon className="cursor-pointer w-6 h-6" />
        <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex justify-center items-center cursor-pointer">
          D
        </div>
      </div>
    </header>
  );
};

export default Header;
