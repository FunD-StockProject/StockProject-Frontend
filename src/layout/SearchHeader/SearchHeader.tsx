import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { getItemLocalStorage } from '@utils/LocalStorage';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { StockDetailInfo } from '@controllers/api.Type';
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
  useStockPreferenceQuery,
  useToggleNotificationMutation,
} from '@controllers/query/favorites';
import { theme } from '@styles/themes';
import BackIcon from '@assets/icons/arrowLeft.svg?react';
import BellSVG from '@assets/icons/bell.svg?react';
import MoreIcon from '@assets/icons/detail.svg?react';
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

const SearchHeaderToast = styled.div(
  ({ closing }: { closing: boolean }) => ({
    opacity: closing ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  }),
  {
    position: 'fixed',
    bottom: 'calc(96px + 24px)',
    zIndex: '10',
    left: '50%',
    transform: 'translateX(-50%)',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.75)',
    // width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid rgba(73, 80, 87, 0.5)',
    padding: '12px 16px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.5)',
    gap: '10px',
    maxWidth: '1280px',
    width: 'calc(min(100%, 1280px) - 40px)',

    ['>svg']: {
      width: '20px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.detail12Semibold,
      color: theme.colors.sub_gray2,

      ['&.cancel']: {
        color: theme.colors.sub_gray5,
        textDecoration: 'underline',
        marginLeft: 'auto',
        cursor: 'pointer',
      },
    },
  },
);

const SearchHeader = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const navigate = useNavigate();
  const isLogin = !!getItemLocalStorage('access_token');
  const { toast, showToast } = useToast();

  const { data: stockPreference } = useStockPreferenceQuery(stockInfo.stockId);
  const { mutate: addBookMark } = useAddBookmarkMutation();
  const { mutate: deleteBookmark } = useDeleteBookmarkMutation();
  const { mutate: toggleNotification } = useToggleNotificationMutation();
  const isBookmark = stockPreference?.isBookmarked ?? false;
  const isNotification = stockPreference?.isNotificationEnabled ?? false;

  const handleLogin = () => {
    navigate(webPath.login());
  };

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

  const [LoginModal, openLoginModal] = ConfirmModal({
    title: '관심종목 알림을 받으려면, 로그인이 필요해요!',
    description: '관심종목의 심리가 급등/급락할때 알림을 받고싶다면, 로그인을 진행해주세요',
    onConfirm: handleLogin,
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
        <IconButton>
          <MoreIcon />
        </IconButton>
      </RightSection>
      {toast.enabled && <SearchHeaderToast closing={toast.closing}>{toast.message}</SearchHeaderToast>}
    </SearchHeaderWrapper>
  );
};

export default SearchHeader;
