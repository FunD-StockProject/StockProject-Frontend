import { SearchCategoryKey } from '@ts/SearchCategory';

type LocalStorageKey = 'access_token' | 'RecentStocks' | 'RecentKeywords' | 'ShortViewTutorialWatched';

const setItemLocalStorage = (key: LocalStorageKey, data: any) => {
  const value = typeof data === 'object' ? JSON.stringify(data) : String(data);
  localStorage.setItem(key, value);
};

const getItemLocalStorage = (key: LocalStorageKey, initial?: any) => {
  const data = localStorage.getItem(key);

  if (!data) return initial;
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
};

const isExistItemLocalStorage = (key: LocalStorageKey) => {
  return localStorage.getItem(key) ? true : false;
};

export const STORAGE_RECENT_ITEMS: Record<SearchCategoryKey, string> = {
  STOCK: 'RecentStocks',
  KEYWORD: 'RecentKeywords',
};

export { setItemLocalStorage, getItemLocalStorage, isExistItemLocalStorage };
