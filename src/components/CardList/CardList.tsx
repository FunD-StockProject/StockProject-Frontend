import { STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQuery } from '@hooks/useQuery';
import { StockType } from '@components/Common/Common.Type';
import SlideView from '@components/SlideView/SlideView';
import StockCard from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockFetchQuery } from '@controllers/query';

const CardList = ({ name, country }: { name: StockType; country: STOCK_COUNTRY }) => {
  const isHot = name === 'HOT';
  const isMobile = useIsMobile();
  const [curStocks, suspend] = useQuery({ query: StockFetchQuery(name, country) });

  console.log(suspend);

  return (
    suspend ||
    (curStocks && (
      <SlideView
        keyName={name}
        list={isHot ? StockHot(curStocks, country) : StockRisingDescend(curStocks, country)}
        count={isHot ? 1 : !isMobile ? 3 : 1}
      />
    ))
  );
};

const StockRisingDescend = (curStocks: any, country: STOCK_COUNTRY) => {
  return curStocks.map((e: any) => {
    return <StockCard stockInfo={{ ...e, country }} />;
  });
};

const StockHot = (curStocks: any, country: STOCK_COUNTRY) => {
  return curStocks.map((stock: any) => {
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
