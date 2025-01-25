import { STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import StockCard from '@components/CardList/StockCard/StockCard';
import { StockType } from '@components/Common/Common.Type';
import SlideView from '@components/SlideView/SlideView';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockInfo } from '@controllers/api.Type';
import { StockFetchQuery } from '@controllers/query';

const CardList = ({ name, country }: { name: StockType; country: STOCK_COUNTRY }) => {
  const isHot = name === 'HOT';
  const isMobile = useIsMobile();
  const { data: curStocks = [] } = StockFetchQuery(name, country);

  return (
    curStocks.length && (
      <SlideView
        key={`${name}_${country}`}
        keyName={name}
        list={isHot ? StockHot(curStocks, country) : StockRisingDescend(curStocks, country)}
        count={isHot || isMobile ? 1 : 3}
      />
    )
  );
};

const StockRisingDescend = (curStocks: StockInfo[], country: STOCK_COUNTRY) => {
  return curStocks.map((curStock: StockInfo) => {
    return <StockCard stockInfo={curStock} country={country} />;
  });
};

const StockHot = (curStocks: StockInfo[], country: STOCK_COUNTRY) => {
  return curStocks.map((stock: StockInfo) => {
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
