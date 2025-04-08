"use client";

import { useState } from "react";
import { SearchBarProps } from "./interface";

export const SearchBar = ({ onSearch }: SearchBarProps)  => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        className="p-2 border rounded w-full"
        placeholder="Search a  Crypto..."
      />
    </div>
  );
}

export default SearchBar;