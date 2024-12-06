import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '@ts/Interfaces';
import { StockType } from '@ts/Types';
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
  const [didMount, setDidMount] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [curStocks, suspend] = useQueryComponent({ query: StockFetchQuery(name, index) });
  const isMobile = width < 768;

  useEffect(() => {
    if (isMobile && curStocks?.length > 1) {
      setTimeout(() => {
        apiRef.current.scrollToItem(apiRef.current.getItemByIndex(1));
        window.scrollTo(0, 0);
      }, 1000);
    }
  }, [isMobile, curStocks]);

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    if (!containerRef.current) return;
    observer.observe(containerRef.current);
  }, [didMount]);

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const { width } = entry.contentRect;
      setWidth(width);
    });
  });

  const renderStocks = (stock: CardInterface) =>
    isHot ? (
      <CardListItemContainer key={`${name}_${stock.stockId}`} width={width ?? 0}>
        <ScoreSlotMachine stockName={stock.symbolName} title={true} stockScore={stock.score} tabIndex={0} />
      </CardListItemContainer>
    ) : (
      <CardListItemContainer key={`${name}_${stock.stockId}`} width={(width ?? 0) * 0.3}>
        <StockCardItem score={stock.score} name={stock.symbolName} delta={stock.diff} />
      </CardListItemContainer>
    );

  const handleButtonClick = (idx: number) => {
    apiRef.current.scrollToItem(apiRef.current.getItemByIndex(idx));
  };

  const renderMobileStocks = (curStocks: CardInterface[]) => {
    if (isHot) {
      return curStocks.map(renderStocks);
    }

    const chunkCount = Math.ceil(curStocks.length / 3);
    const verticalStocks = Array.from({ length: chunkCount }, (_, idx) => curStocks.slice(idx * 3, idx * 3 + 3));

    return verticalStocks.map((verticalStock) => (
      <CardListItemContainer key={`${name}_${verticalStock[0].stockId}`} width={width ?? 0}>
        {verticalStock.map((el) => (
          <MobileStockCardItem key={`${name}_${el.stockId}`} score={el.score} name={el.symbolName} delta={el.diff} />
        ))}
      </CardListItemContainer>
    ));
  };

  return (
    <NoScrollbar ref={containerRef}>
      {suspend ||
        (curStocks && width != 0 && (
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {isMobile ? renderMobileStocks(curStocks) : curStocks.map(renderStocks)}
          </ScrollMenu>
        ))}
      {!isHot && (
        <ItemButtonContainer>
          {curStocks &&
            curStocks.map((stock: CardInterface, idx: number) => {
              if (isMobile && idx % 3) return;
              return (
                <ItemButton key={stock.stockId} onClick={() => handleButtonClick(idx)}>
                  {stock.symbolName}
                </ItemButton>
              );
            })}
        </ItemButtonContainer>
      )}
    </NoScrollbar>
  );
};

// Reusable Arrow component with better naming
const ScrollArrow = ({ direction }: { direction: 'left' | 'right' }) => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isDisabled = direction === 'left' ? visibility.useLeftArrowVisible() : visibility.useRightArrowVisible();
  const onClick = direction === 'left' ? visibility.scrollPrev : visibility.scrollNext;
  const imgLink = direction === 'left' ? leftArrowImgLink : rightArrowImgLink;

  return <ArrowButton src={imgLink} disabled={isDisabled} onClick={() => onClick()} className={`arrow-${direction}`} />;
};

export default CardList;
