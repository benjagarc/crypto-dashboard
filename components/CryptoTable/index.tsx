"use client";

import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CryptoTable = ({ coins }: { coins: any[] }) => {
  const headers = ["Name", "Price", "Change", "Market Cap"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-auto bg-x2dark rounded-2xl shadow"
    >
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-4">#</th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr
              key={coin.id}
              className="border-b transition"
            >
              <td className="p-4">{index + 1}</td>
              <td className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                {coin.name}
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default CryptoTable;
