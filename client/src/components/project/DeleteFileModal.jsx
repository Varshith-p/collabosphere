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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { deleteFile } from "@/redux/project/projectSlice";
import { Trash } from "lucide-react";

const DeleteFileModal = ({ fileId, id, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      console.log(id);
      const res = await dispatch(deleteFile({ fileId, id }));
      if (res.meta.requestStatus == "fulfilled") {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:bg-primary-foreground rounded flex items-center gap-2 text-[#D30A0A] font-medium">
          <span>
            <Trash size={16} />
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] font-geist">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-1 py-2">
          <p className="font-medium text-lg">
            Are you sure you want to delete{" "}
            <span className="underline">{name}?</span> and its contents?
          </p>
          <p className="text-cancelText">You can&apos;t undo this action</p>
        </div>
        <DialogFooter>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-cancel text-cancelText focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#D30A0A] text-white focus:outline-none flex w-full items-center justify-center h-10 font-medium rounded-[6px]"
          >
            {isLoading ? <Loading /> : "Delete file"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteFileModal;
