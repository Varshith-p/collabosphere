// import { Link } from "react-router-dom";

const EmptyPage = () => {
  return (
    <section className="flex flex-col h-[calc(100vh-64px)] py-6 px-[60px]">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl 2xl:text-3xl font-medium">Directory</h1>
        {/* <Link
          to="new"
          className="h-10 bg-primary text-white flex items-center rounded px-4"
        >
          Create Project
        </Link> */}
      </div>
      <div className="flex-[1_0_0] flex flex-col items-center justify-center">
        <img src="/empty.svg" alt="empty page" className="w-40 h-40" />
        <p className="text-2xl text-cancelText font-medium pl-5">
          No Public Projects
        </p>
      </div>
    </section>
  );
};

export default EmptyPage;
