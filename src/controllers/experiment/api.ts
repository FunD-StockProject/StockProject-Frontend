import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from '@controllers/api';

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
  roi: number;
  status: ExperimentStatus;
  tradeInfos: ExperimentDetailTradeInfo[];
  buyScore: number;
  currentScore: number;
  buyPrice: number;
  currentPrice: number;
  buyAt: string;
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
