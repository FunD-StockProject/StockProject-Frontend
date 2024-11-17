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

const fetchAutoComplete = (name: string) => {
  return fetch('http://43.200.51.20:8080/stock/autocomplete?keyword=' + name)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Error!!`);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchSearchSymbolName = (name: string) => {
  return fetch('http://43.200.51.20:8080/stock/search/' + name)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} Error!!`);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export { fetchAutoComplete, fetchSearchSymbolName };
