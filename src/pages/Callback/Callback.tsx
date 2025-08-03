import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchLoginKakao } from '@controllers/api';
import BlueAlert from '@assets/blueAlert.svg?react';
import Loading from '@assets/loading.png';

const Callback = () => {
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isMounted) return;

    (async () => {
      const location = window.location;
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code') ?? '';
      const redirectUri = window.location.origin + window.location.pathname;
      const state = btoa(redirectUri);
      const provider = location.pathname.split('/').at(-1);

      try {
        console.log(code);
        const res = await fetchLoginKakao(code, state);
        console.log(res);

        if (res.state === 'NEED_REGISTER') {
          navigate(webPath.register(), {
            state: {
              provider: provider,
              email: res.email,
            },
          });
          return;
        }

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('useremail', res.email);
        localStorage.setItem('username', res.nickname);
        localStorage.setItem('provider', provider ?? '');
        localStorage.setItem('recent_login_provider', provider ?? '');

        navigate('/');
      } catch (err) {
        console.log(err);
        setError('error');
        navigate(webPath.register(), {
          state: {
            provider: provider,
            email: null,
          },
        });
      }
    })();

    console.log(123);
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <CallBackContainer>
      {!error ? <img src={Loading} /> : <BlueAlert />}
      <p className="title">{!error ? '잠시만 기다려주세요' : '앗! 로그인에 실패했어요 😭'}</p>
      <p className="desc">{!error ? '‘카카오톡’에서 로그인 정보를 불러오고 있어요' : '로그인을 다시 시도해주세요'}</p>
    </CallBackContainer>
  );
};

const CallBackContainer = styled.div({
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

export default Callback;
