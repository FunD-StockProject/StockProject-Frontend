export interface StockInfo {
  stockId: number;
  symbol: string;
  symbolName: string;
  securityName: string;
  exchangeNum: string;
  country: string;

  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  priceSign: number;
}

export interface StockScore {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
}

export interface RevelantStockInfo {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
}

export type PERIOD_CODE = 'D' | 'W' | 'M';
