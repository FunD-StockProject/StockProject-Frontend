import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchAuthLogout, fetchAuthRegister, fetchAuthWithdraw, fetchLoginKakao } from '@controllers/api';

const Callback = () => {
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    const tmp = async () => {
      const location = window.location;
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code') ?? '';
      const redirectUri = window.location.origin + window.location.pathname;
      const state = btoa(redirectUri);
      const provider = location.pathname.split('/').at(-1);

      try {
        console.log(code);
        const res = await fetchLoginKakao(code, state);

        console.log('login', res);

        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        localStorage.setItem('provider', provider ?? '');
        localStorage.setItem('recent_login_provider', provider ?? '');

        navigate('/');
      } catch (err) {
        console.log(err);
        navigate(webPath.register(), {
          state: {
            provider: provider,
            email: null,
          },
        });
      }
    };

    tmp();

    console.log(123);
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async () => {
    const location = window.location;
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code') ?? '';
    const redirectUri = window.location.origin + window.location.pathname;
    const state = btoa(redirectUri);

    const res = await fetchLoginKakao(code, state);
    console.log('login', res);

    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
  };

  const handleRegister = async () => {
    const res = await fetchAuthRegister('iparkssi@naver.com', '현수', new Date('1999-12-13'), true, 'KAKAO');
    console.log(2, res);
  };

  const handleLogout = async () => {
    const res = await fetchAuthLogout();
    console.log(res);
  };

  const handleWithdraw = async () => {
    console.log(localStorage.getItem('access_token'));
    const res = await fetchAuthWithdraw();
    console.log(res);
  };

  return (
    <div>
      <div onClick={handleLogin}>로그인</div>
      <div onClick={handleRegister}>회원가입</div>
      <div onClick={handleLogout}>로그아웃</div>
      <div onClick={handleWithdraw}>회원탈퇴</div>
    </div>
  );
};

export default Callback;
