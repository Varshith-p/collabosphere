import Overview from "@/components/profile/Overview";
import PieCharts from "@/components/profile/PieCharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Box, File, FileCheck2, FileClock } from "lucide-react";

export function Profile() {
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
            <div className="text-2xl font-bold">3 Projects</div>
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
            <div className="text-2xl font-bold">69 Tasks</div>
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
            <div className="text-2xl font-bold">49 Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending tasks</CardTitle>
            <FileClock size={16} className="text-cancelText" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 Pending</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Check out your place.</CardDescription>
          </CardHeader>
          <CardContent>
            <PieCharts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
