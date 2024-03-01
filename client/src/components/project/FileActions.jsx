/* eslint-disable react/prop-types */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import DeleteFileModal from "./DeleteFileModal";

const FileActions = ({ name, id, fileId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <MoreHorizontal />
      </PopoverTrigger>
      <PopoverContent className="w-[180px] mr-16 flex flex-col gap-1 text-sm 2xl:text-base font-geist font-light">
        <div
          onClick={() => setIsOpen(false)}
          className="p-2 cursor-pointer hover:bg-primary-foreground rounded flex items-center gap-2 text-[#D30A0A] font-medium"
        >
          <DeleteFileModal name={name} fileId={fileId} id={id} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FileActions;
