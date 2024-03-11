import { useSelector, useDispatch } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      setName(project.name || "");
      setDescription(project.description || "");
      setSelectedUsers(project.participants);
    }
  }, [project]);

  const handleSelect = (user) => {
    setQuery("");
    const flag = selectedUsers.some(
      (selectedUser) => selectedUser._id == user._id
    );
    if (flag) return;
    setIsUpdated(true);
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
      <div className="grid grid-cols-2 justify-between">
        <div className="flex flex-col gap-6 w-[400px] 2xl:w-[460px]">
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
        </div>
        <div className="flex flex-col gap-3 w-[400px] 2xl:w-[460px]">
          <label htmlFor="name">Participants</label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value || "")}
            className="py-[14px] px-3 rounded-[6px] border border-border-color bg-white h-[42px] focus:outline-none relative"
          />
          <div
            className={`${
              query.length == 0 ? "hidden" : "block"
            } max-h-[260px] rounded-[6px] border border-border-color overflow-auto fixed z-50 bg-white translate-y-20 w-[400px] 2xl:w-[460px]`}
          >
            {users
              ?.filter(
                (user) =>
                  user.name.toLowerCase().includes(query.toLowerCase()) ||
                  user.email.toLowerCase().includes(query.toLowerCase())
              )
              .map((filteredUser, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(filteredUser)}
                  className="px-2 py-1"
                >
                  <div className="flex items-center gap-2 py-2 px-2 text-sm cursor-pointer hover:bg-primary-foreground rounded-[6px]">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={`${filteredUser.image || "/avatar.svg"}`}
                        alt="Avatar"
                        className="object-cover"
                      />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="flex flex-col">
                      <span>{filteredUser.name}</span>
                      <span>{filteredUser.email}</span>
                    </p>
                  </div>
                </div>
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
