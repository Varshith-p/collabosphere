import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTask } from "@/redux/project/projectSlice";
import Loading from "../Loading";

const AddTaskModal = () => {
  const [project] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState({});
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!assignee || !summary || !description) {
      // alert("fill all values");
      console.log("fill all values");
      return;
    }
    setIsLoading(true);
    const data = {
      summary,
      description,
      assignee: assignee.id,
      project: project._id,
    };
    try {
      const res = await dispatch(createTask(data));
      if (res.meta.requestStatus == "fulfilled") {
        console.log("done");
        navigate(0);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-end justify-end pt-2 cursor-pointer">
          <div className="bg-primary w-6 h-6 flex items-center justify-center rounded-full text-white">
            <Plus size={16} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="project" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Project
            </label>
            <div
              id="project"
              className="bg-cancel text-cancelText p-2 rounded-[6px] font-medium"
            >
              {project.name}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Summary
            </label>
            <input
              type="text"
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="h-10 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-20 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="assignee" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Assignee
            </label>
            {/* <input
              type="text"
              id="assignee"
              className="h-10 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center"
            /> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  className={`h-10 p-2 rounded-[6px] cursor-pointer focus:outline-none border border-border-color flex items-center ${
                    !assignee && "text-cancelText"
                  }`}
                >
                  {assignee ? assignee.name : "Select Assignee"}
                </div>
              </PopoverTrigger>
              <PopoverContent className="sm:max-w-[425px] p-0">
                <Command className="rounded-[6px] shadow-md">
                  <CommandInput placeholder="Search..." />
                  <CommandList className="max-h-40 overflow-auto">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {project?.participants?.map((participant) => (
                        <CommandItem
                          key={participant.id}
                          value={participant.id}
                          onSelect={() => {
                            setAssignee(participant);
                            setOpen(false);
                          }}
                          className="p-1"
                        >
                          <span>{participant.name}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white p-2 rounded-[6px] w-[140px] flex items-center justify-center"
          >
            {isLoading ? <Loading /> : "Create task"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
