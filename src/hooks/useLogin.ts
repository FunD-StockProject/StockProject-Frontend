import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

interface LoginOptions {
  returnState?: unknown; // 로그인 후 돌아갈 때 복원할 state
}

const useLogin = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleLogin = (options?: LoginOptions) => {
    // 현재 경로 + search params 저장
    const returnPath = window.location.pathname + window.location.search;
    sessionStorage.setItem('login_return_path', returnPath);

    // state가 전달되면 저장 (React Router state는 window.location에 없으므로 명시적으로 전달받아야 함)
    if (options?.returnState !== undefined) {
      sessionStorage.setItem('login_return_state', JSON.stringify(options.returnState));
    } else {
      sessionStorage.removeItem('login_return_state');
    }

    navigate(webPath.login());
  };

  return { isLogin, handleLogin };
};

export default useLogin;
