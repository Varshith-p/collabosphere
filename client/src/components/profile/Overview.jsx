/* eslint-disable react/prop-types */
import getTasksByMonthStatus from "@/utils/getOverview";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const defaultData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-primary-foreground rounded-[6px] px-2 py-1">
        <p className="label text-sm font-geist">{`${label} - ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Overview = ({ projects, userId }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    setData(getTasksByMonthStatus(projects, userId));
  }, [projects, userId]);

  const tickCount = Math.max(...data.map((entry) => entry.total));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickCount={tickCount + 1}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
