import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import useAuthInfo from '@hooks/useAuthInfo';
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
import { theme } from '@styles/themes';
import BackIcon from '@assets/icons/arrowLeft.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import HeartIcon from '@assets/icons/heart.svg?react';
import ToastBellSVG from '@assets/icons/toast/bell.svg?react';
import ToastBellCrossSVG from '@assets/icons/toast/bell_cross.svg?react';
import ToastHeartSVG from '@assets/icons/toast/heart.svg?react';

const SearchHeaderWrapper = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 20px',
  boxSizing: 'border-box',
  marginBottom: '8px',

  ['>svg']: {
    fill: theme.colors.sub_gray5,
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const RightSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const IconButton = styled.button(
  ({ isActive }: { isActive?: boolean }) => ({
    ['>svg']: {
      fill: isActive ? theme.colors.sub_blue6 : theme.colors.sub_gray7,
      width: '36px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  }),
  {
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
);

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

  const onHeartClick = () => {
    if (!stockInfo) return;

    if (!isLogin) {
      openLoginModal();
      return;
    }

    if (!isBookmark) {
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

  const onBellClick = () => {
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
