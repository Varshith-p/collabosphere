import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { updateProject } from "@/redux/project/projectSlice";
import Loading from "../Loading";

const TransferOwnershipModal = () => {
  const [project] = useOutletContext();
  console.log(project);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user, isLoading } = useSelector((store) => store.project);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [admin, setAdmin] = useState(project.admin);

  useEffect(() => {
    if (project) {
      setAdmin(project.admin);
    }
  }, [project]);

  const handleSubmit = async () => {
    if (user._id !== project.admin) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Only admin can update the project access",
      });
      return;
    }
    let participants = project.participants.map(
      (participant) => participant.id
    );
    const index = participants.indexOf(admin);
    participants.splice(index, 1);
    participants.unshift(admin);
    const payload = { ...project, admin, participants };
    try {
      dispatch(updateProject(payload));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="bg-cancel text-cancelText h-10 px-2 rounded-[6px] cursor-pointer flex items-center">
          Transfer
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] font-geist">
        <DialogHeader>
          <DialogTitle>Transfer Ownership</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 py-2">
            <p className="font-medium text-lg">
              Are you sure you want to transfer ownership of{" "}
              <span className="underline">{project.name}?</span>
            </p>
            <p className="text-cancelText">You can&apos;t undo this action</p>
          </div>
          <div className="flex flex-col gap-2 items-start max-h-40 overflow-auto">
            <p className="text-cancelText">Select admin</p>
            {project.participants?.map((participant, index) => (
              <div
                key={index}
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setAdmin(participant.id)}
              >
                <input
                  name="admin"
                  type="radio"
                  id={participant.id}
                  checked={admin == participant.id}
                  readOnly
                  className="accent-primary focus:outline-none"
                />
                <label htmlFor={participant.id}>{participant.name}</label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => setDialogOpen(false)}
            className="bg-cancel text-cancelText focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#D30A0A] text-white focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            {isLoading ? <Loading /> : `Transfer ownership`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferOwnershipModal;
