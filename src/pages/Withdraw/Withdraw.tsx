import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { fetchAuthWithdraw } from '@controllers/auth/api';
import AlarmSVG from '@assets/alarm.svg?react';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import HeartSVG from '@assets/heart.svg?react';
import LabSVG from '@assets/lab.svg?react';
import ShortViewSVG from '@assets/shortView.svg?react';
import WithdrawPNG from '@assets/withdraw.png';
import {
  RegisterButton,
  RegisterButtonContainer,
  RegisterContainer,
  RegisterHeaderContainer,
  WithdrawButtonContainer,
  WithdrawContent,
  WithdrawTitleContainer,
} from './Withdraw.Style';

const Withdraw = () => {
  const { navToMyPage, navToWithdrawDone, navToBack } = useRouter();
  const { clearAuthInfo } = useAuthInfo();

  const UserService = [
    { icon: <LabSVG />, name: '매수 타이밍 실험실' },
    { icon: <ShortViewSVG />, name: '맞춤형 종목 추천(숏뷰)' },
    { icon: <AlarmSVG />, name: '급등락 종목 알림' },
    { icon: <HeartSVG />, name: '관심 종목 설정' },
  ];

  const handleClickCancelWithdraw = () => {
    navToMyPage();
  };

  const handleWithdraw = async () => {
    await fetchAuthWithdraw();
    clearAuthInfo();
    navToWithdrawDone();
  };

  const [LogoutModal, openLogoutModal] = ConfirmModal({ title: '정말 탈퇴 하시겠어요?', onConfirm: handleWithdraw });

  return (
    <RegisterContainer>
      <LogoutModal />
      <RegisterHeaderContainer>
        <div>
          <ArrowLeftSVG onClick={navToBack} />
          <p>회원 탈퇴</p>
          <span />
        </div>
        <span className="divider" />
      </RegisterHeaderContainer>
      <WithdrawContent>
        <WithdrawTitleContainer>
          <img src={WithdrawPNG} loading="lazy" />
          <div>
            <p className="title">정말 탈퇴를 진행하시겠어요?</p>
            <p className="desc">
              탈퇴를 하시면, 회원 전용 서비스는
              <br />더 이상 이용하실 수 없어요
            </p>
          </div>
        </WithdrawTitleContainer>
        <WithdrawButtonContainer>
          {UserService.map((e, index) => (
            <button key={`USER_SERVICE_${index}`}>
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

export default Withdraw;
