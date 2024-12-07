import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '@ts/Interfaces';
import { StockType } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import MobileStockCardItem from '@components/MobileStockCard/MobileStockCard';
import StockCardItem from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockFetchQuery } from '@controllers/query';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import { ArrowButton, CardListItemContainer, ItemButton, ItemButtonContainer, NoScrollbar } from './CardList.Style';

const CardList = ({
  isHot = false,
  apiRef,
  name,
  index,
}: {
  isHot?: boolean;
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const isMobile = useIsMobile();
  const [curStocks, suspend] = useQueryComponent({ query: StockFetchQuery(name, index) });

  // 컨테이너 너비 감지
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // 자동 스크롤 (모바일 전용)
  useEffect(() => {
    if (isMobile && curStocks && curStocks.length > 1) {
      setTimeout(() => {
        apiRef.current.scrollToItem(apiRef.current.getItemByIndex(1));
        window.scrollTo(0, 0);
      }, 1000);
    }
  }, [isMobile, curStocks, apiRef]);

  const handleButtonClick = (idx: number) => {
    apiRef.current.scrollToItem(apiRef.current.getItemByIndex(idx));
  };

  const renderHotStocks = () => {
    return curStocks.map((stock: CardInterface) => (
      <CardListItemContainer key={`${name}_${stock.stockId}`} width={width ?? 0}>
        <ScoreSlotMachine stockName={stock.symbolName} title={true} stockScore={stock.score} tabIndex={0} />
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
        {verticalStock.map((stock: CardInterface) => (
          <MobileStockCardItem
            key={`${name}_${stock.stockId}`}
            score={stock.score}
            name={stock.symbolName}
            delta={stock.diff}
          />
        ))}
      </CardListItemContainer>
    ));
  };

  return (
    <NoScrollbar ref={containerRef}>
      {suspend ||
        (curStocks && width !== 0 && (
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {isHot ? renderHotStocks() : isMobile ? renderMobileStocks() : renderWebStocks()}
          </ScrollMenu>
        ))}
      {curStocks && !isHot && !isMobile && (
        <ItemButtonContainer>
          {curStocks.map((stock: CardInterface, idx: number) => (
            <ItemButton key={stock.stockId} onClick={() => handleButtonClick(idx)}>
              {stock.symbolName}
            </ItemButton>
          ))}
        </ItemButtonContainer>
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
