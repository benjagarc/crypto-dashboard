"use client";

import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "@/lib/coingecko";
import KPI from "@/components/KPI";
import CryptoChart from "@/components/CryptoChart";
import CryptoTable from "@/components/CryptoTable";
import { CoinElementInterface } from "./interface";
import Filters from "@/components/Filters";
import {
  typeChangeRange,
  typePriceRange,
} from "@/components/Filters/interface";
import { useState } from "react";

export default function DashboardPage() {
  const {
    data: coins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
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

    setFilteredCoins((_) => filtered);
  };

  // components

  if (isLoading) return <div className="p-8">Cargando criptos...</div>;
  if (error)
    return <div className="p-8 text-red-500">Error al cargar datos</div>;

  return (
    <div className="p-8 space-y-6 background-ligth">
      <h1 className="text-3xl font-bold">Dashboard de Criptomonedas</h1>
      <Filters
        onFilter={(price, range) => {
          getFilterInformation(price, range);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredCoins.slice(0, 3).map((coin: CoinElementInterface) => (
          <KPI
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            change={coin.price_change_percentage_24h}
          />
        ))}
      </div>

      <CryptoChart data={coins[0]} />
      <CryptoTable coins={coins} />
    </div>
  );
}
