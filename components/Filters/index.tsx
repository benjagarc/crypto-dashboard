"use client";

import { useState } from "react";
import { FiltersProps, typeChangeRange, typePriceRange } from "./interface";

export const Filters = ({ onFilter }: FiltersProps) => {
  const [priceRange, setPriceRange] = useState("");
  const [changeRange, setChangeRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(priceRange as typePriceRange, changeRange as typeChangeRange) ;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4">
      <div>
        <label htmlFor="priceRange" className="block">
          Price
        </label>
        <select
          id="priceRange"
          value={priceRange}
          onChange={(e) => setPriceRange(() => e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select a range</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div>
        <label htmlFor="changeRange" className="block">
          Change 24h
        </label>
        <select
          id="changeRange"
          value={changeRange}
          onChange={(e) => setChangeRange(() => e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select a range</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Filter
      </button>
    </form>
  );
};

export default Filters;
