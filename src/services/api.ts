import { CardInterface } from '../ts/Interfaces';

const getScore = async (id: Number) => {
  const res = await fetch(`http://43.200.51.20:8080/${id}/score`, { method: 'GET', headers: { 'content-type': 'application/json' } }).then((res) => res.json());
  console.log(res);

  // return res;
};

const getHotStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/hot?country=${country}`, { method: 'GET', headers: { 'content-type': 'application/json' } }).then(
    (res) => res.json(),
  );

  return res;
};

const getRisingStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/descent?country=${country}`, { method: 'GET', headers: { 'content-type': 'application/json' } }).then(
    (res) => res.json(),
  );

  return res;
};

const getDescentStocks = async (country: string) => {
  const res = await fetch(`http://43.200.51.20:8080/stock/descent?country=${country}`, { method: 'GET', headers: { 'content-type': 'application/json' } }).then(
    (res) => res.json(),
  );

  return res;
};

export { getScore, getHotStocks, getRisingStocks, getDescentStocks };
