import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import BlueCheckSVG from '@assets/checkCircle.svg?react';

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

const RegisterDone = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const handleClickDone = () => {
    navigate('/');
  };

  return (
    <RegisterContainer>
      <RegisterHeaderContainer>
        <div>
          <ArrowLeftSVG />
          <p>회원가입</p>
          <span />
        </div>
        <span className="divider" />
      </RegisterHeaderContainer>
      <RegisterDoneContents>
        <BlueCheckSVG />
        <p className="title">회원가입 완료 🎉</p>
        <p className="desc">
          인간지표에 오신걸 환영합니다.
          <br />
          민심을 읽고, 타이밍을 실험하세요.
          <br />
          당신의 직감은 얼마나 정확할까요?
        </p>
      </RegisterDoneContents>
      <RegisterButtonContainer>
        <RegisterButton onClick={handleClickDone}>홈으로 이동</RegisterButton>
      </RegisterButtonContainer>
    </RegisterContainer>
  );
};

export default RegisterDone;
