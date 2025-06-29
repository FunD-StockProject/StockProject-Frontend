import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchOAuth2Kakao } from '@controllers/api';
import CheckCircleSVG from '@assets/icons/checkCircle.svg?react';

const LoginButton = styled.button({
  padding: '8px',
  [':focused']: {
    outline: 'none',
  },
});

const CheckBox = styled.div(
  ({ toggle }: { toggle: boolean }) => ({
    color: toggle ? '#3457fd' : 'white',
    ['svg']: {
      fill: toggle ? '#3457fd' : 'white',
    },
  }),
  {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    transition: 'color .1s ease-in-out',
    ['svg']: {
      transition: 'fill .1s ease-in-out',
    },
  },
);

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [toggleSaveId, setToggleSaveId] = useState(false);
  const [toggleKeepLogin, setToggleKeepLogin] = useState(false);

  const handleKakaoLogin = () => {
    localStorage.setItem('lastLoginProvider', 'kakao');
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}`;
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '16px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '16px 0', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '15px', fontWeight: '700' }}>당신은 '인간지표'인가요?</p>
          <p style={{ margin: '0', fontSize: '15px' }}>
            주식투자 심리도우미 인간지표에
            <br />
            오신걸 환영합니다!
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <LoginButton onClick={handleKakaoLogin}>카카오로 로그인</LoginButton>
          <LoginButton>네이버로 로그인</LoginButton>
          <LoginButton>Apple로 로그인</LoginButton>
          <LoginButton>구글로 로그인</LoginButton>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid white' }} />
      <div>
        <p>이메일 아이디로 로그인</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            placeholder="아이디(이메일)"
            style={{
              fontSize: '15px',
              padding: '8px',
            }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            style={{
              fontSize: '15px',
              padding: '8px',
            }}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <p style={{ color: 'red', fontSize: '10px' }}>비밀번호가 일치하지 않습니다.</p>
        <div style={{ display: 'flex', gap: '16px', padding: '12px 4px' }}>
          <CheckBox toggle={toggleSaveId} onClick={() => setToggleSaveId((prev) => !prev)}>
            <CheckCircleSVG />
            아이디 저장
          </CheckBox>
          <CheckBox toggle={toggleKeepLogin} onClick={() => setToggleKeepLogin((prev) => !prev)}>
            <CheckCircleSVG />
            로그인 유지
          </CheckBox>
        </div>
        <button style={{ width: '100%', padding: '8px' }}>로그인</button>
        <p style={{ textAlign: 'center' }}>
          아직 인간지표 계정이 없으시다면?{' '}
          <span style={{ borderBottom: '1px solid white' }} onClick={() => navigate(webPath.register())}>
            회원가입
          </span>
        </p>
        <div style={{ textAlign: 'center' }}>
          <span onClick={() => alert('아이디 찾기')}>아이디 찾기</span> |{' '}
          <span onClick={() => alert('비밀번호 찾기')}>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
