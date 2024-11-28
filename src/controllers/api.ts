const baseURL = import.meta.env.VITE_BASE_URL;

const Headers = { 'content-type': 'application/json' };

const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

const fetchData = async (path: string) => {
  try {
    const url = `${baseURL}${path}`;
    const res = await fetch(url, { method: 'GET', headers: Headers });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    await wait(0);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchScore = async (id: number) => {
  return fetchData(`/${id}/score`);
};

const fetchRelevant = async (id: number) => {
  const sample = [
    { stockId: 123, symbolName: '삼성전자', score: 81, diff: 18 },
    { stockId: 123, symbolName: '한화솔루션', score: 11, diff: -18 },
    { stockId: 123, symbolName: 'SK하이닉스', score: 32, diff: -7 },
  ];
  id;
  // await wait(3000);
  return sample;
  // return fetchData(`/${id}/relevant`);
};

const fetchStockChart = async (id: number) => {
  return fetchData(`/${id}/relevant`); // add
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
// Additional stock-related API calls
const fetchAutoComplete = (name: string) => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

const fetchSearchSymbolName = (name: string) => {
  return fetchData(`/stock/search/${name}`);
};

export {
  fetchScore,
  fetchRelevant,
  fetchStockChart,
  fetchHotStocks,
  fetchRisingStocks,
  fetchDescentStocks,
  fetchAutoComplete,
  fetchSearchSymbolName,
};
