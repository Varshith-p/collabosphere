import hero from "../assets/hero.svg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const Hero = () => {
  return (
    <main className="m-auto max-w-7xl pt-16 grid grid-cols-12 items-center px-8 h-screen">
      <div className="col-span-6">
        <h1 className="text-4xl leading-relaxed font-semibold">
          CollaboSphere: Unleash the Power of Team Collaboration
        </h1>
        <Link
          to={"/login"}
          className="w-fit text-lg mt-3 flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-md"
        >
          Get started <BsArrowRight />
        </Link>
      </div>
      <img
        className="col-span-6 w-full scale-110"
        src={hero}
        alt="hero image"
      />
    </main>
  );
};

export default Hero;
