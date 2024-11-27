import { StockInfo } from '@controllers/api.Type';

export interface SearchBarActiveProps {
  active: boolean;
}

export interface RecentSearchListProps {
  searchedData: string[];
  handleSearch: (name: string) => void;
  deleteRecentSearch: (name: string) => void;
}

export interface RecentSearchItemProps {
  name: string;
  searchItem: (e: any) => void;
  deleteItem: (e: any) => void;
}

export interface AutoCompleteListProps {
  value: string;
  searchedResult: StockInfo[];
  handleSearch: (name?: string) => void;
}

export interface AutoCompleteItemProps {
  value: string;
  name: string;
  searchItem: (e: any) => void;
}
