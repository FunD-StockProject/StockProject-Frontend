import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from '@controllers/api';

export type NotificationType = 'SCORE_SPIKE';

export interface NotificationResponse {
  id: number;
  stockId: number | null;
  stockName: string | null;
  notificationType: NotificationType;
  oldScore: number | null;
  newScore: number | null;
  changeAbs: number | null;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  country: StockCountryKey | null;
}

export interface NotificationPageResponse {
  content: NotificationResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// GET /notification
export const fetchNotification = (page: number = 0, size: number = 20): Promise<NotificationPageResponse> => {
  return fetchAuthData(`/notification?page=${page}&size=${size}`);
};

// GET /notification/unread-count
export const fetchUnreadCount = (): Promise<{ unreadCount: number }> => {
  return fetchAuthData(`/notification/unread-count`);
};

// PATCH /notification/read/{notificationId}
export const markNotificationAsRead = (notificationId: number): Promise<NotificationResponse> => {
  return fetchAuthData(`/notification/read/${notificationId}`, { method: 'PATCH' });
};
