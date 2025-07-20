import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import AppleLoginPNG from '@assets/appleLogin.png';
import CloseSVG from '@assets/close.svg?react';
import GoogleLoginPNG from '@assets/googleLogin.png';
// import { fetchOAuth2Kakao } from '@controllers/api';
import CheckCircleSVG from '@assets/icons/checkCircle.svg?react';
import KakaoLoginPNG from '@assets/kakaoLogin.png';
import LogoWithTitleWhiteSVG from '@assets/logo_with_title_white.svg?react';
import NaverLoginPNG from '@assets/naverLogin.png';

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

const LoginPageContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
});

const LoginPageCloseWrapper = styled.div({
  display: 'flex',
  justifyContent: 'end',
  padding: '12px 20px',

  ['>svg']: {
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const LoginPageBannerContainer = styled.div({
  flexGrow: '2',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  justifyContent: 'center',
});

const LoginPageBannerContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#F0F0F1',
    },
    ['&.desc']: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#9A9C9E',
    },
  },
});

const LoginPageButtonContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  alignItems: 'center',
  // justifyContent: 'center',

  ['>p']: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#6C757D',
  },
});

const LoginPageButtonContents = styled.div({
  display: 'flex',
  gap: '16px',
});

const LoginPageButtonItemContainer = styled.div({
  display: 'flex',
  position: 'relative',

  ['>img']: {
    width: '64px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const Login = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [toggleSaveId, setToggleSaveId] = useState(false);
  const [toggleKeepLogin, setToggleKeepLogin] = useState(false);

  const handleKakaoLogin = () => {
    localStorage.setItem('lastLoginProvider', 'kakao');
    const redirectUri = `${window.location.origin}/login/oauth2/code/kakao`;
    console.log(redirectUri);

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_API_KEY}&redirect_uri=${redirectUri}`;
    window.location.href = kakaoAuthUrl;
  };

  const loginProviders = [
    {
      key: 'google',
      img: GoogleLoginPNG,
      method: () => {},
    },
    {
      key: 'naver',
      img: NaverLoginPNG,
      method: () => {},
    },
    {
      key: 'apple',
      img: AppleLoginPNG,
      method: () => {},
    },
    {
      key: 'kakao',
      img: KakaoLoginPNG,
      method: handleKakaoLogin,
    },
  ];

  return (
    <LoginPageContainer>
      <LoginPageCloseWrapper>
        <CloseSVG />
      </LoginPageCloseWrapper>
      <LoginPageBannerContainer>
        <LogoWithTitleWhiteSVG />
        <LoginPageBannerContents>
          <p className="title">당신은 '인간지표'인가요?</p>
          <p className="desc">
            주식투자 심리도우미 인간지표에
            <br />
            오신걸 환영합니다!
          </p>
        </LoginPageBannerContents>
      </LoginPageBannerContainer>
      <LoginPageButtonContainer>
        <LoginPageButtonContents>
          {loginProviders.map((e) => (
            <LoginPageButtonItemContainer>
              <img src={e.img} onClick={e.method} />
            </LoginPageButtonItemContainer>
          ))}
        </LoginPageButtonContents>
        <p>로그인에 문제가 있나요?</p>
      </LoginPageButtonContainer>
    </LoginPageContainer>
    // <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '16px', boxSizing: 'border-box' }}>
    //   <div style={{ display: 'flex', flexDirection: 'column', margin: '16px 0', gap: '16px' }}>
    //     <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
    //       <p style={{ margin: '0', fontSize: '15px', fontWeight: '700' }}>당신은 '인간지표'인가요?</p>
    //       <p style={{ margin: '0', fontSize: '15px' }}>
    //         주식투자 심리도우미 인간지표에
    //         <br />
    //         오신걸 환영합니다!
    //       </p>
    //     </div>
    //     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    //       <LoginButton onClick={handleKakaoLogin}>카카오로 로그인</LoginButton>
    //       <LoginButton>네이버로 로그인</LoginButton>
    //       <LoginButton>Apple로 로그인</LoginButton>
    //       <LoginButton>구글로 로그인</LoginButton>
    //     </div>
    //   </div>
    //   <div style={{ borderBottom: '1px solid white' }} />
    //   <div>
    //     <p>이메일 아이디로 로그인</p>
    //     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    //       <input
    //         type="text"
    //         placeholder="아이디(이메일)"
    //         style={{
    //           fontSize: '15px',
    //           padding: '8px',
    //         }}
    //         value={userId}
    //         onChange={(e) => setUserId(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         placeholder="비밀번호"
    //         style={{
    //           fontSize: '15px',
    //           padding: '8px',
    //         }}
    //         value={userPassword}
    //         onChange={(e) => setUserPassword(e.target.value)}
    //       />
    //     </div>
    //     <p style={{ color: 'red', fontSize: '10px' }}>비밀번호가 일치하지 않습니다.</p>
    //     <div style={{ display: 'flex', gap: '16px', padding: '12px 4px' }}>
    //       <CheckBox toggle={toggleSaveId} onClick={() => setToggleSaveId((prev) => !prev)}>
    //         <CheckCircleSVG />
    //         아이디 저장
    //       </CheckBox>
    //       <CheckBox toggle={toggleKeepLogin} onClick={() => setToggleKeepLogin((prev) => !prev)}>
    //         <CheckCircleSVG />
    //         로그인 유지
    //       </CheckBox>
    //     </div>
    //     <button style={{ width: '100%', padding: '8px' }}>로그인</button>
    //     <p style={{ textAlign: 'center' }}>
    //       아직 인간지표 계정이 없으시다면?{' '}
    //       <span style={{ borderBottom: '1px solid white' }} onClick={() => navigate(webPath.register())}>
    //         회원가입
    //       </span>
    //     </p>
    //     <div style={{ textAlign: 'center' }}>
    //       <span onClick={() => alert('아이디 찾기')}>아이디 찾기</span> |{' '}
    //       <span onClick={() => alert('비밀번호 찾기')}>비밀번호 찾기</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
