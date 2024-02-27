/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { updateProject } from "@/redux/project/projectSlice";
import Loading from "../Loading";

const ChangeVisibilityModal = ({ visibility }) => {
  const [project] = useOutletContext();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user, isLoading } = useSelector((store) => store.project);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = async () => {
    if (user._id !== project.admin) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "Only admin can update the project access",
      });
      return;
    }
    const payload = { ...project, visibility };
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
          Make {visibility}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] font-geist">
        <DialogHeader>
          <DialogTitle>Change Visibility</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 py-2">
          <p className="font-medium text-lg">
            Are you sure you want to make{" "}
            <span className="underline">{project.name}?</span>{" "}
            <span className="lowercase">{visibility}</span>
          </p>
          {/* <p className="text-cancelText">You can&apos;t undo this action</p> */}
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
            {isLoading ? <Loading /> : `Make ${visibility}`}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeVisibilityModal;
