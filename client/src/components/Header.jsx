// import { IoMdSettings } from "react-icons/io"
// import { MdNotifications } from "react-icons/md"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // const [openNav, setOpenNav] = useState(false);

  // useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpenNav(false)
  //   );
  // }, []);

  // const navList = (
  //   <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Pages
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Account
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Blocks
  //       </a>
  //     </Typography>
  //     <Typography
  //       as="li"
  //       variant="small"
  //       color="blue-gray"
  //       className="p-1 font-normal"
  //     >
  //       <a href="#" className="flex items-center">
  //         Docs
  //       </a>
  //     </Typography>
  //   </ul>
  // );

  // return (
  //   <>
  //     <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
  //       <div className="flex items-center justify-between text-blue-gray-900">
  //         <Typography
  //           as="a"
  //           href="#"
  //           className="mr-4 cursor-pointer py-1.5 font-medium"
  //         >
  //           Material Tailwind
  //         </Typography>
  //         <div className="flex items-center gap-4">
  //           <div className="mr-4 hidden lg:block">{navList}</div>
  //           <Button
  //             variant="gradient"
  //             size="sm"
  //             className="hidden lg:inline-block"
  //           >
  //             <span>Buy Now</span>
  //           </Button>
  //           <IconButton
  //             variant="text"
  //             className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
  //             ripple={false}
  //             onClick={() => setOpenNav(!openNav)}
  //           >
  //             {openNav ? (
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 fill="none"
  //                 className="h-6 w-6"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //                 strokeWidth={2}
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M6 18L18 6M6 6l12 12"
  //                 />
  //               </svg>
  //             ) : (
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="h-6 w-6"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth={2}
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   d="M4 6h16M4 12h16M4 18h16"
  //                 />
  //               </svg>
  //             )}
  //           </IconButton>
  //         </div>
  //       </div>
  //       <MobileNav open={openNav}>
  //         {navList}
  //         <Button variant="gradient" size="sm" fullWidth className="mb-2">
  //           <span>Buy Now</span>
  //         </Button>
  //       </MobileNav>bg-[#EEE9FD]
  //     </Navbar>
  //   </>
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
            <button className="bg-[#0D99FF] text-white px-3 py-1 rounded-md">
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
        <NotificationMenu />
        <Cog6ToothIcon className="cursor-pointer w-6 h-6" />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
