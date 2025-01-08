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
  keywords: string[];
}

export interface RevelantStockInfo {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
}

export interface StockTableInfo {
  stockId: string;
  symbolName: string;
  country: string;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  scoreDiff: number;
}

export interface IndexInfo {
  kospiVix: number;
  kospiVixDiff: number;
  kospiIndex: number;
  kospiIndexDiff: number;
  kosdaqIndex: number;
  kosdaqIndexDiff: number;
  snpVix: number;
  snpVixDiff: number;
  snpIndex: number;
  snpIndexDiff: number;
  nasdaqIndex: number;
  nasdaqIndexDiff: number;
}

export type PERIOD_CODE = 'D' | 'W' | 'M';
