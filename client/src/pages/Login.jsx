import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/user/home");
      }, 500);
    }
  }, [user, navigate]);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: undefined,
    profilePicture: null,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (endPoint === "login") {
    //   dispatch(login(payload));
    // } else {
    //   // delete the line below after integrating S3
    //   delete payload.profilePicture;
    //   dispatch(register(payload));
    // }
    console.log("first");
    dispatch(login(loginData));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const inputValue = type === "file" ? files[0] : value;

    setSignupData({
      ...signupData,
      [name]: inputValue,
    });
  };

  const data = [
    {
      label: "SignUp",
      value: "signup",
      desc: (
        <div className="w-[98%] mx-auto md:w-[28rem] mt-2 ring-blue-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="rounded-xl border border-gray-300 text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none text-black">Sign up</h3>
              <p className="text-sm">Create your account here.</p>
            </div>
            <div className="p-6 pt-0 space-y-2">
              <div className="space-y-1 items-center flex flex-col gap-2">
                <label>Profile picture</label>
                <label
                  className="w-16 h-16 rounded-full cursor-pointer bg-blue-300 flex items-center justify-center"
                  htmlFor="profilePicture"
                >
                  {signupData.profilePicture ? (
                    <img
                      src={URL.createObjectURL(signupData.profilePicture)}
                      alt="Selected Profile"
                      className="w-full h-full object-contain rounded-full"
                    />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </>
                  )}
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="space-y-1 flex flex-col gap-2">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded-md border-gray-500 focus:outline-0 focus:border-black"
                />
              </div>
              <div className="space-y-1 flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded-md border-gray-500 focus:outline-0 focus:border-black"
                />
              </div>
              <div className="space-y-1 flex flex-col gap-2">
                <label>mobile</label>
                <input
                  type="number"
                  name="mobile"
                  value={signupData.mobile}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded-md border-gray-500 focus:outline-0 focus:border-black"
                />
              </div>
              <div className="space-y-1 flex flex-col gap-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded-md border-gray-500 focus:outline-0 focus:border-black"
                />
              </div>
            </div>
            <div className={" flex items-center p-6 pt-0"}>
              <button
                disabled={isLoading}
                onClick={() =>
                  handleSubmit({ endPoint: "signup", payload: signupData })
                }
                className="bg-primary text-white py-1 px-4 rounded-md"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="font-geist flex w-screen h-screen">
      <div className="w-[450px] 2xl:w-[540px] flex flex-col justify-center px-8 lg:px-[60px] py-10 2xl:justify-center gap-3 md:gap-8 overflow-y-auto">
        <h1 className="text-3xl font-medium flex gap-2 items-center">
          <img src="./logo.svg" alt="logo" className="w-8 h-8" />
          Collabosphere
        </h1>
        <div className="flex flex-col gap-1">
          <div className="text-lg md:text-xl">
            Welcome back to Collabosphere
          </div>
          <div className="text-[#A9AAAE]  md:text-lg">
            Sign in to your account below.
          </div>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              required
              onChange={handleLoginChange}
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              required
              onChange={handleLoginChange}
              className="px-2 flex items-center w-full rounded border border-gray-300 focus:outline-0 h-10"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-4 rounded h-10"
          >
            {isLoading ? <Loading /> : "Sign In"}
          </button>
        </form>
      </div>
      <div className="bg-primary-foreground flex-[1_0_0]"></div>
    </section>
  );
};

export default Login;
