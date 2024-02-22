import { Link } from "react-router-dom";

const EmptyPage = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-64px)] py-6 px-[60px]">
      <h1 className="text-2xl font-medium">Hello, Varshith.</h1>
      <div className="flex-[1_0_0] flex flex-col items-center justify-center">
        <img src="/empty.svg" alt="empty page" className="w-40 h-40" />
        <div className="flex flex-col gap-4 items-center pl-5">
          <p className="text-xl text-cancelText font-medium">
            Nothing to show, start by creating a project
          </p>
          <Link
            to="/user/project/new"
            className="h-10 bg-primary text-white flex items-center rounded px-4 w-fit"
          >
            Create Project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyPage;
