const Headers = { 'content-type': 'application/json' };

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'GET', headers: Headers });
    if (!res.ok) {
      throw new Error(`${res.status} Error!!`);
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchScore = async (id: number) => {
  const url = `http://43.200.51.20:8080/${id}/score`;
  return fetchData(url);
};

const fetchHotStocks = async (country: string) => {
  const url = `http://43.200.51.20:8080/stock/hot/${country}`;
  return fetchData(url);
};

const fetchRisingStocks = async (country: string) => {
  const url = `http://43.200.51.20:8080/stock/rising/${country}`;
  return fetchData(url);
};

const fetchDescentStocks = async (country: string) => {
  const url = `http://43.200.51.20:8080/stock/descent/${country}`;
  return fetchData(url);
};

export { fetchScore, fetchHotStocks, fetchRisingStocks, fetchDescentStocks };
