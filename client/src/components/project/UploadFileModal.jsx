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
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../Loading";
import { uploadFile } from "@/redux/project/projectSlice";

const UploadFileModal = () => {
  const [project] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file) {
      // alert("fill all values");
      console.log("fill all values");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const payload = { id: project._id, formData };
    try {
      const res = await dispatch(uploadFile(payload));
      if (res.meta.requestStatus == "fulfilled") {
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="h-10 text-white flex items-center rounded px-4 bg-primary cursor-pointer">
          Upload
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] font-geist">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>File
            </label>
            <div className="flex gap-2">
              <div
                className={`h-10 p-2 flex-1 rounded-[6px] focus:outline-none border border-border-color flex items-center ${
                  !file && "text-cancelText"
                }`}
              >
                {file ? file.name : "Choose file"}
              </div>
              <label
                htmlFor="file"
                className="cursor-pointer bg-primary text-white flex items-center rounded-[6px] px-2"
              >
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files?.[0])}
                  className="hidden"
                />
                Browse
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={() => setDialogOpen(false)}
            className="bg-cancel text-cancelText p-2 rounded-[6px] flex items-center justify-center font-medium focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white p-2 rounded-[6px] flex items-center justify-center font-medium"
          >
            {isLoading ? <Loading /> : "Upload File"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFileModal;
