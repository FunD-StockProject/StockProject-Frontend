// 국내 섹터
export type KoreaSectorKey =
  | 'RETAIL'
  | 'CONSTRUCTION'
  | 'TRANSPORTATION_WAREHOUSING'
  | 'FINANCIAL'
  | 'GENERAL_SERVICE'
  | 'MANUFACTURING'
  | 'ENTERTAINMENT_CULTURE'
  | 'UTILITIES'
  | 'TELECOMMUNICATIONS'
  | 'REAL_ESTATE'
  | 'IT_SERVICE'
  | 'UNKNOWN';

// 해외 섹터
export type OverseaSectorKey =
  | 'COMMUNICATION_SERVICES'
  | 'CONSUMER_DISCRETIONARY'
  | 'CONSUMER_STAPLES'
  | 'ENERGY'
  | 'FINANCIALS'
  | 'HEALTH_CARE'
  | 'INDUSTRIALS'
  | 'INFORMATION_TECHNOLOGY'
  | 'MATERIALS'
  | 'REAL_ESTATE'
  | 'UNKNOWN'
  | 'UTILITIES';

// 전체 섹터 (국내 + 해외)
export type StockSectorKey = KoreaSectorKey | OverseaSectorKey;

export interface StockSectorData {
  text: string;
}

export interface StockSector extends StockSectorData {
  key: StockSectorKey;
}

// 국내 섹터 맵
export const KOREA_SECTOR_MAP: Record<KoreaSectorKey, StockSectorData> = {
  RETAIL: {
    text: '유통',
  },
  CONSTRUCTION: {
    text: '건설',
  },
  TRANSPORTATION_WAREHOUSING: {
    text: '운송·창고',
  },
  FINANCIAL: {
    text: '금융',
  },
  GENERAL_SERVICE: {
    text: '일반서비스',
  },
  MANUFACTURING: {
    text: '제조',
  },
  ENTERTAINMENT_CULTURE: {
    text: '오락·문화',
  },
  UTILITIES: {
    text: '전기·가스',
  },
  TELECOMMUNICATIONS: {
    text: '통신',
  },
  REAL_ESTATE: {
    text: '부동산',
  },
  IT_SERVICE: {
    text: 'IT 서비스',
  },
  UNKNOWN: {
    text: '',
  },
};

// 해외 섹터 맵
export const OVERSEA_SECTOR_MAP: Record<OverseaSectorKey, StockSectorData> = {
  COMMUNICATION_SERVICES: {
    text: '통신서비스',
  },
  CONSUMER_DISCRETIONARY: {
    text: '경기소비재',
  },
  CONSUMER_STAPLES: {
    text: '필수소비재',
  },
  ENERGY: {
    text: '에너지',
  },
  FINANCIALS: {
    text: '금융',
  },
  HEALTH_CARE: {
    text: '헬스케어',
  },
  INDUSTRIALS: {
    text: '산업재',
  },
  INFORMATION_TECHNOLOGY: {
    text: '정보기술',
  },
  MATERIALS: {
    text: '소재',
  },
  REAL_ESTATE: {
    text: '부동산',
  },
  UNKNOWN: {
    text: '',
  },
  UTILITIES: {
    text: '유틸리티',
  },
};

// 전체 섹터 맵 (국내 + 해외, 중복 키는 해외가 우선)
export const STOCK_SECTOR_MAP: Record<StockSectorKey, StockSectorData> = {
  ...KOREA_SECTOR_MAP,
  ...OVERSEA_SECTOR_MAP,
};

// 국내 섹터 목록
export const KOREA_SECTORS: StockSector[] = [
  { key: 'RETAIL', text: '유통' },
  { key: 'CONSTRUCTION', text: '건설' },
  { key: 'TRANSPORTATION_WAREHOUSING', text: '운송·창고' },
  { key: 'FINANCIAL', text: '금융' },
  { key: 'GENERAL_SERVICE', text: '일반서비스' },
  { key: 'MANUFACTURING', text: '제조' },
  { key: 'ENTERTAINMENT_CULTURE', text: '오락·문화' },
  { key: 'UTILITIES', text: '전기·가스' },
  { key: 'TELECOMMUNICATIONS', text: '통신' },
  { key: 'REAL_ESTATE', text: '부동산' },
  { key: 'IT_SERVICE', text: 'IT 서비스' },
];

// 해외 섹터 목록 (알파벳 순)
export const OVERSEA_SECTORS: StockSector[] = [
  { key: 'COMMUNICATION_SERVICES', text: '통신서비스' },
  { key: 'CONSUMER_DISCRETIONARY', text: '경기소비재' },
  { key: 'CONSUMER_STAPLES', text: '필수소비재' },
  { key: 'ENERGY', text: '에너지' },
  { key: 'FINANCIALS', text: '금융' },
  { key: 'HEALTH_CARE', text: '헬스케어' },
  { key: 'INDUSTRIALS', text: '산업재' },
  { key: 'INFORMATION_TECHNOLOGY', text: '정보기술' },
  { key: 'MATERIALS', text: '소재' },
  { key: 'REAL_ESTATE', text: '부동산' },
  { key: 'UTILITIES', text: '유틸리티' },
];

// 전체 섹터 목록 (국내 + 해외)
export const STOCK_SECTORS: StockSector[] = [...KOREA_SECTORS, ...OVERSEA_SECTORS];

