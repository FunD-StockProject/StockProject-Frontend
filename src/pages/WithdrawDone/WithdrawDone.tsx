import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { fetchAuthWithdraw } from '@controllers/api';
import BlueCheckSVG from '@assets/checkCircle.svg?react';

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
});

const RegisterDoneContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  flexGrow: '1',
  justifyContent: 'center',

  ['>svg']: {
    width: '72px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#3457FD',
  },

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      fontSize: '20px',
      fontWeight: '600',
    },

    ['&.desc']: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#CED4DA',
    },
  },
});

const RegisterButtonContainer = styled.div({
  padding: '0px 24px 24px',
  width: '100%',
  boxSizing: 'border-box',
});

const RegisterButton = styled.button({
  width: '100%',
  fontSize: '18px',
  fontWeight: '600',
  height: '48px',
  borderRadius: '8px',
  padding: '10px 0px',
  border: 'none',
  background: '#3457FD',
  color: 'white',
  [':disabled']: {
    color: '#101010',
  },
});

const WithdrawDone = () => {
  const navigate = useNavigate();

  const handleClickDone = async () => {
    await fetchAuthWithdraw();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('provider');
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
