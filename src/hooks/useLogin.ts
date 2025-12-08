import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const useLogin = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('before_login_path', window.location.pathname);
    navigate(webPath.login());
  };

  return { isLogin, handleLogin };
};

export default useLogin;
