import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { safeRandomUUID } from '@utils/random';
import { webPath } from '@router/index';
import { type ProviderKey, fetchOAuth2Login } from '@controllers/auth/api';
import { AUTH_CONFIGS, type SocialProvider, URL_SCHEME } from '../config/oauth';
import { MESSAGE_TYPES } from '../config/webview';
import useAuthInfo from './useAuthInfo';
import useLocalStorageState from './useLocalStorageState';

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
        csrf: safeRandomUUID(),
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
            provider: provider,
            url,
          }),
        );
      } else {
        window.location.href = url;
      }
    },
    [isWebView],
  );

  const handleOAuthCallback = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (code: string, provider: string, _state: string) => {
      clearAuthInfo();
      setIsLoading(true);
      setError(null);

      try {
        // API는 state로 redirect URI의 base64 인코딩 값을 기대합니다
        const redirectUri = window.location.origin + `/login/oauth2/code/${provider}`;
        const apiState = btoa(redirectUri);
        const res = await fetchOAuth2Login(code, apiState, provider as ProviderKey);

        if (res.state === 'NEED_REGISTER') {
          // WebView에서는 네이티브에 메시지 전송
          if (isWebView && (window as any).ReactNativeWebView) {
            (window as any).ReactNativeWebView.postMessage(
              JSON.stringify({
                type: MESSAGE_TYPES.NEED_REGISTER,
                email: res.email,
                provider,
              }),
            );
            return;
          }

          // 브라우저에서는 회원가입 페이지로 이동
          navigate(webPath.register, {
            state: {
              provider,
              email: res.email,
            },
          });
          return;
        }

        // 로그인 성공 - WebView와 브라우저 모두 동일하게 처리
        setAuthInfo(res.access_token, res.refresh_token, {
          email: res.email,
          nickname: res.nickname,
          profileImage: res.profileImageUrl,
          provider: res.provider,
        });
        setRecentProvider(provider);

        // WebView인 경우 네이티브 앱에도 알림
        if (isWebView && (window as any).ReactNativeWebView) {
          (window as any).ReactNativeWebView.postMessage(
            JSON.stringify({
              type: MESSAGE_TYPES.TOKEN,
              token: res.access_token,
            }),
          );
        }

        if (isWebView && (window as any).ReactNativeWebView) {
          (window as any).ReactNativeWebView.postMessage(
            JSON.stringify({
              type: MESSAGE_TYPES.REQUEST_NOTIFICATION_PERMISSION,
              token: res.access_token,
            }),
          );
        }

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
      } catch (error: any) {
        console.error('OAuth callback error:', error);
        console.error('Error message:', error?.message);
        console.error('Error stack:', error?.stack);
        console.error('Error response:', error?.response?.data);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
      }
    },
    [isWebView, location.pathname, navigate, setAuthInfo, setRecentProvider, clearAuthInfo],
  );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const { type, data } = JSON.parse(event.data);

        if (type === MESSAGE_TYPES.AUTH_SUCCESS) {
          handleOAuthCallback(data.code, data.provider, data.state || '');
        } else if (type === MESSAGE_TYPES.AUTH_ERROR) {
          console.error('OAuth auth error:', data.error);
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing web message:', error);
      }
    },
    [handleOAuthCallback],
  );

  // URL에서 OAuth 콜백 처리
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const stateParam = params.get('state');

    if (error) {
      console.error('OAuth error:', error);
      const parsedState: OAuthState = stateParam ? JSON.parse(atob(stateParam)) : {};

      if (parsedState?.fromWebView) {
        // WebView에서 온 경우 커스텀 스킴으로 복귀 (Android/iOS 모두 동일)
        const errorParam = `error=${encodeURIComponent(error)}`;
        const deepLinkUrl = `${URL_SCHEME}?${errorParam}`;

        // Chrome Custom Tabs 차단 우회: 즉시 시도 + 클릭 가능한 링크 제공
        window.location.href = deepLinkUrl;

        // 500ms 후에도 페이지가 그대로 있으면 사용자에게 링크 제공
        setTimeout(() => {
          document.body.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;padding:20px;text-align:center;font-family:sans-serif;">
              <h2 style="margin-bottom:20px;">로그인 실패</h2>
              <p style="margin-bottom:30px;color:#666;">앱으로 돌아가려면 아래 버튼을 클릭하세요</p>
              <a href="${deepLinkUrl}" style="display:inline-block;padding:15px 30px;background:#007AFF;color:white;text-decoration:none;border-radius:8px;font-size:16px;">앱으로 돌아가기</a>
            </div>
          `;
        }, 500);
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setIsLoading(false);
      }
      return;
    }

    if (code && stateParam) {
      try {
        const parsedState: OAuthState = JSON.parse(atob(stateParam));

        if (parsedState?.fromWebView) {
          // WebView에서 온 경우 커스텀 스킴으로 복귀 (Android/iOS 모두 동일)
          const params = `code=${encodeURIComponent(code)}&provider=${parsedState.provider || ''}&state=${encodeURIComponent(stateParam || '')}`;
          const deepLinkUrl = `${URL_SCHEME}?${params}`;

          // Chrome Custom Tabs 차단 우회: 즉시 시도 + 클릭 가능한 링크 제공
          window.location.href = deepLinkUrl;

          // 500ms 후에도 페이지가 그대로 있으면 사용자에게 링크 제공
          setTimeout(() => {
            document.body.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;padding:20px;text-align:center;font-family:sans-serif;">
                <h2 style="margin-bottom:20px;">로그인 성공!</h2>
                <p style="margin-bottom:30px;color:#666;">앱으로 돌아가려면 아래 버튼을 클릭하세요</p>
                <a href="${deepLinkUrl}" style="display:inline-block;padding:15px 30px;background:#007AFF;color:white;text-decoration:none;border-radius:8px;font-size:16px;">앱으로 돌아가기</a>
              </div>
            `;
          }, 500);
        } else {
          // 브라우저에서 온 경우: URL 파라미터 제거 후 처리하여 무한 루프 방지
          const provider = location.pathname.split('/').at(-1);
          if (provider) {
            // URL에서 쿼리 파라미터 제거
            window.history.replaceState({}, '', location.pathname);
            setIsLoading(true);
            handleOAuthCallback(code, provider, stateParam);
          }
        }
      } catch (error) {
        console.error('Error parsing OAuth state:', error);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }
  }, [location.pathname, location.search, handleOAuthCallback]);

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
