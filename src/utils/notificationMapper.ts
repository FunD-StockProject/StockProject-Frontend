import { StockCountryKey } from '@ts/StockCountry';
import { NotificationResponse } from '@controllers/api/notifications';

export interface NotificationItem {
  id: number;
  title: string;
  content: string;
  description: string;
  stockName: string;
  country: StockCountryKey;
  readStatus: boolean;
  date: Date;
}

/**
 * 백엔드 NotificationResponse를 프론트엔드 NotificationItem으로 변환
 */
export const mapNotificationResponseToItem = (response: NotificationResponse): NotificationItem => {
  // content: "[종목명] 인간지표 +18🔥" 형식으로 생성
  const changeValue = response.changeAbs || 0;
  const isPositive = changeValue > 0;
  const emoji = isPositive ? '🔥' : '💧';
  const sign = isPositive ? '+' : '';
  const content = response.stockName
    ? `[${response.stockName}] 인간지표 ${sign}${changeValue}${emoji}`
    : response.title;

  // description: body에서 생성하거나 기본 메시지
  let description = response.body;
  if (!description && response.changeAbs) {
    description = isPositive ? '민심 급등 중! 지금 확인해보세요' : '민심 급하락 중! 지금 확인해보세요';
  }
  if (!description) {
    description = '지금 확인해보세요';
  }

  // country: null이면 기본값으로 KOREA 사용
  const country: StockCountryKey = response.country || 'KOREA';

  // date: ISO 8601 문자열을 Date 객체로 변환
  const date = new Date(response.createdAt);

  return {
    id: response.id,
    title: response.title,
    content,
    description,
    stockName: response.stockName || '',
    country,
    readStatus: response.isRead,
    date,
  };
};
