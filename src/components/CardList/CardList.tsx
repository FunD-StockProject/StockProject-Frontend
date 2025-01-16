import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQuery } from '@hooks/useQuery';
import MobileStockCardItem from '@components/CardList/MobileStockCard/MobileStockCard';
import StockCardItem from '@components/CardList/StockCard/StockCard';
import { StockType } from '@components/Common/Common.Type';
import SlideView from '@components/SlideView/SlideView';
import StockCard from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockScore } from '@controllers/api.Type';
import { StockFetchQuery } from '@controllers/query';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import { ArrowButton, CardListItemContainer, NoScrollbar } from './CardList.Style';

const CardList = ({
  name,
  country,
}: {
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  country: STOCK_COUNTRY;
}) => {
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
