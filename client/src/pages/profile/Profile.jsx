import LeaderBoard from "@/components/profile/LeaderBoard";
import Overview from "@/components/profile/Overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getProjects } from "@/redux/project/projectSlice";
import { Box, ChevronDown, File, FileCheck2, FileClock } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import getTasksSummary from "@/utils/getTaskSummary";

export function Profile() {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((store) => store.project);
  const { user } = useSelector((store) => store.user);

  const [project, setProject] = useState(projects[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  useEffect(() => {
    setProject(projects[0]);
  }, [projects]);

  if (isLoading) {
    return <Loading />;
  }

  const summary = getTasksSummary(projects, user._id);
  console.log(summary);

  return (
    <div className="py-6 px-[60px] bg-white flex flex-col gap-6">
      <h1 className="font-medium text-2xl py-4">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Box size={16} className="text-cancelText" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">1 Project</div> */}
            <div className="text-2xl font-bold">{`${
              projects.length == 1 ? "1 Project" : `${projects.length} Projects`
            }`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assigned Tasks
            </CardTitle>
            <File size={16} className="text-cancelText" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${summary.total} Task${
              summary.total !== 1 ? "s" : ""
            }`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <FileCheck2 size={16} className="text-cancelText" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary.completed} Completed
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending tasks</CardTitle>
            <FileClock size={16} className="text-cancelText" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.pending} Pending</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-[450px]">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview projects={projects} userId={user._id} />
          </CardContent>
        </Card>
        <Card className="col-span-3 flex flex-col overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Check out your place.</CardDescription>
              </div>
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="border cursor-pointer border-border-color w-[200px] 2xl:w-[260px] rounded-[6px] px-4 py-2 flex gap-2 justify-between items-center">
                      <p className="flex-1 truncate">{project?.name}</p>
                      <ChevronDown size={16} />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] 2xl:w-[260px] flex flex-col gap-1">
                    {projects.map((currProject, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setProject(currProject);
                          setOpen(false);
                        }}
                        className={`px-2 py-1 truncate cursor-pointer hover:bg-primary-foreground rounded-[6px] transition-all duration-300 ${
                          project?._id == currProject._id &&
                          "bg-primary-foreground"
                        }`}
                      >
                        {currProject.name}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <LeaderBoard project={project} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
