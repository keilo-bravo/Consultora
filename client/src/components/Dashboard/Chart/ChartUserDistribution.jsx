import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";
import "./ChartUserDistribution.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB25", "#FF8042"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartUserDistribution = () => {
  const { usuarios } = useSelector((state) => state);

  const getData = () => {
    let adminCount = 0;
    let abogadoCount = 0;
    let clienteCount = 0;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].adminId) adminCount++;
      else if (usuarios[i].abogadoId) abogadoCount++;
      else clienteCount++;
    }

    return [
      { name: "Abogados", value: abogadoCount },
      { name: "Clientes", value: clienteCount },
      { name: "Admin", value: adminCount },
    ];
  };

  const data = getData();

  return (
    <div id="chartUD">
      <h5>User Distribution</h5>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884D8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartUserDistribution;
