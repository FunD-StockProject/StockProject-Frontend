import { useNavigate } from 'react-router-dom';
import BlueCheckSVG from '@assets/checkCircle.svg?react';
import { RegisterButton, RegisterButtonContainer, RegisterContainer, RegisterDoneContents } from './WithdrawDone.Style';

const WithdrawDone = () => {
  const navigate = useNavigate();

  const handleClickDone = async () => {
    navigate('/');
  };

  return (
    <RegisterContainer>
      <RegisterDoneContents>
        <BlueCheckSVG />
        <p className="title">회원 탈퇴 완료 🥲</p>
        <p className="desc">
          그동안 인간지표와 함께해주셔서 감사합니다.
          <br />
          다시 감정지표가 궁금해질 땐 언제든 돌아오세요!
        </p>
      </RegisterDoneContents>
      <RegisterButtonContainer>
        <RegisterButton onClick={handleClickDone}>탈퇴 완료</RegisterButton>
      </RegisterButtonContainer>
    </RegisterContainer>
  );
};

export default WithdrawDone;
