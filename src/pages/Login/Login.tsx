import styled from '@emotion/styled';
import AppleLoginPNG from '@assets/appleLogin.png';
import CloseSVG from '@assets/close.svg?react';
import GoogleLoginPNG from '@assets/googleLogin.png';
import KakaoLoginPNG from '@assets/kakaoLogin.png';
import LogoWithTitleWhiteSVG from '@assets/logo_with_title_white.svg?react';
import NaverLoginPNG from '@assets/naverLogin.png';

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
  );
};

export default Login;
