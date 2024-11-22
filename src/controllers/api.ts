const baseURL = import.meta.env.VITE_BASE_URL;

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
// Additional stock-related API calls
const fetchAutoComplete = (name: string) => {
  return fetchData(`/stock/autocomplete?keyword=${name}`);
};

const fetchSearchSymbolName = (name: string) => {
  return fetchData(`/stock/search/${name}`);
};
export interface StockInfo {
  stockId?: number;
  symbol?: string;
  symbolName?: string;
  securityName?: string;
  exchangeNum?: string;
  scoreId?: number;
  scoreKorea?: number;
  scoreOversea?: number;
}

export { fetchScore, fetchHotStocks, fetchRisingStocks, fetchDescentStocks, fetchAutoComplete, fetchSearchSymbolName };
