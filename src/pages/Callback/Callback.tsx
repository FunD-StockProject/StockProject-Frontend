import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthInfo from '@hooks/useAuthInfo';
import useLocalStorageState from '@hooks/useLocalStorageState';
import { useSocialAuth } from '@hooks/useSocialAuth';
import { webPath } from '@router/index';
import { ProviderKey, fetchOAuth2Login } from '@controllers/auth/api';
import BlueAlert from '@assets/blueAlert.svg?react';
import Loading from '@assets/loading.png';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { beforeLoginDepth, setAuthInfo, clearAuthInfo } = useAuthInfo();
  const [, setRecentProvider] = useLocalStorageState<string>('recent_provider');

  // Google 로그인을 위한 useSocialAuth 훅 호출 (Google인 경우만)
  const provider = location.pathname.split('/').at(-1);
  if (provider === 'google') {
    useSocialAuth();
  }

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

      // Google 로그인은 useSocialAuth 훅에서 자동으로 처리됩니다.
      // 이 Callback 페이지는 Naver, Apple, Kakao 로그인에 사용됩니다.
      if (provider === 'google') {
        // Google은 useSocialAuth 훅에서 처리하므로 여기서는 return
        return;
      }

      // 현재 실제 환경 확인 (state가 아닌 실제 환경)
      const isCurrentlyInWebView = !!(window as any).ReactNativeWebView;

      clearAuthInfo();

      try {
        const res = await fetchOAuth2Login(code, state, provider as ProviderKey);

        if (res.state === 'NEED_REGISTER') {
          // 현재 WebView에 있으면 postMessage
          if (isCurrentlyInWebView) {
            (window as any).ReactNativeWebView?.postMessage(
              JSON.stringify({
                type: 'NEED_REGISTER',
                email: res.email,
                provider,
              }),
            );
            return;
          }

          // 브라우저에 있으면 웹에서 회원가입 진행
          navigate(webPath.register(), {
            state: {
              provider,
              email: res.email,
            },
          });
          return;
        }

        // 로그인 성공 - 현재 WebView에 있으면 postMessage
        if (isCurrentlyInWebView) {
          (window as any).ReactNativeWebView?.postMessage(
            JSON.stringify({ type: 'TOKEN', token: res.access_token })
          );
          return;
        }

        // 브라우저에 있으면 웹에서 로그인 처리
        setAuthInfo(res.access_token, res.refresh_token, {
          email: res.email,
          nickname: res.nickname,
          profileImage: res.profileImageUrl,
          provider: res.provider,
        });
        setRecentProvider(provider as string);

        // 저장된 state 복원
        const returnStateStr = sessionStorage.getItem('login_return_state');
        const returnState = returnStateStr ? JSON.parse(returnStateStr) : undefined;
        sessionStorage.removeItem('login_return_state');

        // 기존 로직: beforeLoginDepth 사용 (없으면 sessionStorage fallback)
        const currentDepth = window.history.length;
        const savedReturnPath = sessionStorage.getItem('login_return_path');

        if (beforeLoginDepth && currentDepth > 0 && !returnState) {
          // 기존 로직: 히스토리 기반 이동 (state 없을 때만)
          const navigateDelta = Math.min((beforeLoginDepth ?? 100) - currentDepth, -2);
          navigate(navigateDelta);
        } else if (savedReturnPath) {
          // Fallback: sessionStorage 경로 사용 (state 보존 가능)
          sessionStorage.removeItem('login_return_path');
          navigate(savedReturnPath, { replace: true, state: returnState });
        } else {
          // 최종 fallback: 홈으로
          navigate('/', { replace: true, state: returnState });
        }
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
