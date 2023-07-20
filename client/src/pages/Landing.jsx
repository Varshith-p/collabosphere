import { Link } from "react-router-dom";
import Hero from "../components/Hero";

const Landing = () => {
  return (
    <div className="">
      <header className="fixed inset-x-0 py-4 px-8 border-b flex items-center justify-between">
        <h1 className="font-medium text-2xl">CollaboSphere</h1>
        <Link
          to={"/login"}
          className="bg-[#407bff] text-white py-1 px-3 rounded-md"
        >
          Sign in
        </Link>
      </header>
      <Hero />
    </div>
  );
};

export default Landing;
