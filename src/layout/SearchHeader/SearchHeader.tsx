import { MESSAGE_TYPES } from '@config/webview';
import { useNavigate } from 'react-router-dom';
import useAuthInfo from '@hooks/useAuthInfo';
import useLocalStorageState from '@hooks/useLocalStorageState';
import useToast from '@hooks/useToast';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import Toast from '@components/Toast/Toast';
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useStockPreferenceQuery,
  useToggleNotificationMutation,
} from '@controllers/preference/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import BackIcon from '@assets/icons/arrowLeft.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import HeartIcon from '@assets/icons/heart.svg?react';
import ToastBellSVG from '@assets/icons/toast/bell.svg?react';
import ToastBellCrossSVG from '@assets/icons/toast/bell_cross.svg?react';
import ToastHeartSVG from '@assets/icons/toast/heart.svg?react';
import { IconButton, RightSection, SearchHeaderWrapper } from './SearchHeader.Style';

const SearchHeader = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const navigate = useNavigate();
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
      deleteBookmark(stockInfo.stockId);
    }
  };

  const onBellClick = async () => {
    if (!stockInfo) return;

    if (!isLogin) {
      openLoginModal();
      return;
    }

    if (isNotification) {
      showToast(
        <>
          <ToastBellCrossSVG />
          <p>알림이 해제되었어요</p>
        </>,
      );
    } else {
      await checkAndRequestNotificationPermission();
      showToast(
        <>
          <ToastBellSVG />
          <p>알림이 설정되었어요</p>
        </>,
      );
    }

    toggleNotification(stockInfo.stockId);
  };

  const handleLoginWithState = () => {
    handleNavigateLogin({
      returnState: {
        symbolName: stockInfo.symbolName,
        country: stockInfo.country,
      },
    });
  };

  const [LoginModal, openLoginModal] = ConfirmModal({
    title: '관심종목 알림을 받으려면, 로그인이 필요해요!',
    description: '관심종목의 심리가 급등/급락할때 알림을 받고싶다면, 로그인을 진행해주세요',
    onConfirm: handleLoginWithState,
    isInverse: true,
    actionText: ['로그인하기', '취소'],
  });

  return (
    <SearchHeaderWrapper>
      <LoginModal />
      <BackIcon onClick={() => navigate(-1)} />
      <RightSection>
        <IconButton isActive={isBookmark}>
          <HeartIcon onClick={onHeartClick} />
        </IconButton>
        <IconButton isActive={isNotification}>
          <BellSVG onClick={onBellClick} />
        </IconButton>
      </RightSection>
      <Toast toast={toast} hideToast={hideToast} />
      {/* {toast.enabled && <SearchHeaderToast closing={toast.closing}>{toast.message}</SearchHeaderToast>} */}
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;
