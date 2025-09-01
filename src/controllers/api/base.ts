const baseURL = import.meta.env.VITE_BASE_URL;
const Headers = { 'Content-Type': 'application/json' } as const;

const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const enableMock = false;

const fetchData = async (path: string) => {
  try {
    const url = `${baseURL}${path}`;
    const res = await fetch(url, { method: 'GET', headers: Headers });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchAuthData = async (path: string, init: RequestInit = {}) => {
  try {
    const url = `${baseURL}${path}`;
    let token = localStorage.getItem('access_token');
    let res = await fetch(url, {
      method: 'GET',
      ...init,
      headers: {
        ...Headers,
        ...(init.headers as any),
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // 쿠키 포함
    });

    if (res.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");

      const reissueRes = await fetch(`${baseURL}/auth/reissue`, {
        method: "POST",
        headers: {
          ...Headers,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      if (!reissueRes.ok) {
        throw new Error("토큰 재발급 실패. 재로그인 필요");
      }

      const { access_token, refresh_token: newRefreshToken } = await reissueRes.json();

      // 새 토큰 저장
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", newRefreshToken);
      token = access_token;

      // 원래 요청 재시도
      res = await fetch(url, {
        method: "GET",
        ...init,
        headers: {
          ...Headers,
          ...(init.headers as any),
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
    }

    const data = await res.json();
    if (!res.ok) {
      try {
        console.error('API error body:', data);
      } catch (_) {
        // ignore
      }
      throw new Error(`${res.status} Error!!`);
    }

    await wait(0);
    return data;
  } catch (error) {
    throw error;
  }
};

// function getCookie(name: string) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(';').shift();
// }

export { baseURL, Headers, wait, enableMock, fetchData, fetchAuthData };

