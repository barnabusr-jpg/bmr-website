/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export function ChartComponent({ data }: { data: any[] }) {
  // Import recharts only when this component is loaded
  const {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } = require("recharts");

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md p-2 text-xs shadow-xs">
          <p className="text-neutral-900 dark:text-white font-medium">{`${label}`}</p>
          <p className="text-neutral-600 dark:text-neutral-400">{`CPU: ${payload[0].value}%`}</p>
          <p className="text-neutral-600 dark:text-neutral-400">{`Memory: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -40, bottom: -10 }}>
        <defs>
          <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#666666" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#666666" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#999999" stopOpacity={0.7} />
            <stop offset="95%" stopColor="#999999" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          tick={{ fill: '#737373', fontSize: 9 }}
          axisLine={{ stroke: '#d1d5db' }}
          tickLine={{ stroke: '#d1d5db' }}
        />
        <YAxis
          tick={{ fill: '#737373', fontSize: 9 }}
          axisLine={{ stroke: '#d1d5db' }}
          tickLine={{ stroke: '#d1d5db' }}
          domain={[0, 100]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="cpu"
          name="CPU"
          stroke="#666666"
          fillOpacity={1}
          fill="url(#colorCpu)"
          animationDuration={1000}
        />
        <Area
          type="monotone"
          dataKey="memory"
          name="Memory"
          stroke="#999999"
          fillOpacity={1}
          fill="url(#colorMemory)"
          animationDuration={1000}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
