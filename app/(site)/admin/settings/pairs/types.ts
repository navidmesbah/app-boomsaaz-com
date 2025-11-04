export interface TradingPair {
  id: string;
  baseCurrency: string;
  price: string;
  type: string;
  unit: string;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
} 