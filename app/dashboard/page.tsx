"use client";

import { useQuery } from "@tanstack/react-query";
import { getTopCoins } from "@/lib/coingecko";
import KPI from "@/components/KPI";
import CryptoChart from "@/components/CryptoChart";
import CryptoTable from "@/components/CryptoTable";
import { CoinElementInterface } from "./interface";

export default function DashboardPage() {
  const {
    data: coins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topCoins"],
    queryFn: getTopCoins,
  });

  if (isLoading) return <div className="p-8">Cargando criptos...</div>;
  if (error)
    return <div className="p-8 text-red-500">Error al cargar datos</div>;

  return (
    <div className="p-8 space-y-6 background-ligth">
      <h1 className="text-3xl font-bold">Dashboard de Criptomonedas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {coins.slice(0, 3).map((coin: CoinElementInterface) => (
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
