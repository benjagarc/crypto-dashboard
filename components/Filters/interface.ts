export interface FiltersProps {
  onFilter: (priceRange?: typePriceRange, changeRange?: typeChangeRange) => void;
}

export type typePriceRange = "low" | "medium" | "high";
export type typeChangeRange = "positive" | "negative";
