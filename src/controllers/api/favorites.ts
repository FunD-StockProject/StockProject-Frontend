import { FavoriteStock } from '@controllers/api.Type';
import { fetchAuthData } from './base';

// POST /preference/bookmark/{stock_id}
export const postBookmark = (stockId: number | string) =>
  fetchAuthData(`/preference/bookmark/${stockId}`, { method: 'POST' });

// DELETE /preference/bookmark/{stock_id}
export const deleteBookmark = (stockId: number | string) =>
  fetchAuthData(`/preference/bookmark/${stockId}`, { method: 'DELETE' });

// POST /preference/hide/{stock_id}
export const postHide = (stockId: number | string) =>
  fetchAuthData(`/preference/hide/${stockId}`, { method: 'POST' });

// DELETE /preference/hide/{stock_id}
export const deleteHide = (stockId: number | string) =>
  fetchAuthData(`/preference/hide/${stockId}`, { method: 'DELETE' });

// GET /preference/bookmark/list
export const fetchBookmarkList = (): Promise<FavoriteStock[]> =>
  fetchAuthData(`/preference/bookmark/list`);

// GET /preference/bookmark/count
export const fetchBookmarkCount = (): Promise<number> =>
  fetchAuthData(`/preference/bookmark/count`);
