"use client";

import { motion } from "framer-motion";
import { KPIProps } from "./interface";

export const KPI = ({ name, price, change }: KPIProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-x2dark p-6 rounded-2xl  transition-all"
    >
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-2xl font-bold">${price.toLocaleString()}</p>
      <p className={`text-sm ${change >= 0 ? "green-price" : "red-price"}`}>
        {change >= 0 ? "+" : ""}
        {change.toFixed(2)}%
      </p>
    </motion.div>
  );
};

export default KPI;
