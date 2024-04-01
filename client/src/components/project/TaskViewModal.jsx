/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TaskViewModal = ({ summary, description, assignee }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="text-sm 2xl:text-base p-2">{summary}</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] font-geist">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="summary" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Summary
            </label>
            <p className="h-10 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center">
              {summary}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              readOnly
              className="h-20 p-2 rounded-[6px] focus:outline-none border border-border-color flex items-center"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="assignee" className="text-sm font-medium">
              <span className="text-[#D30A0A]">* </span>Assignee
            </label>
            <div
              className={`h-10 p-2 rounded-[6px] cursor-pointer focus:outline-none border border-border-color flex items-center`}
            >
              {assignee.name}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskViewModal;
