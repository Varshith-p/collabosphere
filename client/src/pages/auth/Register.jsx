import Loading from "@/components/Loading";
import { register } from "@/redux/user/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      // navigate("/user/your-work");
      location.replace("/user/your-work");
    }
  }, [user, navigate]);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(signupData));
  };

  return (
    // <section className="font-geist flex w-screen h-screen">
    <section className="font-geist flex w-screen h-screen items-center bg-primary-foreground">
      {/* <div className="w-[460px] 2xl:w-[540px] flex flex-col px-8 lg:px-[60px] py-10 2xl:justify-center gap-3 md:gap-8 overflow-y-auto"> */}
      <div className="w-[460px] 2xl:w-[540px] mx-auto h-[90%] bg-white border border-border-color rounded-[6px] flex flex-col px-8 lg:px-[60px] py-10  gap-3 md:gap-8 overflow-hidden">
        <h1 className="text-3xl font-medium flex gap-2 items-center">
          <img src="./logo.svg" alt="logo" className="w-8 h-8" />
          Collabosphere
        </h1>
        <div className="flex flex-col gap-1">
          <div className="text-lg md:text-xl">
            Create your Collabosphere account
          </div>
          {/* <div className="text-[#A9AAAE] md:text-lg">
            Let&apos;s get started! Fill in the form below to create your free
            Collabosphere account.
          </div> */}
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              required
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10 font-light"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="mobile">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={signupData.mobile}
              onChange={handleChange}
              required
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10 font-light"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              required
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10 font-light"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              required
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10 font-light"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 rounded h-10"
          >
            {isLoading ? <Loading /> : "Sign In"}
          </button>
          <div className="text-sm">
            <span className="text-slate-700">Already have an account? </span>
            <Link to="/login" className="text-primary underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
      {/* <div className="bg-primary-foreground flex-[1_0_0]"></div> */}
    </section>
  );
};

export default Register;
