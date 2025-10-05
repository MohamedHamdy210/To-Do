"use client"
import { Pie, } from "@nivo/pie";
interface PieChartProps {
  totalTasks: number |0;
  color: string;
  tasks: number |0;
  type:"Completed" | "In Progress" | "Not Started";
}
const PieChart = ({  totalTasks , color , tasks ,type}:PieChartProps) => {
const data = [
  {
    id: "done",
    label: "done",
    value: tasks,
    color: color,
  },
  {
    id: "total",
    label: "total",
    value: totalTasks - tasks,
    color: "#d9d9d9",
  },
];  
  return (
    <div className="relative hover:scale-105 transition-all flex flex-col justify-center items-center gap-2">
      <Pie /* or Pie for fixed dimensions */
        data={data}
        colors={{ datum: "data.color" }}
        // margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.8}
        height={130}
        width={130}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        enableArcLabels={false}
        // arcLabelsSkipAngle={10}
        // arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        isInteractive={false}
        startAngle={90}
        endAngle={450}
      />

      <div className="flex">
        <h3>{type}</h3>
      </div>
      <div className="absolute bottom-1/2 ">
        <span className="font-bold text-2xl">
          {((100 * tasks) / totalTasks).toFixed(1) === "NaN"
            ? 0
            : ((100 * tasks) / totalTasks).toFixed(1)}
          %
        </span>
      </div>
    </div>
  );
}
export default PieChart;