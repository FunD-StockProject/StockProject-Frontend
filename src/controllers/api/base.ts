const baseURL = import.meta.env.VITE_BASE_URL;
const Headers = { 'content-type': 'application/json' } as const;

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
    const token = localStorage.getItem('access_token');
    const res = await fetch(url, {
      method: 'GET',
      ...init,
      headers: {
        ...Headers,
        ...(init.headers as any),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
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

export { baseURL, Headers, wait, enableMock, fetchData, fetchAuthData };


