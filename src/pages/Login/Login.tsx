import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CloseSVG from '@assets/close.svg?react';
import AppleLoginSVG from '@assets/login/apple.svg?react';
import GoogleLoginSVG from '@assets/login/google.svg?react';
import KakaoLoginSVG from '@assets/login/kakao.svg?react';
import NaverLoginSVG from '@assets/login/naver.svg?react';
import LogoWithTitleWhiteSVG from '@assets/logo_with_title_white.svg?react';
import {
  LoginBannerContainer,
  LoginBannerContents,
  LoginButton,
  LoginButtonContainer,
  LoginContainer,
} from './Login.Style';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    localStorage.setItem('lastLoginProvider', 'google');
    const redirectUri = `${window.location.origin}/login/oauth2/code/google`;
    const state = uuidv4(); // CSRF 방지
    localStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true',
      state,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };

  const handleNaverLogin = () => {
    localStorage.setItem('lastLoginProvider', 'naver');
    const redirectUri = `${window.location.origin}/login/oauth2/code/naver`;
    const state = uuidv4();
    localStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_NAVER_CLIENT_ID, // <- VITE_ 접두어
      redirect_uri: redirectUri,
      state,
    });

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?${params.toString()}`;
  };

  const handleAppleLogin = () => {
    const state = uuidv4();
    const nonce = uuidv4(); // 권장
    localStorage.setItem('lastLoginProvider', 'apple');
    localStorage.setItem('oauth_state', state);

    const redirectUri = `${window.location.origin}/login/oauth2/code/apple`;
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_APPLE_CLIENT_ID, // Service ID
      redirect_uri: redirectUri,
      response_type: 'code', // 필요 시 'code id_token' 조합 사용
      response_mode: 'query', // form_post도 가능(서버 처리에 맞춰 선택)
      scope: 'name email',
      state,
      nonce,
    });

    window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  };

  const handleKakaoLogin = () => {
    localStorage.setItem('lastLoginProvider', 'kakao');
    const redirectUri = `${window.location.origin}/login/oauth2/code/kakao`;

    const state = uuidv4();
    localStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_KAKAO_API_KEY,
      redirect_uri: redirectUri,
      state,
    });

    window.location.href = `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  };

  const loginProviders = [
    {
      key: 'google',
      method: handleGoogleLogin,
      svg: GoogleLoginSVG,
    },
    {
      key: 'naver',
      method: handleNaverLogin,
      svg: NaverLoginSVG,
    },
    {
      key: 'apple',
      method: handleAppleLogin,
      svg: AppleLoginSVG,
    },
    {
      key: 'kakao',
      method: handleKakaoLogin,
      svg: KakaoLoginSVG,
    },
  ];

  const handleCancelLogin = () => {
    navigate(-1);
  };

  return (
    <LoginContainer>
      <CloseSVG onClick={handleCancelLogin} />
      <LoginBannerContainer>
        <LogoWithTitleWhiteSVG />
        <LoginBannerContents>
          <p className="title">당신은 '인간지표'인가요?</p>
          <p className="desc">
            주식투자 심리도우미 인간지표에
            <br />
            오신걸 환영합니다!
          </p>
        </LoginBannerContents>
      </LoginBannerContainer>
      <LoginButtonContainer>
        {loginProviders.map((e) => (
          <LoginButton
            key={`LOGIN_PROVIDER_IMG_${e.key}`}
            isRecent={e.key == localStorage.getItem('recent_login_provider')}
            onClick={e.method}
          >
            {<e.svg />}
          </LoginButton>
        ))}
      </LoginButtonContainer>
    </LoginContainer>
  );
};

export default Login;
