import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { ProviderKey, fetchOAuth2Login } from '@controllers/auth/api';
import BlueAlert from '@assets/blueAlert.svg?react';
import Loading from '@assets/loading.png';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isMounted) return;

    (async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code') ?? '';
      const redirectUri = window.location.origin + location.pathname;
      const state = btoa(redirectUri);

      const provider = location.pathname.split('/').at(-1);

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('useremail');
      localStorage.removeItem('username');
      localStorage.removeItem('provider');
      localStorage.removeItem('profileImg');

      try {
        const res = await fetchOAuth2Login(code, state, provider as ProviderKey);

        if (res.state === 'NEED_REGISTER') {
          navigate(webPath.register(), {
            state: {
              provider,
              email: res.email,
            },
          });
          return;
        }

        console.log(res);

        localStorage.setItem('access_token', res.access_token);
        (window as any).ReactNativeWebView?.postMessage(JSON.stringify({ type: 'TOKEN', token: res.access_token }));
        // const token = res.access_token;
        // (window as any).ReactNativeWebView.postMessage(JSON.stringify({ type: 'TOKEN', token }));
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('useremail', res.email);
        localStorage.setItem('username', res.nickname);
        localStorage.setItem('provider', provider as string);
        localStorage.setItem('recent_login_provider', provider as string);
        if (res.profileImageUrl) {
          localStorage.setItem('profileImg', res.profileImageUrl);
        }
        navigate(-2);
      } catch (err) {
        console.error(err);
        setError('error');
      }
    })();
  }, [isMounted, location.pathname, navigate]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <CallBackContainer>
      {!error ? <img src={Loading} alt="Loading" /> : <BlueAlert />}
      <p className="title">{!error ? '잠시만 기다려주세요' : '앗! 로그인에 실패했어요 😭'}</p>
      <p className="desc">{!error ? '로그인 정보를 불러오고 있어요' : '로그인을 다시 시도해주세요'}</p>
    </CallBackContainer>
  );
};

const CallBackContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  height: '100dvh',
  justifyContent: 'center',

  ['>svg']: {
    width: '72px',
    aspectRatio: '1 / 1',
    fill: '#3457FD',
  },

  ['>p']: {
    margin: 0,

    ['&.title']: {
      fontSize: '20px',
      fontWeight: 600,
    },
    ['&.desc']: {
      fontSize: '14px',
      fontWeight: 500,
    },
  },
});

export default Callback;
