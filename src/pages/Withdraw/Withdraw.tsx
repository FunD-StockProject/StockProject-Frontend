import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import AlarmSVG from '@assets/alarm.svg?react';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import HeartSVG from '@assets/heart.svg?react';
import LabSVG from '@assets/lab.svg?react';
import ShortViewSVG from '@assets/shortView.svg?react';
import WithdrawPNG from '@assets/withdraw.png';

const Withdraw = () => {
  const navigate = useNavigate();

  const UserService = [
    { icon: <LabSVG />, name: '매수 타이밍 실험실' },
    { icon: <ShortViewSVG />, name: '맞춤형 종목 추천(숏뷰)' },
    { icon: <AlarmSVG />, name: '급등락 종목 알림' },
    { icon: <HeartSVG />, name: '관심 종목 설정' },
  ];

  const handleClickCancelWithdraw = () => {
    navigate(webPath.mypage());
  };

  const handleWithdraw = async () => {
    navigate(webPath.withdrawDone());
  };

  const [LogoutModal, openLogoutModal] = ConfirmModal('정말 로그아웃 하시겠어요?', handleWithdraw);

  return (
    <RegisterContainer>
      <LogoutModal />
      <RegisterHeaderContainer>
        <div>
          <ArrowLeftSVG />
          <p>회원 탈퇴</p>
          <span />
        </div>
        <span className="divider" />
      </RegisterHeaderContainer>
      <WithdrawContent>
        <WithdrawTitleContainer>
          <img src={WithdrawPNG} />
          <div>
            <p className="title">정말 탈퇴를 진행하시겠어요?</p>
            <p className="desc">
              탈퇴를 하시면, 회원 전용 서비스는
              <br />더 이상 이용하실 수 없어요
            </p>
          </div>
        </WithdrawTitleContainer>
        <WithdrawButtonContainer>
          {UserService.map((e) => (
            <button>
              {e.icon}
              {e.name}
            </button>
          ))}
        </WithdrawButtonContainer>
        <hr />
        <p>
          그동안 감정 지표를 함께 나눌 수 있어서,
          <br />
          인간지표는 행복했어요 😭
          <br />
          <br />
          조금 아쉽지만…
          <br />
          탈퇴를 계속 진행할까요?
          <br />
        </p>
      </WithdrawContent>
      <RegisterButtonContainer>
        <RegisterButton color="secondary" onClick={openLogoutModal}>
          탈퇴하기
        </RegisterButton>
        <RegisterButton color="primary" onClick={handleClickCancelWithdraw}>
          인간지표와 평생 함께하기 ♥️
        </RegisterButton>
      </RegisterButtonContainer>
    </RegisterContainer>
  );
};

const WithdrawTitleContainer = styled.div({
  display: 'flex',
  gap: '10px',
  width: '100%',
  alignItems: 'center',
  padding: '0px 20px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '90px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '999px',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: '100%',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        color: '#F0F0F1',
        fontSize: '20px',
        fontWeight: '600',
      },
      ['&.desc']: {
        color: '#9A9C9E',
        fontSize: '14px',
        fontWeight: '500',
      },
    },
  },
});

const WithdrawButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '0px 20px',
  boxSizing: 'border-box',
  width: '100%',

  ['>button']: {
    background: '#1D1E1F',
    borderRadius: '10px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
});

const WithdrawContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '32px 0px',
  boxSizing: 'border-box',
  flexGrow: '1',

  ['>hr']: {
    background: '#1D1E1F',
    height: '4px',
    width: '100%',
    border: 'none',
  },

  ['>p']: {
    margin: '0',
    padding: '0 20px',
    width: '100%',
    boxSizing: 'border-box',
    fontsize: '16px',
    fontWeight: '500',
  },
});
const RegisterButtonContainer = styled.div({
  padding: '0px 24px 24px',
  width: '100%',
  boxSizing: 'border-box',
  gap: '16px',
  display: 'flex',
  flexDirection: 'column',
});

const RegisterButton = styled.button(
  ({ color }: { color: 'primary' | 'secondary' }) => ({
    background: color === 'primary' ? '#3457FD' : '#525658',
    color: color === 'primary' ? 'white' : '#101010',
  }),
  {
    width: '100%',
    fontSize: '18px',
    fontWeight: '600',
    height: '48px',
    borderRadius: '8px',
    padding: '10px 0px',
    border: 'none',
  },
);

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
});

const RegisterHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '9px',

  ['>div']: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 20px',
    boxSizing: 'border-box',
    gap: '12px',

    ['>svg,>span']: {
      width: '32px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFFFFF',
      flexGrow: '1',
      textAlign: 'center',
    },
  },

  ['>span.divider']: {
    background: '#1D1E1F',
    height: '4px',
  },
});

export default Withdraw;
