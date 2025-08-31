import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchLoginApple, fetchLoginGoogle, fetchLoginKakao, fetchLoginNaver } from '@controllers/api';
import BlueAlert from '@assets/blueAlert.svg?react';
import Loading from '@assets/loading.png';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState('');

  console.log('Callback1');
  useEffect(() => {
    if (!isMounted) return;
    console.log('Callback2');

    (async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code') ?? '';
      const redirectUri = window.location.origin + location.pathname;
      const state = btoa(redirectUri);

      const provider = location.pathname.split('/').at(-1);

      try {
        let res: any;
        switch (provider) {
          case 'kakao':
            res = await fetchLoginKakao(code, state);
            break;
          case 'google':
            res = await fetchLoginGoogle(code, state);
            break;
          case 'naver':
            res = await fetchLoginNaver(code, state);
            break;
          case 'apple':
            res = await fetchLoginApple(code, state);
            break;
          default:
            throw new Error(`Unknown OAuth provider: ${provider}`);
        }

        if (res.state === 'NEED_REGISTER') {
          navigate(webPath.register(), {
            state: { provider, email: res.email },
          });
          return;
        }

        console.log(res);

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('useremail', res.email);
        localStorage.setItem('username', res.nickname);
        localStorage.setItem('provider', provider);
        localStorage.setItem('recent_login_provider', provider);

        navigate('/', {
          replace: true,
        });
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
