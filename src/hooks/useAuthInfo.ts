import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import useLocalStorageState from './useLocalStorageState';

interface UserInfo {
  email: string;
  nickname: string;
  profileImage?: string;
  provider: string;
}

interface LoginOptions {
  returnState?: unknown; // 로그인 후 돌아갈 때 복원할 React Router state
}

const useAuthInfo = () => {
  const navigate = useNavigate();
  const [beforeLoginDepth, setBeforeLoginDepth] = useLocalStorageState<number>('before_login_depth');
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorageState<string>('access_token');
  const [, setRefreshToken, removeRefreshToken] = useLocalStorageState<string>('refresh_token');
  const [userInfo, _setUserInfo, removeUserInfo] = useLocalStorageState<UserInfo>('user_info');
  const isLogin = !!accessToken;

  const handleNavigateLogin = (options?: LoginOptions) => {
    setBeforeLoginDepth(window.history.length);

    // 현재 경로 저장 (OAuth 리다이렉트 후에도 복원 가능하도록)
    const returnPath = window.location.pathname + window.location.search;
    sessionStorage.setItem('login_return_path', returnPath);

    // React Router state 저장 (명시적으로 전달받아야 함)
    if (options?.returnState !== undefined) {
      sessionStorage.setItem('login_return_state', JSON.stringify(options.returnState));
    } else {
      sessionStorage.removeItem('login_return_state');
    }

    navigate(webPath.login);
  };

  const setUserInfo = (newUserInfo: Partial<UserInfo>) => {
    _setUserInfo({ ...(userInfo || {}), ...newUserInfo } as UserInfo);
  };

  const setAuthInfo = (accessToken: string, refreshToken: string, userInfo: UserInfo) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUserInfo(userInfo);
  };

  const clearAuthInfo = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserInfo();
  };

  return { isLogin, userInfo, beforeLoginDepth, handleNavigateLogin, setUserInfo, setAuthInfo, clearAuthInfo };
};

export default useAuthInfo;
