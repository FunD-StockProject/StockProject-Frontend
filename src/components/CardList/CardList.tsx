import { STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQuery } from '@hooks/useQuery';
import StockCard from '@components/CardList/StockCard/StockCard';
import { StockType } from '@components/Common/Common.Type';
import SlideView from '@components/SlideView/SlideView';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { HomeStockInfo } from '@controllers/api.Type';
import { StockFetchQuery } from '@controllers/query';

const CardList = ({ name, country }: { name: StockType; country: STOCK_COUNTRY }) => {
  const isHot = name === 'HOT';
  const isMobile = useIsMobile();
  const [curStocks] = useQuery({ query: StockFetchQuery(name, country) });

  return (
    curStocks && (
      <SlideView
        key={`${name}_${country}`}
        keyName={name}
        list={isHot ? StockHot(curStocks, country) : StockRisingDescend(curStocks, country)}
        count={isHot || isMobile ? 1 : 3}
      />
    )
  );
};

const StockRisingDescend = (curStocks: HomeStockInfo[], country: STOCK_COUNTRY) => {
  return curStocks.map((e: any) => {
    return <StockCard stockInfo={{ ...e, country }} />;
  });
};

const StockHot = (curStocks: HomeStockInfo[], country: STOCK_COUNTRY) => {
  return curStocks.map((stock: HomeStockInfo) => {
    return (
      <ScoreSlotMachine
        stockName={stock.symbolName}
        active={true}
        stockScore={stock.score}
        tabIndex={0}
        stockDiff={stock.diff}
        country={country}
      />
    );
  });
};

export default CardList;
