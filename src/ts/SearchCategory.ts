export type SearchCategoryKey = 'STOCK' | 'KEYWORD';

export interface SearchCategoryData {
  text: string;
}
export interface SearchCategory extends SearchCategoryData {
  key: SearchCategoryKey;
}

export const SEARCH_CATEGORY_MAP: Record<SearchCategoryKey, SearchCategoryData> = {
  STOCK: {
    text: '종목',
  },
  KEYWORD: {
    text: '키워드',
  },
};

export const SEARCH_CATEGORIES: SearchCategory[] = [
  { key: 'STOCK', text: '종목' },
  { key: 'KEYWORD', text: '키워드' },
];
