import { StockSearchInfo } from '@ts/Types';
import { StockInfo } from '@controllers/api.Type';

export interface SearchBarActiveProps {
  active: boolean;
}

export interface RecentSearchListProps {
  stockSearchedInfo: StockSearchInfo[];
  focusIdx: number;
  handleSearch: (StockSearchInfo: StockSearchInfo) => void;
  deleteRecentSearch: (name: string) => void;
}

export interface AutoCompleteListProps {
  value: string;
  focusIdx: number;
  searchedResult: StockInfo[];
  handleSearch: (StockSearchInfo: StockSearchInfo) => void;
}
