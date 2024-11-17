const Headers = { 'content-type': 'application/json' };

// 추후 패턴 통일하자
const getScore = async (id: Number) => {
  const res = await fetch(`http://43.200.51.20:8080/${id}/score`, { method: 'GET', headers: Headers }).then((res) => res.json());

  return res;
};

const getHotStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/hot?country=${country}`, { method: 'GET', headers: Headers }).then((res) => res.json());

  return res;
};

const getRisingStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/rising?country=${country}`, { method: 'GET', headers: Headers }).then((res) => res.json());

  return res;
};

const getDescentStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/descent?country=${country}`, { method: 'GET', headers: Headers }).then((res) => res.json());

  return res;
};

export { getScore, getHotStocks, getRisingStocks, getDescentStocks };
