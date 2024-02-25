import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, getUsers } from "@/redux/project/projectSlice";
import Loading from "../Loading";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading } = useSelector((store) => store.project);

  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [visibility, setVisibility] = useState("private");

  const handleSelect = (user) => {
    if (selectedUsers.includes(user)) return;
    setSelectedUsers([...selectedUsers, user]);
    setQuery("");
  };

  const handleRemove = (user) => {
    const newUsers = selectedUsers.filter((curruser) => curruser != user);
    setSelectedUsers(newUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    let payload = {};
    if (selectedUsers.length > 0) {
      const participants = selectedUsers.map((user) => user.id);
      payload = { name, participants, visibility };
    } else {
      payload = { name, visibility };
    }
    try {
      const res = await dispatch(createProject(payload));
      if (res.meta.requestStatus == "fulfilled") {
        navigate("/user/projects", { replace: true });
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full justify-between items-center px-[60px] py-6 border-b border-border-color">
        <div className="flex flex-col gap-3">
          <p className="text-cancelText">
            <Link to="/user/projects">Projects /</Link>
            <span className="cursor-pointer"> Create Project</span>
          </p>
          <h1 className="text-2xl font-medium">Create Project</h1>
        </div>
        <button
          type="submit"
          className="h-10 bg-primary text-white flex items-center rounded px-4"
        >
          Create
        </button>
      </div>
      <div className="py-6 px-[60px] w-[900px] grid grid-cols-2 gap-14">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3">
            <label className="font-medium">
              <span className="text-[#D30A0A]">* </span>Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="py-[14px] px-3 rounded-[6px] border border-border-color bg-white h-[42px] focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-medium">Participants</label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="py-[14px] px-3 rounded-[6px] border border-border-color bg-white h-[42px] focus:outline-none"
            />
            <div
              className={`${
                query.length == 0 ? "hidden" : "block"
              } max-h-[160px] 2xl:max-h-[260px] p-2 rounded-[6px] border border-border-color overflow-auto fixed w-[360px] z-50 bg-white translate-y-20`}
            >
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(query.toLowerCase()) ||
                    user.email.toLowerCase().includes(query.toLowerCase())
                )
                .map((filteredUser, index) => (
                  <p
                    key={index}
                    onClick={() => handleSelect(filteredUser)}
                    className="py-2 px-3 cursor-pointer hover:bg-primary-foreground rounded-[6px] flex flex-col"
                  >
                    <span>{filteredUser.name}</span>
                    <span>{filteredUser.email}</span>
                  </p>
                ))}
            </div>
            <div className="flex flex-col gap-3">
              {selectedUsers.map((user, index) => (
                <div
                  key={index}
                  className="py-2 px-3 cursor-pointer bg-primary-foreground rounded-[6px] flex justify-between items-center"
                >
                  <p
                    onClick={() => handleSelect(user)}
                    className="flex flex-col"
                  >
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                  </p>
                  <X onClick={() => handleRemove(user)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-3">
            <p className="font-medium">Visibility</p>
            <div className="flex items-center h-10 gap-10">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Private"
                  id="Private"
                  required
                  name="visibility"
                  checked={visibility == "Private"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="Private">Private</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Public"
                  id="Public"
                  required
                  name="visibility"
                  checked={visibility == "Public"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="Public">Public</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProject;
