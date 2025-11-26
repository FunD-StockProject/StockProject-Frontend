import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  NotificationPageResponse,
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
} from '@controllers/api/notifications';
import { queryOptions } from './common';

// ----- Queries -----
export const useNotificationsQuery = (page: number = 0, size: number = 20) => {
  return useQuery<NotificationPageResponse>(['notifications', page, size], () => fetchNotifications(page, size), {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

export const useUnreadCountQuery = () => {
  return useQuery<{ unreadCount: number }>(['unreadCount'], fetchUnreadCount, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

export const useMarkAsReadMutation = () => {
  const qc = useQueryClient();
  return useMutation((notificationId: number) => markNotificationAsRead(notificationId), {
    onSuccess: () => {
      qc.invalidateQueries(['notifications']);
      qc.invalidateQueries(['unreadCount']);
    },
  });
};
