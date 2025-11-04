import TradingPairsList from './TradingPairsList';
import { getTradingPairsAction } from './actions';

export default async function TradingPairsPage() {
  const tradingPairs = await getTradingPairsAction();

  return <TradingPairsList initialTradingPairs={tradingPairs} />;
} 