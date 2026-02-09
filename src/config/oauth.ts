export const URL_SCHEME = 'humanzipyoapp://';

export const SOCIAL_PROVIDER = {
  GOOGLE: 'google',
  KAKAO: 'kakao',
  NAVER: 'naver',
  APPLE: 'apple',
} as const;

export type SocialProvider = (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

export interface AuthConfig {
  endpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope?: string;
  accessType?: string;
  prompt?: string;
  includeGrantedScopes?: string;
  responseMode?: string;
}

// redirectUri를 동적으로 생성하는 함수
const getRedirectUri = (provider: string): string => {
  if (typeof window === 'undefined') {
    return ''; // SSR 환경에서는 빈 문자열 반환
  }
  return `${window.location.origin}/login/oauth2/code/${provider}`;
};

// 런타임에 AUTH_CONFIGS를 생성하는 함수
const createAuthConfigs = (): Record<SocialProvider, AuthConfig> => ({
  [SOCIAL_PROVIDER.GOOGLE]: {
    endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    responseType: 'code',
    scope: 'openid email profile',
    accessType: 'offline',
    prompt: 'consent',
    includeGrantedScopes: 'true',
    redirectUri: getRedirectUri('google'),
  },
  [SOCIAL_PROVIDER.KAKAO]: {
    endpoint: 'https://kauth.kakao.com/oauth/authorize',
    clientId: import.meta.env.VITE_KAKAO_API_KEY,
    responseType: 'code',
    redirectUri: getRedirectUri('kakao'),
  },
  [SOCIAL_PROVIDER.NAVER]: {
    endpoint: 'https://nid.naver.com/oauth2.0/authorize',
    clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
    responseType: 'code',
    redirectUri: getRedirectUri('naver'),
  },
  [SOCIAL_PROVIDER.APPLE]: {
    endpoint: 'https://appleid.apple.com/auth/authorize',
    clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
    responseType: 'code',
    responseMode: 'query',
    scope: '',
    redirectUri: getRedirectUri('apple'),
  },
});

let _authConfigs: Record<SocialProvider, AuthConfig> | null = null;

// AUTH_CONFIGS를 lazy하게 초기화
export const AUTH_CONFIGS = new Proxy({} as Record<SocialProvider, AuthConfig>, {
  get: (_, provider: string | symbol) => {
    if (typeof provider === 'symbol') return undefined;

    if (!_authConfigs) {
      _authConfigs = createAuthConfigs();
    }

    return _authConfigs[provider as SocialProvider];
  },
});
