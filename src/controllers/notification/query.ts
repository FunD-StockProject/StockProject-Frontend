import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { mapNotificationResponseToItem } from '@utils/notificationMapper';
import { queryOptions } from '@controllers/common/query';
import { NotificationPageResponse, fetchNotification, fetchUnreadCount, markNotificationAsRead } from './api';
import { mockNotifications } from './mock';

const PAGE_SIZE = 20;

// ----- Queries -----
export const useNotificationsQuery = ({ useMock = false }: { useMock?: boolean }) => {
  const result = useInfiniteQuery<NotificationPageResponse>(
    ['notification'],
    ({ pageParam = 0 }) =>
      useMock
        ? Promise.resolve({
          content: mockNotifications,
          totalElements: mockNotifications.length,
          totalPages: 1,
          size: PAGE_SIZE,
          number: pageParam,
        })
        : fetchNotification(pageParam, PAGE_SIZE),
    {
      ...queryOptions,
      enabled: !!localStorage.getItem('access_token'),
      getNextPageParam: (lastPage) => {
        // 현재 페이지가 마지막 페이지보다 작으면 다음 페이지 번호 반환
        const currentPage = lastPage.number;
        const totalPages = lastPage.totalPages;

        if (currentPage + 1 < totalPages) {
          return currentPage + 1;
        }
        return undefined; // 더 이상 페이지 없음
      },
    },
  );

  console.log(result.data?.pages.flatMap((page) => page.content));

  return {
    ...result,
    // 모든 페이지의 content를 flat하게 합쳐서 반환
    notifications: result.data?.pages.flatMap((page) => page.content).map(mapNotificationResponseToItem),
    // 전체 개수
    totalElements: result.data?.pages[0]?.totalElements ?? 0,
  };
};

export const useUnreadCountQuery = () => {
  return useQuery<{ unreadCount: number }>(['unreadCount'], fetchUnreadCount, {
    ...queryOptions,
    enabled: !!localStorage.getItem('access_token'),
  });
};

// ----- Mutations -----

export const useMarkAsReadMutation = () => {
  const qc = useQueryClient();
  return useMutation((notificationId: number) => markNotificationAsRead(notificationId), {
    onSuccess: () => {
      qc.invalidateQueries(['notifications']);
      qc.invalidateQueries(['unreadCount']);
    },
  });
};
