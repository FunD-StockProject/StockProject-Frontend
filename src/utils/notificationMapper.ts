import { StockCountryKey } from '@ts/StockCountry';
import { NotificationResponse } from '@controllers/notification/api';

export interface NotificationItem {
  id: number;
  stockId: number;
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
  const title = response.notificationType === 'SCORE_SPIKE' ? '인간지표 변동 알림' : '';
  const scoreDiff = (response.newScore ?? 0) - (response.oldScore ?? 0);
  const sign = !scoreDiff ? '' : scoreDiff > 0 ? '+' : '-';
  const emoji = scoreDiff > 0 ? '🔥' : '💧';
  const content = `[${response.stockName}] 인간지표 ${sign}${scoreDiff}점${emoji}`;
  const description = `민심 ${sign === '+' ? '급등' : '급락'} 중! 지금 확인해보세요`;

  const date = new Date(response.createdAt);

  return {
    id: response.id ?? 0,
    stockId: response.stockId ?? 0,
    title,
    content,
    description,
    stockName: response.stockName ?? '',
    country: response.country ?? 'KOREA',
    readStatus: response.isRead,
    date,
  };
};
