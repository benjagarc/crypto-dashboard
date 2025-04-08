'use client';

import { useQuery } from '@tanstack/react-query';
import { getTopCoins } from '@/lib/coingecko';

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['topCoins'],
    queryFn: getTopCoins,
  });

  if (isLoading) return <div className="p-8">Cargando criptos...</div>;
  if (error) return <div className="p-8 text-red-500">Error al cargar datos</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard de Criptomonedas</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data?.slice(0, 3), null, 2)}
      </pre>
    </div>
  );
}
