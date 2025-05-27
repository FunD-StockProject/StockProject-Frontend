import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const LoginButton = styled.button({
  padding: '8px',
  [':focused']: {
    outline: 'none',
  },
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ textAlign: 'center' }}>당신은 '인간지표'인가요?</p>
        <div
          style={{
            width: '120px',
            border: '1px solid white',
            aspectRatio: '1 / 1',
          }}
        ></div>
        <p style={{ textAlign: 'center' }}>
          주식투자 심리도우미 인간지표에
          <br />
          오신걸 환영합니다!
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: '1',
          justifyContent: 'center',
        }}
      >
        <LoginButton>카카오로 시작하기</LoginButton>
        <LoginButton>네이버로 시작하기</LoginButton>
        <LoginButton>Apple로 시작하기</LoginButton>
        <LoginButton
          onClick={() => {
            navigate(webPath.registerDetail(), { state: { type: 'social' } });
          }}
        >
          구글로 시작하기
        </LoginButton>
        <LoginButton
          onClick={() => {
            navigate(webPath.registerDetail(), { state: { type: 'email' } });
          }}
        >
          이메일 아이디로 시작하기
        </LoginButton>
      </div>
    </div>
  );
};

export default Register;
