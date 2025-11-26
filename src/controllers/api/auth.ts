import { Headers, baseURL, wait } from './base';

type ProviderKey = 'KAKAO' | 'GOOGLE' | 'NAVER' | 'APPLE';

export const fetchOAuth2Login = async (_code: string, _state: string, provider: ProviderKey) => {
  const code = encodeURIComponent(_code);
  const state = encodeURIComponent(_state);

  const url = `${baseURL}/auth/login/${provider.toLowerCase()}?code=${code}&state=${state}`;

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

export const fetchLoginKakao = (code: string, state: string) => fetchOAuth2Login(code, state, 'KAKAO');
export const fetchLoginGoogle = (code: string, state: string) => fetchOAuth2Login(code, state, 'GOOGLE');
export const fetchLoginNaver = (code: string, state: string) => fetchOAuth2Login(code, state, 'NAVER');
export const fetchLoginApple = (code: string, state: string) => fetchOAuth2Login(code, state, 'APPLE');

export const fetchAuthRegister = async (
  imageBase64: string,
  email: string,
  nickname: string,
  birth_date: string,
  marketingAgreement: boolean,
  provider: string,
) => {
  try {
    const url = `${baseURL}/auth/register`;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('nickname', nickname);
    formData.append('birth_date', birth_date);
    formData.append('marketingAgreement', String(marketingAgreement));
    formData.append('provider', provider);

    if (imageBase64) {
      const byteString = atob(imageBase64.split(',')[1]);
      const mimeString = imageBase64.split(',')[0].split(':')[1].split(';')[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], 'profile.png', { type: mimeString });
      formData.append('image', file);
    }

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
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
        refreshToken: localStorage.getItem('refresh_token'),
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
