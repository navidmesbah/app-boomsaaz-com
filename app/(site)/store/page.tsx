import { getTradingPairs } from '@/lib/db/queries';
import { TradingPairCard } from './components/TradingPairCard';

export const revalidate = 3600; // Revalidate every hour

export default async function StorePage() {
  const tradingPairs = await getTradingPairs();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">محصولات ما</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tradingPairs.map((pair) => (
          <TradingPairCard key={pair.id} tradingPair={pair} />
        ))}
      </div>
    </div>
  );
} 