import { StockInfo } from '@/controllers/api.Type';

export interface RecentSearchListViewProps {
  searchedData: string[];
  handleSearch: (name: string) => void;
  deleteRecentSearch: (name: string) => void;
}

export interface RecentSearchItemViewProps {
  name: string;
  searchItem: (e: any) => void;
  deleteItem: (e: any) => void;
}

export interface AutoCompleteListViewProps {
  value: string;
  searchedResult: StockInfo[];
  handleSearch: (name?: string) => void;
}

export interface AutoCompleteItemViewProps {
  value: string;
  name: string;
  searchItem: (e: any) => void;
}
