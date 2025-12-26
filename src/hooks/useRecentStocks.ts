import { StockCountryKey } from '@ts/StockCountry';
import useLocalStorageState from './useLocalStorageState';

interface RecentStocks {
  symbolName: string;
  country: StockCountryKey;
}

const useRecentStocks = () => {
  const [_recentStocks, setRecentStocks] = useLocalStorageState<RecentStocks[]>('recent_stocks', []);
  const recentStocks = _recentStocks ?? [];

  const addRecentStock = (symbolName: string, country: StockCountryKey) => {
    setRecentStocks([
      { symbolName, country },
      ...recentStocks.filter((item: { symbolName: string }) => item.symbolName !== symbolName),
    ]);
  };

  const removeRecentStock = (symbolName: string) => {
    setRecentStocks(recentStocks.filter((item: { symbolName: string }) => item.symbolName !== symbolName));
  };

  return {
    recentStocks,
    addRecentStock,
    removeRecentStock,
  };
};

export default useRecentStocks;
