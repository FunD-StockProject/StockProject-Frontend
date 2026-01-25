import { useNavigate } from 'react-router-dom';
import useLocalStorageState from '@hooks/useLocalStorageState';
import { useSocialAuth } from '@hooks/useSocialAuth';
import CloseSVG from '@assets/close.svg?react';
import AppleLoginSVG from '@assets/login/apple.svg?react';
import GoogleLoginSVG from '@assets/login/google.svg?react';
import KakaoLoginSVG from '@assets/login/kakao.svg?react';
import NaverLoginSVG from '@assets/login/naver.svg?react';
import LogoWithTitleWhiteSVG from '@assets/logo_with_title_white.svg?react';
import { SOCIAL_PROVIDER } from '../../config/oauth';
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
  const { signInWithOAuth } = useSocialAuth();

  const loginProviders = [
    {
      key: 'google',
      method: () => signInWithOAuth(SOCIAL_PROVIDER.GOOGLE),
      svg: GoogleLoginSVG,
    },
    {
      key: 'naver',
      method: () => signInWithOAuth(SOCIAL_PROVIDER.NAVER),
      svg: NaverLoginSVG,
    },
    {
      key: 'apple',
      method: () => signInWithOAuth(SOCIAL_PROVIDER.APPLE),
      svg: AppleLoginSVG,
    },
    {
      key: 'kakao',
      method: () => signInWithOAuth(SOCIAL_PROVIDER.KAKAO),
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
          <p className="title">당신은 &apos;인간지표&apos;인가요?</p>
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
