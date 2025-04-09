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
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4 items-end max-sm:justify-between">
      <div className="max-sm:w-4/9">
        <label htmlFor="priceRange" className="block">
          Price
        </label>
        <select
          id="priceRange"
          value={priceRange}
          onChange={(e) => setPriceRange(() => e.target.value)}
          className="border bg-x2dark h-10 px-4 py-2 rounded-md text-sm max-sm: w-full" 
        >
          <option value="">Select a range</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div className="max-sm:w-4/9">
        <label htmlFor="changeRange" className="block">
          Change 24h
        </label>
        <select
          id="changeRange"
          value={changeRange}
          onChange={(e) => setChangeRange(() => e.target.value)}
          className="border bg-x2dark h-10 px-4 py-2 rounded-md text-sm max-sm: w-full" 
        >
          <option value="">Select a range</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      <button type="submit" className="h-10 px-4 py-2 rounded-md text-sm bg-blue-500 text-white cursor-pointer max-sm:w-full">
        Filter
      </button>
    </form>
  );
};

export default Filters;
