"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { CustomTooltip } from "./Tooltip";
import { memo } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CryptoChart = ({ data }: { data: any }) => {
  const prices = data.sparkline_in_7d.price.map((price: number, i: number) => ({
    name: `T${i}`,
    price,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-x2dark p-4 rounded-2xl"
    >
      <h2 className="text-lg font-bold mb-2">{data.name} - Last 7 days</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={prices}>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#BB86FC"
            strokeWidth={2}
            dot={false}
          />
          <XAxis dataKey="name" hide />
          <YAxis
            domain={["auto", "auto"]}
            axisLine={{ stroke: "#FFFFFF" }}
            tick={{ fill: "#FFFFFF" }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default memo(CryptoChart);
