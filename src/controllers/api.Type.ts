export interface StockInfo {
  stockId: number;
  symbol: string;
  symbolName: string;
  securityName: string;
  exchangeNum: string;
  scoreId: number;
  scoreKorea: number;
  scoreOversea: number;
  country: string;
}

export interface StockScore {
  stockId: number;
  symbolName: string;
  score: number;
  diff: number;
}
