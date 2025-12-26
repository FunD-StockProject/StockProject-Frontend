import { StockCountryKey } from '@ts/StockCountry';
import { StockSectorKey } from '@ts/StockSector';
import { fetchAuthData } from '@controllers/common/base';
import type { StockInfo } from '@controllers/stocks/types';

export type { StockInfo };

export interface SectorRecommendStockInfo {
  stockId: number;
  imageUrl: string;
  stockName: string;
  price: number;
  priceDiff: number;
  priceDiffPerCent: number;
  score: number;
  diff: number;
  keywords: string[];
  country: StockCountryKey;
}

export interface BuyExperimentResponse {
  success: boolean;
  message: string;
  price: number;
}

export type ExperimentStatus = 'COMPLETE' | 'PROGRESS';

export interface ExperimentItem {
  experimentId: number;
  symbolName: string;
  buyAt: string;
  buyPrice: number;
  roi: number;
  status: ExperimentStatus;
  country: StockCountryKey;
  buyScore: number;
  currentScore: number;
  currentPrice: number;
  stockId: number;
}

export interface ExperimentStatusResponse {
  progressExperiments: ExperimentItem[];
  completeExperiments: ExperimentItem[];
  avgRoi: number;
  totalTradeCount: number;
  progressTradeCount: number;
  successRate: number;
}

export interface ExperimentDetailTradeInfo {
  price: number;
  score: number;
  tradeAt: string;
  roi: number;
}

export interface ExperimentDetailResponse {
  symbolName: string;
  stockId: number;
  roi: number;
  status: ExperimentStatus;
  tradeInfos: ExperimentDetailTradeInfo[];
  buyScore: number;
  currentScore: number;
  buyPrice: number;
  currentPrice: number;
  buyAt: string;
  country: StockCountryKey;
}

export interface ExperimentReportStatisticDto {
  scoreRange: string;
  totalAvgRoi: number;
  userAvgRoi: number;
}

export interface ExperimentReportPatternDto {
  roi: number;
  score: number;
  buyAt: string;
}

export interface ExperimentReportResponse {
  weeklyExperimentCount: number;
  reportStatisticDtos: ExperimentReportStatisticDto[];
  totalUserExperiments: number;
  successUserExperiments: number;
  sameGradeUserRate: number;
  reportPatternDtos: ExperimentReportPatternDto[];
}

export interface PortfolioResultScoreTable {
  range: string;
  avg: number;
  median: number;
}

export interface PortfolioResultProfit {
  score: number;
  range: string;
}
export interface PortfolioResultExperimentSummary {
  totalExperiments: number;
  highestProfit: PortfolioResultProfit;
  lowestProfit: PortfolioResultProfit;
}

export interface PortfolioResultHumanIndex {
  userScore: number;
  userType: string;
  successRate: string;
  maintainRate: string;
  purchasedCount: number;
  profitCount: number;
  sameGradeUserRate: number;
}

export interface PortfolioResultInvestmentPattern {
  patternType: string;
  patternDescription: string;
  avgScore: number;
}

export interface PortfolioResultHistory {
  x: number;
  y: number;
  label: string;
}
export interface PortfolioResultResponse {
  scoreTable: PortfolioResultScoreTable[];
  experimentSummary: PortfolioResultExperimentSummary;
  humanIndex: PortfolioResultHumanIndex;
  investmentPattern: PortfolioResultInvestmentPattern;
  history: PortfolioResultHistory[];
}

// POST /experiment/{stockId}/buy/{country}
export const fetchBuyExperiment = (stockId: number, country: StockCountryKey): Promise<BuyExperimentResponse> => {
  return fetchAuthData(`/experiment/${stockId}/buy/${country}`, { method: 'POST' });
};

// GET /experiment/status
export const fetchExperimentStatus = (): Promise<ExperimentStatusResponse> => {
  return fetchAuthData('/experiment/status', { method: 'GET' });
};

// GET /experiment/status/{experimentId}/detail
export const fetchExperimentDetail = (experimentId: number): Promise<ExperimentDetailResponse> => {
  return fetchAuthData(`/experiment/status/${experimentId}/detail`, { method: 'GET' });
};

// GET /experiment/report
export const fetchExperimentReport = (): Promise<ExperimentReportResponse> => {
  return fetchAuthData('/experiment/report', { method: 'GET' });
};

// GET /portfolio/result
export const fetchPortfolioResult = (): Promise<PortfolioResultResponse> => {
  return fetchAuthData('/portfolio/result', { method: 'GET' });
};

// GET /stock/sector/overseas/{sectorKey}/recommend
// GET /stock/sector/domestic/{sectorKey}/recommend
export const fetchSectorRecommend = async (
  country: StockCountryKey,
  sectorKey: StockSectorKey,
): Promise<SectorRecommendStockInfo[]> => {
  const countryPath = country == 'KOREA' ? 'domestic' : 'overseas';

  try {
    const res = await fetchAuthData(`/stock/sector/${countryPath}/${sectorKey}/recommend`);
    // 204 No Content인 경우 빈 배열 반환
    if (!res || (Array.isArray(res) && res.length === 0)) {
      return [];
    }
    return res;
  } catch (error) {
    console.error('fetchSectorRecommend error:', error);
    return [];
  }
};
