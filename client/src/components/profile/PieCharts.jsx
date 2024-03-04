/* eslint-disable react/prop-types */
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  {
    name: "Group A",
    value: 41,
  },
  {
    name: "Group B",
    value: 20,
  },
  {
    name: "Group C",
    value: 36,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-primary-foreground rounded-[6px] px-4 py-2">
        <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const PieCharts = () => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={730} height={250}>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend />
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          fill="#6366F1"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieCharts;
