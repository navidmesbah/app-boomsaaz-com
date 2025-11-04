import { notFound } from 'next/navigation';
import TradingPairForm from '../TradingPairForm';
import { getTradingPairsAction } from '../actions';

interface EditTradingPairPageProps {
  params: {
    id: string;
  };
}

export default async function EditTradingPairPage({ params }: EditTradingPairPageProps) {
  const tradingPairs = await getTradingPairsAction();
  const tradingPair = tradingPairs.find((pair) => pair.id === params.id);

  if (!tradingPair) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">ویرایش کالا</h1>
      <TradingPairForm tradingPair={tradingPair} />
    </div>
  );
} 