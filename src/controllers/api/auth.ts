import { Headers, baseURL, wait } from './base';

export const fetchAuthNickname = async (nickname: string) => {
  try {
    const url = `${baseURL}/auth/nickname?nickname=${nickname}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...Headers,
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
