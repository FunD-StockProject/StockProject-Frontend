const getBaseURL = () => {
  const environment = import.meta.env.VITE_ENV; // VITE_ENV 값 가져오기 (local, dev, prod)

  switch (environment) {
    case 'local':
      return import.meta.env.VITE_BASE_URL_LOCAL || 'http://43.200.51.20:8080';
    case 'dev':
      return import.meta.env.VITE_BASE_URL_DEV || 'https://stockvalue13.netlify.app';
    case 'prod':
      return import.meta.env.VITE_BASE_URL_PROD || 'https://humanzipyo.com';
    default:
      console.warn(`Unknown VITE_ENV: ${environment}, defaulting to local`);
      return import.meta.env.VITE_BASE_URL_LOCAL || 'http://43.200.51.20:8080';
  }
};

const baseURL = getBaseURL(); // 환경에 따라 baseURL 동적으로 설정

const Headers = { 'content-type': 'application/json' };

const fetchData = async (path: string) => {
  try {
    const url = `${baseURL}${path}`;
    const res = await fetch(url, { method: 'GET', headers: Headers });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchScore = async (id: number) => {
  return fetchData(`/${id}/score`);
};

const fetchHotStocks = async (country: string) => {
  return fetchData(`/stock/hot/${country}`);
};

const fetchRisingStocks = async (country: string) => {
  return fetchData(`/stock/rising/${country}`);
};

const fetchDescentStocks = async (country: string) => {
  return fetchData(`/stock/descent/${country}`);
};

export { fetchScore, fetchHotStocks, fetchRisingStocks, fetchDescentStocks };
