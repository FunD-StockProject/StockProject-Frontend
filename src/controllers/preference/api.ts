import { StockCountryKey } from '@ts/StockCountry';
import { fetchAuthData } from '@controllers/api';

export interface PreferenceStockResponse {
  stockId: number;
  isBookmarked: boolean;
  isNotificationEnabled: boolean;
}

export interface BookmarkItem {
  stockId: number;
  name: string;
  price: number;
  priceDiffPerCent: number;
  score: number;
  diff: number;
  isNotificationOn: boolean;
  symbolName: string;
  country: StockCountryKey;
}

// GET /preference/stock/{stockId}
export const fetchStockPreference = (stockId: number): Promise<PreferenceStockResponse> => {
  return fetchAuthData(`/preference/stock/${stockId}`);
};

// POST /preference/bookmark/{stock_id}
export const fetchAddBookmark = (stockId: number | string) => {
  return fetchAuthData(`/preference/bookmark/${stockId}`, { method: 'POST' });
};

// DELETE /preference/bookmark/{stock_id}
export const fetchDeleteBookmark = (stockId: number | string) => {
  return fetchAuthData(`/preference/bookmark/${stockId}`, { method: 'DELETE' });
};

// POST /preference/hide/{stock_id}
export const fetchHideStock = (stockId: number | string) => {
  return fetchAuthData(`/preference/hide/${stockId}`, { method: 'POST' });
};

// DELETE /preference/hide/{stock_id}
export const fetchUnhideStock = (stockId: number | string) => {
  return fetchAuthData(`/preference/hide/${stockId}`, { method: 'DELETE' });
};

// PATCH /preference/notification/toggle/{stock_id}
export const fetchToggleNotification = (stockId: number) => {
  return fetchAuthData(`/preference/notification/toggle/${stockId}`, { method: 'PATCH' });
};

// GET /preference/bookmark/list
export const fetchBookmarkList = (): Promise<BookmarkItem[]> => {
  return fetchAuthData(`/preference/bookmark/list`);
};

// GET /preference/bookmark/count
export const fetchBookmarkCount = (): Promise<number> => {
  return fetchAuthData(`/preference/bookmark/count`);
};
