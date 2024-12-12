import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '@ts/Interfaces';
import { StockType } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import LoadingComponent from '@components/LoadingComponent';
import MobileStockCardItem from '@components/MobileStockCard/MobileStockCard';
import StockCardItem from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockFetchQuery } from '@controllers/query';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import { ArrowButton, CardListItemContainer, Indicator, IndicatorContainer, NoScrollbar } from './CardList.Style';

const CardList = ({
  apiRef,
  name,
  index,
}: {
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(`${name}_1`);
  const [curStocks, suspend] = useQueryComponent({ query: StockFetchQuery(name, index) });
  const isHot = name === 'HOT';
  const array = isHot ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 4, 7];

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const renderStocks = () => {
    if (isHot) return renderHotStocks();
    if (isMobile) return renderMobileStocks();
    return renderWebStocks();
  };

  const renderHotStocks = () => {
    return curStocks.map((stock: CardInterface) => (
      <CardListItemContainer key={`${name}_${stock.stockId}`} width={width ?? 0}>
        <ScoreSlotMachine stockName={stock.symbolName} active={true} stockScore={stock.score} tabIndex={0} />
      </CardListItemContainer>
    ));
  };

  const renderWebStocks = () => {
    return curStocks.map((stock: CardInterface) => (
      <CardListItemContainer key={`${name}_${stock.stockId}`} width={(width ?? 0) * 0.3}>
        <StockCardItem score={stock.score} name={stock.symbolName} delta={stock.diff} />
      </CardListItemContainer>
    ));
  };

  const renderMobileStocks = () => {
    const chunkCount = Math.ceil(curStocks.length / 3);
    const verticalStocks = Array.from({ length: chunkCount }, (_, idx) => curStocks.slice(idx * 3, idx * 3 + 3));

    return verticalStocks.map((verticalStock) => (
      <CardListItemContainer key={`${name}_${verticalStock[0].stockId}`} width={width ?? 0}>
        {verticalStock.map((stock: CardInterface, idx: number) => (
          <MobileStockCardItem key={`${name}_${idx}`} score={stock.score} name={stock.symbolName} delta={stock.diff} />
        ))}
      </CardListItemContainer>
    ));
  };

  const handleUpdate = () => {
    const visibleItems = apiRef.current.items.getVisible();
    if (visibleItems.length > 0) {
      setActiveIndex(visibleItems[0][0]);
    }
  };

  if (suspend) {
    return <LoadingComponent />;
  }

  return (
    <NoScrollbar ref={containerRef}>
      {curStocks && width !== 0 && (
        <>
          <IndicatorContainer>
            {array.map((el) => (
              <Indicator key={el} isActive={`${name}_${el}` === activeIndex} name={name}></Indicator>
            ))}
          </IndicatorContainer>
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
            onUpdate={handleUpdate}
          >
            {renderStocks()}
          </ScrollMenu>
        </>
      )}
    </NoScrollbar>
  );
};

// 재사용 가능한 Arrow 컴포넌트
const ScrollArrow = ({ direction }: { direction: 'left' | 'right' }) => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isDisabled = direction === 'left' ? visibility.useLeftArrowVisible() : visibility.useRightArrowVisible();
  const onClick = direction === 'left' ? visibility.scrollPrev : visibility.scrollNext;
  const imgLink = direction === 'left' ? leftArrowImgLink : rightArrowImgLink;

  return <ArrowButton src={imgLink} disabled={isDisabled} onClick={() => onClick()} className={`arrow-${direction}`} />;
};

export default CardList;
