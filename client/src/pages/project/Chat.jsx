import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

const Chat = () => {
  const [project] = useOutletContext();

  const [message, setMessage] = useState();
  const messages = [
    {
      user: "NAWAX",
      message:
        "hello guys  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime magnam sunt quis quo. Eum distinctio vel rem illum illo accusamus.",
    },
    { user: "NAWAX", message: "hello guys" },
    { user: "NAWAX", message: "hello guys" },
    { user: "NAWAX", message: "hello guys" },
    { user: "NAWAX", message: "hello guys" },
  ];

  return (
    <section className="px-[30px] py-3 flex flex-col h-full">
      <div className="flex flex-col gap-1 border border-border-color py-3 px-[30px] rounded-t-[6px] bg-[#FAFAFA]">
        <p className="text-cancelText text-sm">
          <Link to="/user/projects">Projects /</Link>
          <span className="cursor-pointer"> {project.name}</span>
        </p>
        <h1 className="text-2xl 2xl:text-3xl font-medium">Chat</h1>
      </div>
      <section className="border-b border-x bg-[#FAFAFA] border-border-color rounded-b-[6px] flex-1 flex flex-col py-3 px-[30px] overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-3">
          {messages.map((message, index) => (
            <div
              key={index}
              // className="flex items-center gap-2 place-content-end"
              className="flex items-start gap-2 max-w-[70%]"
            >
              <img
                src="/avatar.svg"
                alt="avatar"
                className="w-6 h-6 2xl:w-8 2xl:h-8"
              />
              <p className="bg-white rounded-[6px] py-1 px-3 border border-border-color">
                {message.message}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="bg-red-700"> */}
        <form className="rounded-full bg-white flex items-center px-2 gap-1 border border-border-color">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="h-full rounded-full w-full p-2 focus:outline-none"
          />
          <SendHorizonal stroke="#6366F1" size={20} />
        </form>
        {/* </div> */}
      </section>
    </section>
  );
};

export default Chat;
