import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorageState from '@hooks/useLocalStorageState';
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
  const [recentProvider] = useLocalStorageState<string>('recent_provider');

  // WebView 환경 감지
  const isWebView = !!(window as any).ReactNativeWebView;

  const handleGoogleLogin = () => {
    // WebView: 커스텀 스킴 사용, 웹: HTTPS URL 사용
    const redirectUri = isWebView
      ? 'humanzipyoapp://login/oauth2/code/google'
      : `${window.location.origin}/login/oauth2/code/google`;

    // state에 환경 정보 포함 (CSRF 방지 + 환경 구분)
    const stateObj = {
      csrf: uuidv4(),
      isWebView: isWebView,
    };
    const state = btoa(JSON.stringify(stateObj)); // Base64 인코딩
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

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    if (isWebView) {
      // WebView 환경: 구글 로그인은 외부 브라우저로 열도록 네이티브에 요청
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'OAUTH_LOGIN_EXTERNAL',
          provider: 'google',
          url: oauthUrl,
        }),
      );
    } else {
      // 일반 브라우저: 직접 이동
      window.location.href = oauthUrl;
    }
  };

  const handleNaverLogin = () => {
    const redirectUri = `${window.location.origin}/login/oauth2/code/naver`;

    const stateObj = {
      csrf: uuidv4(),
      isWebView: isWebView,
    };
    const state = btoa(JSON.stringify(stateObj));
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
    const stateObj = {
      csrf: uuidv4(),
      isWebView: isWebView,
    };
    const state = btoa(JSON.stringify(stateObj));
    const nonce = uuidv4(); // 권장
    localStorage.setItem('oauth_state', state);

    const redirectUri = `${window.location.origin}/login/oauth2/code/apple`;
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_APPLE_CLIENT_ID, // Service ID
      redirect_uri: redirectUri,
      response_type: 'code',
      response_mode: 'query', // email만 요청 시 query 가능한지 테스트
      scope: '', // name 제거, email만 유지
      state,
      nonce,
    });

    window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  };

  const handleKakaoLogin = () => {
    const redirectUri = `${window.location.origin}/login/oauth2/code/kakao`;

    const stateObj = {
      csrf: uuidv4(),
      isWebView: isWebView,
    };
    const state = btoa(JSON.stringify(stateObj));
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
          <LoginButton key={`LOGIN_PROVIDER_IMG_${e.key}`} isRecent={e.key == recentProvider} onClick={e.method}>
            {<e.svg />}
          </LoginButton>
        ))}
      </LoginButtonContainer>
    </LoginContainer>
  );
};

export default Login;
