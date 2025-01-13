import { SEARCH_CATEGORY } from '@ts/Types';

const setItemLocalStorage = (key: string, data: any) => {
  const value = typeof data === 'object' ? JSON.stringify(data) : String(data);
  localStorage.setItem(key, value);
};

const getItemLocalStorage = (key: string, initial?: any) => {
  const data = localStorage.getItem(key);

  if (!data) return initial;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const isExistItemLocalStorage = (key: string) => {
  return localStorage.getItem(key) ? true : false;
};

export const STORAGE_RECENT_ITEMS: Record<SEARCH_CATEGORY, string> = {
  STOCK: 'RecentStocks',
  KEYWORD: 'RecentKeywords',
};

export { setItemLocalStorage, getItemLocalStorage, isExistItemLocalStorage };
