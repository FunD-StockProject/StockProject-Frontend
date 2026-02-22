import { webPath } from '@router/index';

const baseURL = import.meta.env.VITE_BASE_URL;
const Headers = { 'Content-Type': 'application/json' } as const;

const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const enableMock = false;

const fetchData = async (path: string, init: RequestInit = {}, isFormData: boolean = false) => {
  const url = `${baseURL}${path}`;
  const res = await fetch(url, {
    method: 'GET',
    ...init,
    headers: {
      ...(isFormData ? {} : Headers),
      ...init.headers,
    },
  });

  const data = await res.json();
  if (data.state) return data;
  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  await wait(0);
  return data;
};

const fetchAuthData = async (path: string, init: RequestInit = {}, isFormData: boolean = false) => {
  const url = `${baseURL}${path}`;
  const token = localStorage.getItem('access_token');
  let res = await fetch(url, {
    method: 'GET',
    ...init,
    headers: {
      ...(isFormData ? {} : Headers),
      ...(init.headers as any),
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // 쿠키 포함
  });

  if (res.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');

    const reissueRes = await fetch(`${baseURL}/auth/reissue`, {
      method: 'POST',
      headers: {
        ...Headers,
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (!reissueRes.ok) {
      alert('토큰 재발급 실패. 재로그인 필요');

      window.location.href = webPath.login;

      throw new Error('토큰 재발급 실패. 재로그인 필요');
    }

    const { access_token, refresh_token: newRefreshToken } = await reissueRes.json();

    // 새 토큰 저장
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', newRefreshToken);

    // localStorage 변경을 React state에 반영하기 위한 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key: 'access_token' } }));
    window.dispatchEvent(new CustomEvent('localStorageChange', { detail: { key: 'refresh_token' } }));

    // 원래 요청 재시도
    res = await fetch(url, {
      method: 'GET',
      ...init,
      headers: {
        ...Headers,
        ...(init.headers as any),
        Authorization: `Bearer ${access_token}`,
      },
      credentials: 'include',
    });
  }

  if (!res.ok) {
    throw new Error(`${res.status} Error!!`);
  }
  await wait(0);

  // 204 No Content 응답 처리
  if (res.status === 204) {
    return null;
  }

  const data = await res.json();
  return data;
};

export { baseURL, Headers, wait, enableMock, fetchData, fetchAuthData };
