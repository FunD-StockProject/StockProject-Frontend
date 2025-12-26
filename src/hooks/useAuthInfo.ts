import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import useLocalStorageState from './useLocalStorageState';

interface UserInfo {
  email: string;
  nickname: string;
  profileImage?: string;
  provider: string;
}

const useAuthInfo = () => {
  const navigate = useNavigate();
  const [beforeLoginDepth, setBeforeLoginDepth] = useLocalStorageState<number>('before_login_depth');
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorageState<string>('access_token');
  const [, setRefreshToken, removeRefreshToken] = useLocalStorageState<string>('refresh_token');
  const [userInfo, _setUserInfo, removeUserInfo] = useLocalStorageState<UserInfo>('user_info');
  const isLogin = !!accessToken;

  const handleNavigateLogin = () => {
    setBeforeLoginDepth(window.history.length);
    navigate(webPath.login());
  };

  const setUserInfo = (newUserInfo: Partial<UserInfo>) => {
    _setUserInfo({ ...userInfo, ...newUserInfo } as UserInfo);
  };

  const setAuthInfo = (accessToken: string, refreshToken: string, userInfo: UserInfo) => {
    console.log(2, accessToken);
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
