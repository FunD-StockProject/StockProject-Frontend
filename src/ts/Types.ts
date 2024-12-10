interface LayoutProps {
  children?: React.ReactNode;
  className?: string;
}

type StockType = 'HOT' | 'RISING' | 'DESCENT';

interface StockSearchInfo {
  symbolName: string;
  country: string;
}

export type { LayoutProps, StockType, StockSearchInfo };
