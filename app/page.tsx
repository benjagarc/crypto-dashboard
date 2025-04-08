"use client";

import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "@/lib/coingecko";
import KPI from "@/components/KPI";
// import CryptoChart from "@/components/CryptoChart";
import CryptoTable from "@/components/CryptoTable";
import { CoinElementInterface } from "./interface";
import Filters from "@/components/Filters";
import {
  typeChangeRange,
  typePriceRange,
} from "@/components/Filters/interface";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import dynamic from "next/dynamic";
const CryptoChart = dynamic(() => import("@/components/CryptoChart"), {
  ssr: false,
  loading: () => <p>Loading Chart...</p>,
});
export default function DashboardPage() {
  const {
    data: coins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
    staleTime: 1000 * 60,
  });

  const [filteredCoins, setFilteredCoins] = useState<CoinElementInterface[]>(
    [] as CoinElementInterface[]
  );

  const getFilterInformation = (
    priceRange?: typePriceRange,
    changeRange?: typeChangeRange
  ) => {
    let filtered = [...coins];

    if (!!priceRange) {
      const pricesRanges = {
        low: filtered.filter((coin) => coin.current_price < 500),
        medium: filtered.filter(
          (coin) => coin.current_price >= 500 && coin.current_price <= 5000
        ),
        high: filtered.filter((coin) => coin.current_price > 5000),
      };
      filtered = pricesRanges[priceRange];
    }

    if (!!changeRange) {
      const changesRages = {
        positive: filtered.filter(
          (coin) => coin.price_change_percentage_24h > 0
        ),
        negative: filtered.filter(
          (coin) => coin.price_change_percentage_24h < 0
        ),
      };
      filtered = changesRages[changeRange];
    }

    setFilteredCoins(() => filtered);
  };

  const handleSearch = (term: string) => {
    if (term === "") {
      setFilteredCoins(coins);
    } else {
      setFilteredCoins(
        coins.filter((coin: CoinElementInterface) =>
          coin.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const TopCoins = useMemo(() => {
    return filteredCoins?.length > 0 ? filteredCoins?.slice(0, 3) : [];
  }, [filteredCoins]);

  useEffect(() => {
    setFilteredCoins(() => coins);
  }, [coins]);

  // components

  if (isLoading)
    return (
      <div className="p-8 background-purple bg-x2dark">Loading criptos...</div>
    );
  if (error)
    return (
      <div className="p-8 text-red-500 background-purple">
        Error to load data
      </div>
    );

  return (
    <div className="p-8 space-y-6 background-purple">
      <h1 className="text-3xl font-bold">Crypto Dashboard </h1>
      <Filters
        onFilter={(price, range) => {
          getFilterInformation(price, range);
        }}
      />
      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TopCoins.slice(0, 3).map((coin: CoinElementInterface) => (
          <KPI
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            change={coin.price_change_percentage_24h}
          />
        ))}
      </div>

      {filteredCoins?.length > 0 && <CryptoChart data={filteredCoins[0]} />}
      <CryptoTable coins={coins} />
    </div>
  );
}
