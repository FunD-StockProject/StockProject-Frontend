import { baseURL, Headers, wait } from './base';

export const fetchOAuth2Login = async (_code: string, _state: string, provider: string) => {
  const code = encodeURIComponent(_code);
  const state = encodeURIComponent(_state);

  const url = `${baseURL}/auth/login/${provider}?code=${code}&state=${state}`;

  try {
    const res = await fetch(url, { method: 'GET', headers: Headers });
    const data = await res.json();
    if (data.state) return data;
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return data;
  } catch (error) {
    throw error;
  }
};


export const fetchLoginKakao = (code: string, state: string) => fetchOAuth2Login(code, state, 'kakao');
export const fetchLoginGoogle = (code: string, state: string) => fetchOAuth2Login(code, state, 'google');
export const fetchLoginNaver = (code: string, state: string) => fetchOAuth2Login(code, state, 'naver');
export const fetchLoginApple = (code: string, state: string) => fetchOAuth2Login(code, state, 'apple');

export const fetchAuthRegister = async (
  email: string,
  nickname: string,
  birth_date: Date,
  marketing_agreement: boolean,
  provider: string,
) => {
  try {
    const url = `${baseURL}/auth/register`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        nickname,
        birth_date: `${birth_date.getFullYear()}-${String(birth_date.getMonth() + 1).padStart(2, '0')}-${String(
          birth_date.getDate(),
        ).padStart(2, '0')}`,
        marketing_agreement,
        provider,
      }),
      headers: Headers,
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchAuthWithdraw = async () => {
  try {
    const url = `${baseURL}/auth/withdraw`;
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        ...Headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const fetchAuthLogout = async () => {
  try {
    const url = `${baseURL}/auth/logout`;
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        'value = refresh_token': localStorage.getItem('refresh_token'),
      }),
      headers: {
        ...Headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    throw error;
  }
};


