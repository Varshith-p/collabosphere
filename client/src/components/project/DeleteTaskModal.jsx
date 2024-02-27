/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import Loading from "../Loading";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/redux/project/projectSlice";

const DeleteTaskModal = ({ id }) => {
  const [project] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      console.log(id);
      const res = await dispatch(deleteTask({ id }));
      if (res.meta.requestStatus == "fulfilled") {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="p-2 flex items-center justify-center cursor-pointer">
          <Trash size={14} className="text-cancelText" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[540px] font-geist">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 py-2">
          <p className="font-medium text-lg">
            Are you sure you want to delete{" "}
            <span className="underline">{project.name}?</span> and its contents?
          </p>
          <p className="text-cancelText">You can&apos;t undo this action</p>
        </div>
        <DialogFooter>
          <button
            onClick={() => setDialogOpen(false)}
            className="bg-cancel text-cancelText focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#D30A0A] text-white focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            {isLoading ? <Loading /> : "Delete task"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskModal;
