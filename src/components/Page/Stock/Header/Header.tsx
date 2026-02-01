import { MESSAGE_TYPES } from '@config/webview';
import useAuthInfo from '@hooks/useAuthInfo';
import useLocalStorageState from '@hooks/useLocalStorageState';
import useToast from '@hooks/useToast';
import useRouter from '@router/useRouter';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import Toast from '@components/Toast/Toast';
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useStockPreferenceQuery,
  useToggleNotificationMutation,
} from '@controllers/preference/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import ArrowLeftSVG from '@assets/icons/arrowLeft.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import HeartSVG from '@assets/icons/heart.svg?react';
import ToastBellSVG from '@assets/icons/toast/bell.svg?react';
import ToastBellCrossSVG from '@assets/icons/toast/bell_cross.svg?react';
import ToastHeartSVG from '@assets/icons/toast/heart.svg?react';
import { HeaderContainer, HeaderIconButton } from './Header.Style';

const StockHeader = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { navToBack } = useRouter();
  const { isLogin, handleNavigateLogin } = useAuthInfo();
  const { toast, showToast, hideToast } = useToast();

  const { data: stockPreference } = useStockPreferenceQuery(stockInfo.stockId);
  const { mutate: addBookMark } = useAddBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: toggleNotification } = useToggleNotificationMutation();
  const isBookmark = stockPreference?.isBookmarked ?? false;
  const isNotification = stockPreference?.isNotificationEnabled ?? false;
  const [accessToken] = useLocalStorageState<string>('access_token');

  const checkAndRequestNotificationPermission = async () => {
    const isWebView = !!(window as any).ReactNativeWebView;
    if (isWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.REQUEST_NOTIFICATION_PERMISSION,
          token: accessToken,
        }),
      );
    }
  };

  const onHeartClick = async () => {
    if (!stockInfo) return;
    if (!isLogin) {
      openLoginModal();
      return;
    }

    if (!isBookmark) {
      // 관심 등록 시 알림 권한 체크 및 요청
      await checkAndRequestNotificationPermission();

      showToast(
        <>
          <ToastHeartSVG />
          <p>관심 등록 완료! 민심 급변 시 알림 드릴게요</p>
        </>,
      );
      addBookMark(stockInfo.stockId);
    } else {
      openDeleteFavoritesModal();
    }
  };

  const onBellClick = async () => {
    if (!stockInfo) return;

    if (!isLogin) {
      openLoginModal();
      return;
    }

    if (!isNotification) {
      await checkAndRequestNotificationPermission();
      toggleNotification(stockInfo.stockId);
      showToast(
        <>
          <ToastBellSVG />
          <p>알림이 설정되었어요</p>
        </>,
      );
    } else {
      openOffNotificationModal();
    }
  };

  const handleNotificationDelete = async () => {
    closeOffNotificationModal();
    toggleNotification(stockInfo.stockId);
    showToast(
      <>
        <ToastBellCrossSVG />
        <p>알림이 해제되었어요</p>
      </>,
    );
  };

  const handleDeleteFavorites = () => {
    deleteBookmark(stockInfo.stockId);
    closeDeleteFavoritesModal();
  };

  const [OffNotificationModal, openOffNotificationModal, closeOffNotificationModal] = ConfirmModal({
    title: '알림을 해제할까요?',
    description: (
      <>
        관심 종목은 유지된 채, <wbr />
        알림만 해제돼요
      </>
    ),
    onConfirm: handleNotificationDelete,
    isInverse: true,
    actionText: ['해제하기', '취소'],
  });

  const [DeleteFavoritesModal, openDeleteFavoritesModal, closeDeleteFavoritesModal] = ConfirmModal({
    title: '관심 설정을 해제할까요?',
    description: <>변동 알림도 중단돼요</>,
    onConfirm: handleDeleteFavorites,
    isInverse: true,
    actionText: ['해제하기', '취소'],
  });

  const [LoginModal, openLoginModal] = ConfirmModal({
    title: '관심종목 알림을 받으려면, 로그인이 필요해요!',
    description: '관심종목의 심리가 급등/급락할때 알림을 받고싶다면, 로그인을 진행해주세요',
    onConfirm: handleNavigateLogin,
    isInverse: true,
    actionText: ['로그인하기', '취소'],
  });

  return (
    <HeaderContainer>
      <OffNotificationModal />
      <DeleteFavoritesModal />
      <LoginModal />
      <ArrowLeftSVG onClick={navToBack} />
      <span className="grow" />
      <HeaderIconButton isActive={isBookmark}>
        <HeartSVG onClick={onHeartClick} />
      </HeaderIconButton>
      <HeaderIconButton isActive={isNotification}>
        <BellSVG onClick={onBellClick} />
      </HeaderIconButton>
      <Toast toast={toast} hideToast={hideToast} />
    </HeaderContainer>
  );
};

export default StockHeader;
