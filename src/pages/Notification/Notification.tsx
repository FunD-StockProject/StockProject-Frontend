import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { NotificationItem } from '@utils/notificationMapper';
import useLogin from '@hooks/useLogin';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import { useMarkAsReadMutation, useNotificationsQuery } from '@controllers/notification/query';
import AlarmExamplePNG from '@assets/design/alarmExample.png';
import {
  AlarmExampleTextContainer,
  AlarmExampleWrapper,
  NotificationContainer,
  NotificationItemContainer,
  NotificationItemContent,
} from './Notification.Style';

const getBeforeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  if (diffYears > 0) return `${diffYears}년 전`;
  if (diffMonths > 0) return `${diffMonths}개월 전`;
  if (diffWeeks > 0) return `${diffWeeks}주 전`;
  if (diffDays > 0) return `${diffDays}일 전`;
  return `${diffHours}시간 전`;
};

const NotificationList = ({ notifications }: { notifications: NotificationItem[] }) => {
  const navigate = useNavigate();

  const { mutate: readNotification } = useMarkAsReadMutation();

  const handleClickNotification = (notificationId: number, symbolName: string, country: StockCountryKey) => () => {
    readNotification(notificationId);
    navigate(webPath.search(), { state: { symbolName: symbolName, country: country } });
  };

  if (notifications.length === 0)
    return (
      <AlarmExampleWrapper>
        <img src={AlarmExamplePNG} />
        <AlarmExampleTextContainer>
          <p className="title">아직은 알림이 없어요</p>
          <p className="description">
            관심 종목을 설정하고 <br />
            인간지표 변동 알림을 받아보세요!
          </p>
        </AlarmExampleTextContainer>
      </AlarmExampleWrapper>
    );

  return notifications.map((notification) => (
    <NotificationItemContainer
      key={notification.id}
      readStatus={notification.readStatus}
      onClick={handleClickNotification(notification.id, notification.stockName, notification.country)}
    >
      <StockImage stockId={notification.stockId} />
      <NotificationItemContent>
        <p className="title">
          {notification.title}
          <span>{getBeforeTime(notification.date)}</span>
        </p>
        <p className="content">{notification.content}</p>
        <p className="description">{notification.description}</p>
      </NotificationItemContent>
    </NotificationItemContainer>
  ));
};

const NotificationPage = () => {
  const { isLogin } = useLogin();

  const {
    notifications = [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotificationsQuery({ useMock: !isLogin });

  useEffect(() => {
    const handleMoreNotifications = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop - clientHeight < 100) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };
    handleMoreNotifications();

    window.addEventListener('scroll', handleMoreNotifications);
    return () => window.removeEventListener('scroll', handleMoreNotifications);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return null;

  return (
    <NotificationContainer>
      <NoLoginWrapper
        title={
          <>
            지금 로그인을 하고 <br />
            관심종목의 심리가 어떻게 변하는지 <br />
            알림을 받아보아요
          </>
        }
        description={
          <>
            👋 로그인을 하면 심리가 급등/급락할 때 <br />
            알림을 받을 수 있어요
          </>
        }
        buttonText="회원가입/로그인 하기"
        SecondaryButtonText="홈으로 가기"
        hasHeader
      />
      <NotificationList notifications={notifications} />
    </NotificationContainer>
  );
};

export default NotificationPage;
