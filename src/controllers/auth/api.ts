import { fetchAuthData, fetchData } from '@controllers/api/base';

export type ProviderKey = 'kakao' | 'google' | 'naver' | 'apple';

export const fetchOAuth2Login = async (_code: string, _state: string, provider: ProviderKey) => {
  const allowedProviders: ProviderKey[] = ['kakao', 'google', 'naver', 'apple'];
  if (!allowedProviders.includes(provider)) {
    throw new Error(`Unknown OAuth provider: ${provider}`);
  }

  const code = encodeURIComponent(_code);
  const state = encodeURIComponent(_state);

  const url = `/auth/login/${provider}?code=${code}&state=${state}`;

  return fetchData(url);
};

export const fetchAuthRegister = async (
  imageBase64: string,
  email: string,
  nickname: string,
  birth_date: string,
  marketingAgreement: boolean,
  provider: string,
) => {
  try {
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

    return fetchData(
      '/auth/register',
      {
        method: 'POST',
        body: formData,
      },
      true,
    );
  } catch (error) {
    throw error;
  }
};

// PATCH /user/image
export const fetchUpdateUserImage = async (imageBase64: string) => {
  try {
    const formData = new FormData();
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

    return fetchAuthData(
      '/user/image',
      {
        method: 'PATCH',
        body: formData,
      },
      true,
    );
  } catch (error) {
    throw error;
  }
};

// PATCH /user/profile
export const fetchUpdateUserProfile = async (nickname: string, birth_date: string) => {
  return fetchAuthData('/user/profile', {
    method: 'PATCH',
    body: JSON.stringify({
      nickname: nickname,
      birth_date: birth_date,
      marketing_agreement: true,
    }),
  });
};

// POST /auth/logout
export const fetchAuthLogout = async () => {
  return fetchAuthData('/auth/logout', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: localStorage.getItem('refresh_token'),
    }),
  });
};

// DELETE /auth/withdraw
export const fetchAuthWithdraw = async () => {
  return fetchAuthData('/auth/withdraw', {
    method: 'DELETE',
  });
};
