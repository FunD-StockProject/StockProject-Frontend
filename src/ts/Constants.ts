import { themeColor } from '@styles/themes';
import { PERIOD_CODE, RESULT_TYPE, SEARCH_CATEGORY, STOCK_COUNTRY } from './Types';

const STOCK_COUNTRY_TEXT: Record<STOCK_COUNTRY, string> = {
  KOREA: '국내',
  OVERSEA: '해외',
};

const SEARCH_CATEGORY_TEXT: Record<SEARCH_CATEGORY, string> = {
  STOCK: '종목',
  KEYWORD: '키워드',
};

const STOCK_UPDATE_TIME: Record<string, string> = {
  KOREA: '17',
  OVERSEA: '06',
};

const MARKET_CODES: Record<string, string> = {
  '512': '나스닥',
  '513': '뉴욕',
  '529': '아멕스',
  '001': '코스피',
  '002': '코스닥',
  '003': 'ETF',
};

const TEXT_SIZE_ADJUST = {
  chrome: 0.055,
  safari: -0.105,
};

const CHART_PRICE_FIELD = {
  open: { key: 'openPrice', label: '시가' },
  high: { key: 'highPrice', label: '고가' },
  low: { key: 'lowPrice', label: '저가' },
  close: { key: 'closePrice', label: '종가' },
};

const CHART_SCALE_RATIO = [1, 2, 2.5, 4, 5];

const PERIOD_CODE_TEXT: Record<PERIOD_CODE, string> = {
  D: '일',
  W: '주',
  M: '월',
};

const MAX_MIN: Record<'max' | 'min', any> = {
  max: {
    type: 'high',
    mul: 1,
    init: -Infinity,
    label: '최고',
  },
  min: {
    type: 'low',
    mul: -1,
    init: Infinity,
    label: '최저',
  },
};

const CHART_MOVING_AVERAGE_COLOR: Record<string, themeColor> = {
  5: 'success',
  20: 'red',
  60: 'cyan',
  120: 'yellow',
};

const ResultInfo: Record<
  RESULT_TYPE,
  {
    text: string;
    opposite: RESULT_TYPE;
  }
> = {
  INDICATOR: {
    text: '인간지표',
    opposite: 'CHART',
  },
  CHART: {
    text: '차트',
    opposite: 'INDICATOR',
  },
};

export {
  STOCK_UPDATE_TIME,
  MARKET_CODES,
  STOCK_COUNTRY_TEXT,
  SEARCH_CATEGORY_TEXT,
  TEXT_SIZE_ADJUST,
  CHART_PRICE_FIELD,
  CHART_SCALE_RATIO,
  PERIOD_CODE_TEXT,
  MAX_MIN,
  CHART_MOVING_AVERAGE_COLOR,
  ResultInfo,
};
