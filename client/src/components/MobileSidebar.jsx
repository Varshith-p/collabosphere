import logo from "../assets/react.svg";

const MobileSidebar = () => {
  return (
    <aside>
      <div className="flex items-center space-x-2 pb-4 border-b">
        <div className="w-10 h-10 bg-white flex items-center justify-center">
          <img src={logo} className="w-4/6" alt="logo" />
        </div>
        <div>
          <h1 className="font-medium">Demo</h1>
          <span className="text-xs">Software Project</span>
        </div>
      </div>
    </aside>
  );
};

export default MobileSidebar;
