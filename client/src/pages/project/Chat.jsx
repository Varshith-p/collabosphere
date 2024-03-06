import { SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "@/redux/project/projectSlice";

const endPoint = "http://localhost:5000";

const Chat = () => {
  const [project] = useOutletContext();
  const dispatch = useDispatch();
  const { user, messages } = useSelector((store) => store.project);
  console.log(messages);

  const [socket, setSocket] = useState(null);
  const [content, setContent] = useState("");
  const [messagesList, setMessages] = useState(messages);

  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  useEffect(() => {
    const newSocket = io(endPoint);
    setSocket(newSocket);
    newSocket.emit("join_chat", project._id);

    return () => newSocket.close();
  }, [project]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { content, project: project._id };
    const newMessage = {
      sender: { id: user._id, name: user.name },
      content,
      project: project._id,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    socket.emit("send_message", newMessage);
    setContent("");
    dispatch(sendMessage(payload));
  };

  return (
    <section className="flex flex-col h-full">
      <div className="flex flex-col gap-1 px-[60px] border-b border-border-color py-6 bg-[#FAFAFA]">
        <p className="text-cancelText text-sm">
          <Link to="/user/projects">Projects /</Link>
          <span className="cursor-pointer"> {project.name}</span>
        </p>
        <h1 className="text-2xl 2xl:text-3xl font-medium">Chat</h1>
      </div>
      <section className="flex-1 flex flex-col py-3 px-[60px] overflow-hidden">
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-3">
          {messagesList?.map((message, index) => (
            <div
              key={index}
              // className="flex items-center gap-2 place-content-end"
              className={`flex items-start gap-2 max-w-[70%] ${
                message.sender.id == user._id && "self-end flex-row-reverse"
              }`}
            >
              <img
                src="/avatar.svg"
                alt="avatar"
                className="w-8 h-8 2xl:w-10 2xl:h-10"
              />
              <div className="bg-white rounded-[6px] py-1 px-3 border border-border-color">
                <p className="text-sm text-cancelText">{message.sender.name}</p>
                <p className="text-lg">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="bg-red-700"> */}
        <form
          onSubmit={handleSubmit}
          className="rounded-full bg-white flex items-center px-2 gap-1 border border-border-color"
        >
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="h-full rounded-full w-full p-2 focus:outline-none"
          />
          <button type="submit">
            <SendHorizonal stroke="#6366F1" size={20} />
          </button>
        </form>
        {/* </div> */}
      </section>
    </section>
  );
};

export default Chat;
