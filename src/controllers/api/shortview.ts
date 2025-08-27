import { fetchAuthData } from "./base";

export const postShortViewHide = (stockId: number) =>
  fetchAuthData(`shortview/${stockId}/hide`, { method: 'POST' });

export const postShortViewBuy = (stockId: number) =>
  fetchAuthData(`shortview/${stockId}/buy`, { method: 'POST' });

export const fetchShortviewFeed = () =>
  fetchAuthData(`shortview/feed`);