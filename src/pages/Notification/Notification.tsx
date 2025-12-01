import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { getItemLocalStorage } from '@utils/LocalStorage';
import { mapNotificationResponseToItem } from '@utils/notificationMapper';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import { useMarkAsReadMutation, useNotificationsQuery } from '@controllers/query/notifications';
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
interface Notification {
  id: number;
  title: string;
  content: string;
  description: string;
  stockName: string;
  country: StockCountryKey;
  readStatus: boolean;
  date: Date;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: '인간지표 변동 알림',
    content: '[삼성전자] 인간지표 +18🔥',
    description: '민심 급등 중! 지금 확인해보세요',
    stockName: '삼성전자',
    country: 'KOREA',
    readStatus: false,
    date: new Date(new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * Math.random() * 24)),
  },
  {
    id: 2,
    title: '인간지표 변동 알림',
    content: '[한화솔루션] 인간지표 -18💧',
    description: '민심 급하락 중! 지금 확인해보세요',
    stockName: '한화솔루션',
    country: 'KOREA',
    readStatus: false,
    date: new Date(new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * Math.random() * 24)),
  },
  {
    id: 3,
    title: '인간지표 변동 알림',
    content: '[SK하이닉스] 인간지표 +7🔥',
    description: '민심 급등 중! 지금 확인해보세요',
    stockName: 'SK하이닉스',
    country: 'KOREA',
    readStatus: true,
    date: new Date(new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * Math.random() * 24)),
  },
  {
    id: 4,
    title: '인간지표 변동 알림',
    content: '[인텔] 인간지표 +5🔥',
    description: '민심 급등 중! 지금 확인해보세요',
    stockName: '인텔',
    country: 'OVERSEA',
    readStatus: true,
    date: new Date(new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * Math.random() * 24)),
  },
  {
    id: 5,
    title: '인간지표 변동 알림',
    content: '[삼성전자] 인간지표 -18💧',
    description: '민심 급하락 중! 지금 확인해보세요',
    stockName: '삼성전자',
    country: 'KOREA',
    readStatus: false,
    date: new Date(new Date().setTime(new Date().getTime() - 1000 * 60 * 60 * Math.random() * 24)),
  },
];

const NotificationList = ({ notifications }: { notifications: Notification[] }) => {
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
      <StockImage
        stockId={
          0
          //  notification.stockId
        }
      />
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
  // const [notifications, _setNotifications] = useState<Notification[]>(mockNotifications);

  const { data: notificationsPage, isLoading } = useNotificationsQuery(0, 20);

  const notifications = notificationsPage?.content ? notificationsPage.content.map(mapNotificationResponseToItem) : [];

  const isLogin = !!getItemLocalStorage('access_token');

  if (isLoading) return null;

  return (
    <NotificationContainer>
      {isLogin ? (
        <NotificationList notifications={notifications} />
      ) : (
        <>
          <NotificationList notifications={mockNotifications} />
          <NoLoginWrapper
            title={'지금 로그인을 하고\n관심종목의 심리가 어떻게 변하는지\n알림을 받아보아요'}
            description={'👋 로그인을 하면 심리가 급등/급락할 때\n알림을 받을 수 있어요'}
            buttonText="회원가입/로그인 하기"
            SecondaryButtonText="홈으로 가기"
          />
        </>
      )}
    </NotificationContainer>
  );
};

export default NotificationPage;
