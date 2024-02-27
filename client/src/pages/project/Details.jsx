import { useSelector, useDispatch } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { updateProject } from "@/redux/project/projectSlice";

const Details = () => {
  const [project] = useOutletContext();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { users, user } = useSelector((store) => store.project);

  const [query, setQuery] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || "");
      setSelectedUsers(project.participants);
    }
  }, [project]);

  const handleSelect = (user) => {
    setIsUpdated(true);
    if (selectedUsers.includes(user)) return;
    setSelectedUsers([...selectedUsers, user]);
    setQuery("");
  };

  const handleRemove = (user) => {
    setIsUpdated(true);
    const newUsers = selectedUsers.filter((curruser) => curruser != user);
    setSelectedUsers(newUsers);
  };

  const handleSubmit = async () => {
    if (user._id !== project.admin) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Only admin can update the project details",
      });
      return;
    }
    if (!name) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Fill project name",
      });
      return;
    }
    const participants = selectedUsers.map((user) => user.id);
    const payload = { ...project, name, participants, description };
    try {
      dispatch(updateProject(payload));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="px-[60px] py-6 flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="text-cancelText text-sm">
            <Link to="/user/projects">Projects /</Link>
            <span className="cursor-pointer"> {project.name}</span>
          </p>
          <h1 className="text-2xl 2xl:text-3xl font-medium">Details</h1>
        </div>
        <button
          onClick={handleSubmit}
          className={`h-10 text-white flex items-center rounded px-4 ${
            isUpdated ? "bg-primary" : "bg-primary/50 pointer-events-none"
          }`}
        >
          Save
        </button>
      </div>
      <div className="w-[360px] flex flex-col gap-6 mx-auto">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">
            <span className="text-[#D30A0A]">* </span>Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setIsUpdated(true);
              setName(e.target.value);
            }}
            className="h-10 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => {
              setIsUpdated(true);
              setDescription(e.target.value);
            }}
            className="p-3 rounded-[6px] h-32 border border-border-color bg-white focus:outline-none"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Participants</label>
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
            } max-h-[180px] 2xl:max-h-[260px] p-2 rounded-[6px] border border-border-color overflow-auto fixed w-[360px] z-50 bg-white -translate-y-40 2xl:-translate-y-48`}
          >
            {users
              ?.filter(
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
            {selectedUsers?.map((user, index) => (
              <div
                key={index}
                className="py-2 px-3 cursor-pointer bg-primary-foreground rounded-[6px] flex justify-between items-center"
              >
                <p className="flex flex-col">
                  <span>{user.name}</span>
                  <span>{user.email}</span>
                </p>
                {user._id != project.admin && (
                  <X onClick={() => handleRemove(user)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
