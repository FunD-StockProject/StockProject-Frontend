import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_CONFIGS, URL_SCHEME, type SocialProvider } from '../config/oauth';
import { MESSAGE_TYPES } from '../config/webview';
import { fetchOAuth2Login, type ProviderKey } from '@controllers/auth/api';
import useAuthInfo from './useAuthInfo';
import useLocalStorageState from './useLocalStorageState';
import { webPath } from '@router/index';

interface OAuthState {
  csrf: string;
  isWebView: boolean;
  fromWebView?: boolean;
  provider?: string;
  timestamp?: number;
}

const createOAuthURL = (provider: SocialProvider, state: string): string => {
  const config = AUTH_CONFIGS[provider];

  // Google은 커스텀 스킴을 지원하지 않으므로 항상 HTTPS redirect_uri 사용
  // WebView에서도 HTTPS로 리다이렉트 후, 웹 페이지에서 커스텀 스킴으로 재리다이렉트
  const redirectUri = config.redirectUri;

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: config.responseType,
    state: state, // URLSearchParams가 자동으로 인코딩하므로 encodeURIComponent 제거
    ...(config.scope && { scope: config.scope }),
    ...(config.accessType && { access_type: config.accessType }),
    ...(config.prompt && { prompt: config.prompt }),
    ...(config.includeGrantedScopes && { include_granted_scopes: config.includeGrantedScopes }),
    ...(config.responseMode && { response_mode: config.responseMode }),
  });

  return `${config.endpoint}?${params.toString()}`;
};

export const useSocialAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthInfo, clearAuthInfo } = useAuthInfo();
  const [, setRecentProvider] = useLocalStorageState<string>('recent_provider');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isWebView = !!(window as any).ReactNativeWebView;

  const signInWithOAuth = useCallback(
    async (provider: SocialProvider) => {
      const stateObj: OAuthState = {
        csrf: crypto.randomUUID(),
        isWebView,
        fromWebView: isWebView,
        provider: provider,
        timestamp: Date.now(),
      };

      const state = btoa(JSON.stringify(stateObj));
      localStorage.setItem('oauth_state', state);

      const url = createOAuthURL(provider, state);

      if (isWebView && (window as any).ReactNativeWebView) {
        (window as any).ReactNativeWebView.postMessage(
          JSON.stringify({
            type: MESSAGE_TYPES.OPEN_EXTERNAL_BROWSER,
            provider: provider.toLowerCase(),
            url,
          })
        );
      } else {
        window.location.href = url;
      }
    },
    [isWebView]
  );

  const handleOAuthCallback = useCallback(
    async (code: string, provider: string) => {
      const redirectUri = window.location.origin + location.pathname;
      const state = btoa(redirectUri);

      clearAuthInfo();
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetchOAuth2Login(code, state, provider as ProviderKey);

        if (res.state === 'NEED_REGISTER') {
          // WebView에서는 네이티브에 메시지 전송
          if (isWebView && (window as any).ReactNativeWebView) {
            (window as any).ReactNativeWebView.postMessage(
              JSON.stringify({
                type: MESSAGE_TYPES.NEED_REGISTER,
                email: res.email,
                provider,
              })
            );
            return;
          }

          // 브라우저에서는 회원가입 페이지로 이동
          navigate(webPath.register(), {
            state: {
              provider,
              email: res.email,
            },
          });
          return;
        }

        // 로그인 성공
        if (isWebView && (window as any).ReactNativeWebView) {
          (window as any).ReactNativeWebView.postMessage(
            JSON.stringify({
              type: MESSAGE_TYPES.TOKEN,
              token: res.access_token
            })
          );
          return;
        }

        // 브라우저에서 로그인 처리
        setAuthInfo(res.access_token, res.refresh_token, {
          email: res.email,
          nickname: res.nickname,
          profileImage: res.profileImageUrl,
          provider: res.provider,
        });
        setRecentProvider(provider);

        // 저장된 return path로 이동
        const savedReturnPath = sessionStorage.getItem('login_return_path');
        const returnStateStr = sessionStorage.getItem('login_return_state');
        const returnState = returnStateStr ? JSON.parse(returnStateStr) : undefined;

        sessionStorage.removeItem('login_return_path');
        sessionStorage.removeItem('login_return_state');

        setIsLoading(false);

        if (savedReturnPath) {
          navigate(savedReturnPath, { replace: true, state: returnState });
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
      }
    },
    [isWebView, location.pathname, navigate, setAuthInfo, setRecentProvider, clearAuthInfo]
  );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data);

        if (type === MESSAGE_TYPES.AUTH_SUCCESS) {
          handleOAuthCallback(data.code, data.provider);
        } else if (type === MESSAGE_TYPES.AUTH_ERROR) {
          console.error('OAuth auth error:', data.error);
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing web message:', error);
      }
    },
    [handleOAuthCallback]
  );

  // URL에서 OAuth 콜백 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const stateParam = params.get('state');

    if (error) {
      console.error('OAuth error:', error);
      const parsedState: OAuthState = stateParam
        ? JSON.parse(atob(stateParam)) // URLSearchParams.get()이 이미 디코딩하므로 atob만 사용
        : {};

      if (parsedState?.fromWebView) {
        window.location.href = `${URL_SCHEME}?error=${encodeURIComponent(error)}`;
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
      }
      return;
    }

    if (code && stateParam) {
      try {
        const parsedState: OAuthState = JSON.parse(atob(stateParam)); // URLSearchParams.get()이 이미 디코딩하므로 atob만 사용

        if (parsedState?.fromWebView) {
          // WebView에서 온 경우 Deep Link로 복귀
          window.location.href = `${URL_SCHEME}?code=${encodeURIComponent(code)}&provider=${parsedState.provider || ''}`;
        } else {
          // 브라우저에서 온 경우 직접 처리
          const provider = location.pathname.split('/').at(-1);
          if (provider) {
            setIsLoading(true);
            handleOAuthCallback(code, provider);
          }
        }
      } catch (error) {
        console.error('Error parsing OAuth state:', error);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }
  }, [location.pathname, handleOAuthCallback]);

  // WebView 메시지 리스너 등록
  useEffect(() => {
    if (!isWebView) {
      return;
    }

    window.addEventListener('message', handleWebViewMessage);
    document.addEventListener('message', handleWebViewMessage as EventListener);

    return () => {
      window.removeEventListener('message', handleWebViewMessage);
      document.removeEventListener('message', handleWebViewMessage as EventListener);
    };
  }, [isWebView, handleWebViewMessage]);

  return { signInWithOAuth, isLoading, error };
};
